<!DOCTYPE html>

<?php
/**
 * @param array $data
 * @param null $passPhrase
 * @return string
 */
function generateSignature($data, $passPhrase = null) {
    // Create parameter string
    $pfOutput = '';
    foreach( $data as $key => $val ) {
        if(!empty($val)) {
            $pfOutput .= $key .'='. urlencode( trim( $val ) ) .'&';
        }
    }
    // Remove last ampersand
    $getString = substr( $pfOutput, 0, -1 );
    if( $passPhrase !== null ) {
        $getString .= '&passphrase='. urlencode( trim( $passPhrase ) );
    }
    return md5( $getString );
}


// Construct variables
$cartTotal = 1000.00;// This amount needs to be sourced from your application
$data = array(
    // Merchant details
    'merchant_id' => '10000100',
    'merchant_key' => '46f0cd694581a',
    'return_url' => 'https://rworthmann.github.io/POP2/return.html',
    'cancel_url' => 'https://rworthmann.github.io/POP2/cancel.html',
    'notify_url' => 'https://rworthmann.github.io/POP2/notify.php',
    // Buyer details
    'name_first' => 'First Name',
    'name_last'  => 'Last Name',
    'email_address'=> 'test@test.com',
    // Transaction details
    'm_payment_id' => '000001', //Unique payment ID to pass through to notify_url
    'amount' => number_format( sprintf( '%.2f', $cartTotal ), 2, '.', '' ),
    'item_name' => 'POPIA documentation'
);

$signature = generateSignature($data);
$data['signature'] = $signature;

// If in testing mode make use of either sandbox.payfast.co.za or www.payfast.co.za
$testingMode = true;
$pfHost = $testingMode ? 'sandbox.payfast.co.za' : 'www.payfast.co.za';
$htmlForm = '<form action="https://'.$pfHost.'/eng/process" method="post">';
foreach($data as $name=> $value)
{
    $htmlForm .= '<input name="'.$name.'" type="hidden" value="'.$value.'" />';
}
$htmlForm .= '<button class="btn btn-outline-success btn-lg btn-block" name="paynow" onclick="" type="submit">Proceed to payment</button></form>';


?>

<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <title>EasyPOPI.co.za</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;900&family=Ubuntu:wght@300;400;700&display=swap" rel="stylesheet">

  <!-- CSS stylesheets -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
  <link rel="stylesheet" href="styles.css" />

  <!-- Font awesome -->
  <script src="https://kit.fontawesome.com/8bf70d463c.js" crossorigin="anonymous"></script>

  <!-- Bootstrap script -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js" integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>

</head>

