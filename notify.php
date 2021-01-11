<?php
// Tell PayFast that this page is reachable by triggering a header 200
header( 'HTTP/1.0 200 OK' );
flush();

define( 'SANDBOX_MODE', true );
$pfHost = SANDBOX_MODE ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';
// Posted variables from ITN
$pfData = $_POST;

// Strip any slashes in data
foreach( $pfData as $key => $val ) {
    $pfData[$key] = stripslashes( $val );
}

// Convert posted variables to a string
foreach( $pfData as $key => $val ) {
    if( $key !== 'signature' ) {
        $pfParamString .= $key .'='. urlencode( $val ) .'&';
    } else {
        break;
    }
}

$pfParamString = substr( $pfParamString, 0, -1 );


function pfValidSignature( $pfData, $pfParamString, $pfPassphrase = null ) {
    // Calculate security signature
    if($pfPassphrase === null) {
        $tempParamString = $pfParamString;
    } else {
        $tempParamString = $pfParamString.'&passphrase='.urlencode( $pfPassphrase );
    }

    $signature = md5( $tempParamString );
    return ( $pfData['signature'] === $signature );
}


function pfValidIP() {
    // Variable initialization
    $validHosts = array(
        'www.payfast.co.za',
        'sandbox.payfast.co.za',
        'w1w.payfast.co.za',
        'w2w.payfast.co.za',
        );

    $validIps = [];

    foreach( $validHosts as $pfHostname ) {
        $ips = gethostbynamel( $pfHostname );

        if( $ips !== false )
            $validIps = array_merge( $validIps, $ips );
    }

    // Remove duplicates
    $validIps = array_unique( $validIps );
    $referrerIp = gethostbyname(parse_url($_SERVER['HTTP_REFERER'])['host']);
    if( in_array( $referrerIp, $validIps, true ) ) {
        return true;
    }
    return false;
}


function pfValidPaymentData( $cartTotal, $pfData ) {
    return !(abs((float)$cartTotal - (float)$pfData['amount_gross']) > 0.01);
}


function pfValidServerConfirmation( $pfParamString, $pfHost = 'sandbox.payfast.co.za', $pfProxy = null ) {
    // Use cURL (if available)
    if( in_array( 'curl', get_loaded_extensions(), true ) ) {
        // Variable initialization
        $url = 'https://'. $pfHost .'/eng/query/validate';

        // Create default cURL object
        $ch = curl_init();

        // Set cURL options - Use curl_setopt for greater PHP compatibility
        // Base settings
        curl_setopt( $ch, CURLOPT_USERAGENT, NULL );  // Set user agent
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );      // Return output as string rather than outputting it
        curl_setopt( $ch, CURLOPT_HEADER, false );             // Don't include header in output
        curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, 2 );
        curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, true );

        // Standard settings
        curl_setopt( $ch, CURLOPT_URL, $url );
        curl_setopt( $ch, CURLOPT_POST, true );
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $pfParamString );
        if( !empty( $pfProxy ) )
            curl_setopt( $ch, CURLOPT_PROXY, $pfProxy );

        // Execute cURL
        $response = curl_exec( $ch );
        curl_close( $ch );
        if ($response === 'VALID') {
            return true;
        }
    }
    return false;
}

$myFile = fopen(filename: 'localhost\php\notify.txt', mode: 'wb') or die();

$check1 = pfValidSignature($pfData, $pfParamString);
$check1 ? fwrite($myFile, string: "Is a valid signature\n"): fwrite($myFile, string: "Is NOT a valid signature\n");

$check2 = pfValidIP();
$check2 ? fwrite($myFile, string: "Is a valid IP\n"): fwrite($myFile, string: "Is NOT a valid IP\n");

$check3 = pfValidPaymentData(cartTotal: '1000.00', $pfData);
$check3 ? fwrite($myFile, string: "Is valid data\n"): fwrite($myFile, string: "Is NOT valid data\n");

$check4 = pfValidServerConfirmation($pfParamString, $pfHost);
$check4 ? fwrite($myFile, string: "Is a valid confirmation\n"): fwrite($myFile, string: "Is NOT a valid confirmation\n");

if($check1 && $check2 && $check3 && $check4) {
    // All checks have passed, the payment is successful
    // $file_name = 'Residential Lease Agreement 2020.zip';
    // $file_url = 'localhost/php/download/' . $file_name;
    // header('Content-Type: application/octet-stream');
    // header("Content-Transfer-Encoding: Binary");
    // header("Content-disposition: attachment; filename=\"".$file_name."\"");
    // readfile($file_url);
exit;
} else {
    // Some checks have failed, check payment manually and log for investigation
    die();
}

?>
