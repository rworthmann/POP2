$(document).ready(function() {
  // ADD COMMAS TO VALUES
  // function numberWithCommas(x) {
  // 	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }

  // CALCULATE MONTHLY KWH CONSUMPTION
  $(document).ready(function() {
    var qty = $("#consumptionRands");
    qty.keyup(function() {
      var total = isNaN(parseInt(qty.val() / $("#kwh").val())) ? 0 : (qty.val() / $("#kwh").val());
      $("#totalKwh").val(total.toFixed(2));
      $("#qtotalKwh").val(total.toFixed(2));
    });
  });

  $(document).ready(function() {
    $('#consumptionRands, #solar, #battery, #panelNorthFacing, #panelFlat, #dbSplitYes, #dbSplitNo').bind('click keyup', function() {
      var total = $(this).val();
      if (total == 0 || total == '') {
        total = 0;
      }

      // consumption
      // var totalpower = isNaN(parseInt($('#consumptionRands').val() / $("#kwh").val())) ? 0 : ($('#consumptionRands').val() / $("#kwh").val());
      var totalpower = $('#totalKwh').val() * 1;
      // power from Solar
      var solar = $("#solar").val() / 100;
      var solarchart = $("#solar").val();
      var solarchartinverse = 100 - $("#solar").val();
      // battery size required
      var battery = $("#battery").val() / 100;
      var batterychart = $("#battery").val();
      var batterychartinverse = 100 - $("#battery").val();
      // solar panel mounting north facing
      if ($("#panelNorthFacing input").is(":checked")) {
        mounting = 1500;
      }
      // solar panel mounting flat
      if ($("#panelFlat input").is(":checked")) {
        mounting = 3500;
      }
      if ($("#panelNorthFacing input").is(":checked")) {
        qpanelmounting = "North Facing";
      }
      if ($("#panelFlat input").is(":checked")) {
        qpanelmounting = "Flat";
      }
      // distance from solar panels to inverter
      var inverterDistance = 30;
      //distance from main DB to inverterDistance
      var dbDistance = 5;
      // DB Split yes
      if ($("#dbSplitYes input").is(":checked")) {
        dbSplit = 5750;
      }
      // DB Split no
      if ($("#dbSplitNo input").is(":checked")) {
        dbSplit = 0;
      }
      // DB Split yes
      if ($("#dbSplitYes input").is(":checked")) {
        qsplitDB = "Yes";
      }
      // DB Split no
      if ($("#dbSplitNo input").is(":checked")) {
        qsplitDB = "No";
      }
      //type of inverter required
      var inverterSize = totalpower * solar;

      if (totalpower > 0 && solar > 0 && battery > 0 && inverterSize < 149) {
        $("#inputalert").text("Energy requirement is too low for the calculator, please contact us for a custom quotation or increase your requirement!!")
      };
      // inverter description (h)
      if (inverterSize >= 150 && inverterSize <= 360) {
        inverter = "5kW Hybrid Inverter, 5kWp MPPT Controller, 48V Lithium Iron Battery Charger & Overload Protection";
      } else if (inverterSize >= 361 && inverterSize <= 720) {
        inverter = "5kW Smart Hybrid Inverter, 6kWp Dual String MPPT Controller, Dual AC Output, 48V, 100A BMS & Smart App";
      } else if (inverterSize >= 721 && inverterSize <= 3000) {
        inverter = "8kW Smart Hybrid Inverter, 10kWp Dual String MPPT Controller, Dual AC Output, 48V 190A BMS, & Smart App";
      }

      // number of inverters required (i)
      if (inverterSize >= 150 && inverterSize <= 1350) {
        inverterQty = 1;
      } else if (inverterSize >= 1351 && inverterSize <= 1800) {
        inverterQty = 2;
      } else if (inverterSize >= 1801 && inverterSize <= 3000) {
        inverterQty = 3;
      }
      // cost of inverters (r)
      if (inverterSize >= 150 && inverterSize <= 360) {
        inverterCost = 13800;
      } else if (inverterSize >= 361 && inverterSize <= 720) {
        inverterCost = 23300;
      } else if (inverterSize >= 721 && inverterSize <= 1350) {
        inverterCost = 36600;
      } else if (inverterSize >= 1351 && inverterSize <= 1800) {
        inverterCost = 73200;
      } else if (inverterSize >= 1801 && inverterSize <= 3000) {
        inverterCost = 109800;
      }
      var inverterCostformatted = "R " + inverterCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      // number of batteries required (j)
      var batteryQty = (totalpower * battery) / 30;
      var batteryQtyformatted = batteryQty.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      //cost of batteryQty (s)
      var batteryCost = batteryQty * 6500;
      var batteryCostformatted = "R " + batteryCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      // number of solar panels required (k)
      var panelQty = inverterSize / 120;
      var panelQtyformatted = panelQty.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      // cost of solar panels (t)
      var panelCost = panelQty * 5700;
      var panelCostformatted = "R " + panelCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      //generic Qty
      var genericQty = 1;
      // cost of mounting (u)
      var mountingCost = (panelQty * mounting) + (30 * 100) + (inverterQty * 5000);
      var mountingCostformatted = "R " + mountingCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      // cost of electrical work (v)
      var electricalCost = dbSplit + (5 * 360) + 2800;
      var electricalCostformatted = "R " + electricalCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      // cost of installation (w)
      var installationCost = panelQty * 2000;
      var installationCostformatted = "R " + installationCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      // subtotal
      var subTotal = inverterCost + batteryCost + panelCost + mountingCost + electricalCost + installationCost;
      var subTotalformatted = "R " + subTotal.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      // VAT
      var vat = subTotal * 0.15;
      var vatformatted = "R " + vat.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      // total cost
      var totalCost = subTotal + vat;
      var totalCostformatted = "R " + totalCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      // easy payment calculations (p)
      var monthlyPayment = totalCost * 0.02611;
      var monthlyPaymentformatted = "R " + monthlyPayment.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      // solar cost of 10 years (q)
      var solar10YearCost = totalCost / (panelQty * 14600);
      var solar10YearCostformatted = "R " + solar10YearCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      // savings over 10 years (y)
      var savings10Year = (panelQty * 1460 * 52.79) - totalCost;
      var savings10Yearformatted = "R " + savings10Year.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      var totalCost1 = (totalCost);

      $("#subTotal").val(subTotal.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
      $("#vat").val(vat.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
      $("#totalCost1").val(totalCost1.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
      $("#monthlyPayment").val(monthlyPayment.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
      $("#solarCost").val(solar10YearCost.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
      $("#solarSavings").val(savings10Year.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
      // $("#inverterQty").val(inverterQty.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
      $("#qinverterQty").text(inverterQty);
      $("#inverterDesc").text(inverter);
      $("#qsolar").val((solar * 100).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }));
      $("#qbattery").val((battery * 100).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }));
      $("#qpanelmounting").text(qpanelmounting);
      $("#qsplitDB").text(qsplitDB);
      $("#inverterCost").text(inverterCostformatted);
      $("#batteryQty").text(batteryQtyformatted);
      $("#batteryCost").text(batteryCostformatted);
      $("#panelQty").text(panelQtyformatted);
      $("#panelCost").text(panelCostformatted);
      $("#mountingCost").text(mountingCostformatted);
      $("#electricalCost").text(electricalCostformatted);
      $("#installationCost").text(installationCostformatted);
      $("#qsubTotal").text(subTotalformatted);
      $("#qvat").text(vatformatted);
      $("#finalTotal").text(totalCostformatted);
      $("#qmonthlyPayment").text(monthlyPaymentformatted);
      $("#qsolarCost").text(solar10YearCostformatted);
      $("#qsolarSavings").text(savings10Yearformatted);

      // SET RESULT TEXT BASED ON SAVINGS
      if (savings10Year > 0) {
        $("#likelySavings").removeClass("red amber").addClass("green").text("You will save approximately " + savings10Yearformatted + " over 10 years!!")
      } else if (savings10Year < 0) {
        $("#likelySavings").removeClass("green amber").addClass("red").text("Please double check your inputs!")
      };



      // GENERATE DOGNUT CHART //

      var piedata = [{
          value: solarchartinverse,
          color: "#D9D9D9"
        },
        {
          value: solarchart,
          color: "#aacf18"
        }
      ];
      var pieoptions = {
        segmentShowStroke: false,
        percentageInnerCutout: 60, // This is 0 for Pie charts
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: false,
        responsive: true,
        tooltipTemplate: "<%= value %>%"
      };

      var c = $('#solarChart');
      var ct = c.get(0).getContext('2d');
      var ctx = document.getElementById("solarChart").getContext("2d");
      var myNewChart = new Chart(ct).Doughnut(piedata, pieoptions);

      var piedata1 = [{
          value: batterychartinverse,
          color: "#D9D9D9"
        },
        {
          value: batterychart,
          color: "#aacf18"
        }
      ];
      var pieoptions1 = {
        segmentShowStroke: false,
        percentageInnerCutout: 60, // This is 0 for Pie charts
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: false,
        responsive: true,
        tooltipTemplate: "<%= value %>%"
      };

      var c1 = $('#batteryChart');
      var ct1 = c1.get(0).getContext('2d');
      var ctx1 = document.getElementById("batteryChart").getContext("2d");
      var myNewChart1 = new Chart(ct1).Doughnut(piedata1, pieoptions1);

    });
  });

  $(document).ready(function() {
    $('#FIRSTNAME').bind('click keyup', function() {
      var total = $(this).val();
      if (total == 0 || total == '') {
        total = 0;
      }

      // Name & Surname
      var client = document.getElementById('FIRSTNAME').value;
      $("#client").text(client);

    });
  });

  $(document).ready(function() {
    $('#COMPANY').bind('click keyup', function() {
      var total = $(this).val();
      if (total == 0 || total == '') {
        total = 0;
      }

      // Address
      var address = document.getElementById('COMPANY').value;
      $("#address").text(address);

    });
  });

  $(document).ready(function() {
    $('#PHONE').bind('click keyup', function() {
      var total = $(this).val();
      if (total == 0 || total == '') {
        total = 0;
      }

      // Contact number
      var contactno = document.getElementById('PHONE').value;
      $("#contactno").text(contactno);

    });
  });

  $(document).ready(function() {
    $('#EMAIL').bind('click keyup', function() {
      var total = $(this).val();
      if (total == 0 || total == '') {
        total = 0;
      }

      // Email
      var email = document.getElementById('EMAIL').value;
      $("#email").text(email);

    });
  });

  // CALCULATE RESULTS FUNCTION
  function calculateResults() {

  } // END CALCULATE RESULTS FUNCTION


  // RADIO BUTTON SELECTION
  $(".custom-checkbox").click(function() {
    // GENERAL RADIO SELECTION CODE
    var activeInput = $(this).children("input");
    if (activeInput.is(':checked')) {
      // deselect if already checked
      $(activeInput).prop("checked", false);
    } else {
      // select if not checked
      $(activeInput).prop("checked", true);
    }

    // REMOVE SELECTION FROM OTHER OPTIONS
    var nonActiveInput = $(this).siblings().children("input");
    $(nonActiveInput).prop("checked", false);
  }); // END RADIO BUTTON SELECTION



  // REMOVE ERROR CLASS ON KEYUP
  var questionInput = $(".question input")
  $(questionInput).each(function() {
    $(this).keyup(function() {
      if (!$(this).val() == "") {
        $(this).parent().removeClass("emptyInput");
      }
    });
  });



  // CHECK INPUTS FILLED
  function validateCalc() {
    // check all questions answered
    var empty = false;
    $(questionInput).each(function() {
      if ($(this).val() == "") {
        // if not answered add error class to ".question"
        empty = true;
        $(this).parent().addClass("emptyInput");
      } else {
        // remove error class if all filled
        $(this).parent().removeClass("emptyInput");
      }
    });

    // error message control
    if (empty) {
      // show error message
      $(".errorMessage").addClass("show");
    } else {
      // hide error message and submit form calculations
      $(".errorMessage").removeClass("show");
      calculateResults();
      $("#requestform").attr("hidden", false);
      $("#solarCalculator").attr("hidden", true);
      window.scrollTo(0, 0);
    }
  } // END CHECK INPUTS FILLED


  // SUBMIT FORM
  $("#submitCalc").click(function() {
    validateCalc();

  });
});

function getPDF() {

  let x = document.forms["sib-form"]["FIRSTNAME"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }

    let y = document.forms["sib-form"]["PHONE"].value;
      if (y == "") {
        alert("Contact number must be filled out");
        return false;
      }

      let z = document.forms["sib-form"]["EMAIL"].value;
        if (z == "") {
          alert("Email must be filled out");
          return false;
        }

  $("#divToPdf").attr("hidden", false);

  var HTML_Width = $(".canvas_div_pdf").width();
  var HTML_Height = $(".canvas_div_pdf").height();
  var top_left_margin = 15;
  var PDF_Width = HTML_Width + (top_left_margin * 2);
  var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
  var canvas_image_width = HTML_Width;
  var canvas_image_height = HTML_Height;

  var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

  html2canvas($(".canvas_div_pdf")[0], {
    useCORS: true
  }).then(function(canvas) {
    canvas.getContext('2d');

    console.log(canvas.height + "  " + canvas.width);


    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);


    for (var i = 1; i <= totalPDFPages; i++) {
      pdf.addPage(PDF_Width, PDF_Height);
      pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
    }

    pdf.save("SolarQuote.pdf");

    $("#divToPdf").attr("hidden", true);

    setTimeout(function(){location.href="https://protegepower.co.za/"} , 2000);

  });
};