<body class="bg-light">

  <!-- Navbar -->
  <div class="container-fluid-nav fixed-top">
    <nav class="navbar navbar-expand-lg navbar-light">
      <img class="logo" src="images/Untitled.jpg">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#product">Products</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#about-popi">What is POPI?</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#offering">Why EasyPopi?</a>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#registration">Sign Up!</a>
          </li> -->
          <li class="nav-item">
            <a class="nav-link" href="#contact-us">Contact Us</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>



  <section class="white-section" id="checkout">

    <div class="container-checkout">
      <div class="row">
        <div class="col-lg-6 order-md-1">
          <div class="container-reg" id="registration">
            <div class="text-center">
              <h4>Billing details</h4>
            </div>
            <div class="row">
              <div class="col-md-8 order-md-1">
                <!-- <h4 class="mb-3">Billing address</h4> -->
                <form class="needs-validation" id="myForm" novalidate>
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="firstName">First name</label>
                      <input name="First_name" type="text" class="form-control" id="firstName" placeholder="" value="" required>
                      <div class="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="lastName">Last name</label>
                      <input name="Last_name" type="text" class="form-control" id="lastName" placeholder="" value="" required>
                      <div class="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="email">Email</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">@</span>
                      </div>
                      <input name="Email_address" type="email" class="form-control" id="email" placeholder="you@example.com" required>
                      <div class="invalid-feedback" style="width: 100%;">
                        Please enter a valid email address.
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="address">Address</label>
                    <input name="Street_address" type="text" class="form-control" id="address" placeholder="1234 Main St" required>
                    <div class="invalid-feedback">
                      Please enter your address.
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
                    <input name="Street_address2" type="text" class="form-control" id="address2" placeholder="Apartment or suite">
                  </div>
                  <div class="row">
                    <div class="col-md-5 mb-3">
                      <label for="country">Country</label>
                      <select name="Country_name" class="custom-select d-block w-100" id="country" required>
                        <option value="">Choose...</option>
                        <option>South Africa</option>
                      </select>
                      <div class="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </div>
                    <div class="col-md-4 mb-3">
                      <label for="state">Province</label>
                      <select name="Province_name" class="custom-select d-block w-100" id="state" required>
                        <option value="">Choose...</option>
                        <option>Eastern Cape</option>
                        <option>Free State</option>
                        <option>Gauteng</option>
                        <option>KwaZulu-Natal</option>
                        <option>Limpopo</option>
                        <option>Mpumalanga</option>
                        <option>Northern Cape</option>
                        <option>North West</option>
                        <option>Western Cape</option>
                      </select>
                      <div class="invalid-feedback">
                        Please provide a valid province.
                      </div>
                    </div>
                    <div class="col-md-3 mb-3">
                      <label for="zip">Postal Code</label>
                      <input name="Postal_code" type="text" class="form-control" id="zip" placeholder="" required>
                      <div class="invalid-feedback">
                        Postal code required.
                      </div>
                    </div>
                  </div>
                  <div>
                    <input type="hidden" id="date" name="Timestamp">
                    <script type="text/javascript">
                      var d1 = new Date();
                      var y1 = d1.getFullYear();
                      var m1 = d1.getMonth() + 1;
                      if (m1 < 10)
                        m1 = "0" + m1;
                      var dt1 = d1.getDate();
                      if (dt1 < 10)
                        dt1 = "0" + dt1;
                      var d2 = y1 + "-" + m1 + "-" + dt1;
                      document.getElementById("date").value = d2;
                    </script>
                  </div>
                  <hr class="mb-4">
                  <!-- <button class="btn btn-outline-success btn-lg btn-block" onClick="" type="submit">Submit</button> -->
                  <div class="text-left">
                    <button class="btn btn-outline-success btn-lg btn-block" name="paynow" onclick="" type="submit">Proceed to payment</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 order-md-1">
          <!-- <h4 class="mb-3">Billing address</h4> -->
          <div>
            <h4 class="mb-3">Product check-out</h4>
            <div class="order-md-2 mb-4">
              <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h5 class="my-0">POPIA documentation</h5>
                    <small class="text-muted">Set of documents that will put you on the path to get POPIA certified.</small>
                  </div>
                  <span class="text-muted">R1 999</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h5 class="my-0">Document A</h5>
                    <small class="text-muted">POPIA roadmap</small>
                  </div>
                  <span class="text-muted"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h5 class="my-0">Document B</h5>
                    <small class="text-muted">Compliance office certificate</small>
                  </div>
                  <span class="text-muted"></span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h5 class="my-0">Document C</h5>
                    <small class="text-muted">SMS policy</small>
                  </div>
                  <span class="text-muted"></span>
                </li>
              </ul>
            </div>
            <?php
              echo $htmlForm;
              ?>
          </div>
        </div>
      </div>


    </div>

  </section>


  <!--===============================================================================================-->
  <script>
    function SubForm() {
      $.ajax({
        url: 'https://api.apispreadsheets.com/data/4375/',
        type: 'post',
        data: $("#myForm").serializeArray(),
        success: function() {
          alert("Form Data Submitted :)")
        },
        error: function() {
          alert("There was an error :(")
        }
      });
      document.getElementById("myForm").reset();
    }
  </script>

  <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
  <script src="index.js"></script>

</body>

</html>
