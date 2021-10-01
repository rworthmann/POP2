$(document).ready(function(){
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
    });
  });

	// $(document).ready(function() {
  //   var qty = $("#inverterDistance");
  //   qty.keyup(function() {
  //     var total = qty.val() * 30
  //     $("#totalCost1").val(total.toFixed(2));
  //   });
  // });

	// $(document).ready(function(){
	// 		$('#consumptionRands').keyup(function(){
	// 			var total = $(this).val();
	// 			if (total == 0 || total == '' ) {
	// 				total = 0;
	// 			}
	// 			$('#totalPaid').val(parseFloat(total).toFixed(2));
	// 			var totalKwh = parseFloat($('#totalPaid').val()) / parseFloat($('#kwh').val());
	// 			var totalKwh = parseFloat(totalKwh).toFixed(2);
	// 			$('#BalanceAmount').val(totalKwh);
	//
	// 		});
	// 	});

		// $(document).ready(function(){
		// 		$('#battery, #panelNorthFacing, #panelFlat').bind('click keyup', function(){
		// 			var total = $(this).val();
		// 			if (total == 0 || total == '' ) {
		// 				total = 0;
		// 			}
		// 			// var totalCharge = $("#solar").val() / 100;
		// 			// var totalCharge = parseFloat(totalCharge).toFixed(2);
		// 			if ($("#panelNorthFacing input").is(":checked")) {
		// 	      mounting = 1500;
		// 	    }
		// 			// solar panel mounting flat
		// 			if ($("#panelFlat input").is(":checked")) {
		// 	      mounting = 3500;
		// 	    }
		// 			$('#totalCharge').val(mounting);
		// 		});
		// 	});


	// // ADVANCE OPTIONS TOGGLE
	// $("#advancedQuestions").click(function(){
	// 	if ($(this).hasClass("showingAdvanced")) {
	// 		// hide advanced options
	// 		$(".advancedQuestions").slideUp();
	// 		$(this).text("Show advanced options").removeClass("showingAdvanced");
	// 	} else {
	// 		// show advanced options
	// 		$(".advancedQuestions").slideDown();
	// 		$(this).text("Hide advanced options").addClass("showingAdvanced");
	// 	}
	// });

$(document).ready(function(){
	$('#consumptionRands, #solar, #battery, #panelNorthFacing, #panelFlat, #dbSplitYes, #dbSplitNo').bind('click keyup', function(){
		var total = $(this).val();
		if (total == 0 || total == '' ) {
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
		//type of inverter required
    var inverterSize = totalpower * solar;
    // inverter description (h)
    if (inverterSize >= 200 && inverterSize <= 360) {
      inverter = "5kW Hybrid Inverter, 5kWp MPPT Controller, 48V Lithium Iron Battery Charger & Overload Protection";
    } else if (inverterSize >= 361 && inverterSize <= 720) {
      inverter = "5kW Smart Hybrid Inverter, 6kWp Dual String MPPT Controller, Dual AC Output, 48V, 100A BMS & Smart App";
    } else if (inverterSize >= 721 && inverterSize <= 3000) {
      inverter = "8kW Smart Hybrid Inverter, 10kWp Dual String MPPT Controller, Dual AC Output, 48V 190A BMS, & Smart App";
    }
		// number of inverters required (i)
    if (inverterSize >= 200 && inverterSize <= 1350) {
      inverterQty = 1;
    } else if (inverterSize >= 1351 && inverterSize <= 1800) {
      inverterQty = 2;
    } else if (inverterSize >= 1801 && inverterSize <= 3000) {
      inverterQty = 3;
    }
		// cost of inverters (r)
		if (inverterSize >= 200 && inverterSize <= 360) {
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
		// number of batteries required (j)
		var batteryQty = (totalpower * battery) / 30;
		//cost of batteryQty (s)
		var batteryCost = batteryQty * 6500;
		// number of solar panels required (k)
		var panelQty = inverterSize / 120;
		// cost of solar panels (t)
		var panelCost = panelQty * 5700;
		//generic Qty
		var genericQty = 1;
		// cost of mounting (u)
		var mountingCost = (panelQty * mounting) + (30 * 100) + (inverterQty * 5000);
		// cost of electrical work (v)
		var electricalCost = dbSplit + (5 * 360) + 2800;
		// cost of installation (w)
		var installationCost = panelQty * 2000;
		// subtotal
		var subTotal = inverterCost + batteryCost + panelCost + mountingCost + electricalCost + installationCost;
		// VAT
		var vat = subTotal * 0.15;
		// total cost
		var totalCost = subTotal + vat;
		// easy payment calculations (p)
		var monthlyPayment = totalCost * 0.02611;
		// solar cost of 10 years (q)
		var solar10YearCost = totalCost / (panelQty * 14600);
		// savings over 10 years (y)
		var savings10Year = (panelQty * 1460 * 52.79) - totalCost;
		var savings10Yearformatted = "R " + savings10Year.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
		var totalCost1 = (totalCost);
		$("#subTotal").val(subTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
		$("#vat").val(vat.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
		$("#totalCost1").val(totalCost1.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
		$("#monthlyPayment").val(monthlyPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
		$("#solarCost").val(solar10YearCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
		$("#solarSavings").val(savings10Year.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));

		// SET RESULT TEXT BASED ON PERCENT OF SALARY
		if (savings10Year > 0 )
			{ $("#howLikely").removeClass("red amber").addClass("green").text("You can save up to " + savings10Yearformatted + " over 10 years!!") }
		else if (savings10Year < 0 )
			{ $("#howLikely").removeClass("green amber").addClass("red").text("Please double check your inputs!") };

		// GENERATE DOGNUT CHART //

    var piedata = [
			{ value: solarchartinverse, color: "#D9D9D9" },
			{ value: solarchart, color: "#aacf18" }
		];
		var pieoptions = {
			segmentShowStroke : false,
			percentageInnerCutout : 60, // This is 0 for Pie charts
			animationSteps : 100,
			animationEasing : "easeOutBounce",
			animateRotate : false,
			responsive: true,
			tooltipTemplate: "<%= value %>%"
		};

		var c = $('#LTVChart');
		var ct = c.get(0).getContext('2d');
		var ctx = document.getElementById("LTVChart").getContext("2d");
		var myNewChart = new Chart(ct).Doughnut(piedata, pieoptions);

		var piedata1 = [
			{ value: batterychartinverse, color: "#D9D9D9" },
			{ value: batterychart, color: "#aacf18" }
		];
		var pieoptions1 = {
			segmentShowStroke : false,
			percentageInnerCutout : 60, // This is 0 for Pie charts
			animationSteps : 100,
			animationEasing : "easeOutBounce",
			animateRotate : false,
			responsive: true,
			tooltipTemplate: "<%= value %>%"
		};

		var c1 = $('#LTVChart1');
		var ct1 = c1.get(0).getContext('2d');
		var ctx1 = document.getElementById("LTVChart1").getContext("2d");
		var myNewChart1 = new Chart(ct1).Doughnut(piedata1, pieoptions1);

	});
});


	// CALCULATE RESULTS FUNCTION
		function calculateResults() {
		// power from Solar
    // var solar = $("#solar").val() / 100;
		// // battery size required
    // var battery = $("#battery").val() / 100;
		// // solar panel mounting north facing
		// if ($("#panelNorthFacing input").is(":checked")) {
    //   mounting = 1500;
    // }
		// // solar panel mounting flat
		// if ($("#panelFlat input").is(":checked")) {
    //   mounting = 3500;
    // }
		// // distance from solar panels to inverter
    // var inverterDistance = $("#inverterDistance").val();
    // // distance from main DB to inverterDistance
    // var dbDistance = $("dbDistance").val();
		// // DB Split yes
    // if ($("#dbSplitYes input").is(":checked")) {
    //   dbSplit = 5750;
    // }
		// // DB Split no
    // if ($("#dbSplitNo input").is(":checked")) {
    //   dbSplit = 0;
    // }
		// // type of inverter required
    // var inverterSize = total * solar
    // // inverter description (h)
    // if (inverterSize >= 200 && inverterSize <= 360) {
    //   inverter = "5kW Hybrid Inverter, 5kWp MPPT Controller, 48V Lithium Iron Battery Charger & Overload Protection";
    // } else if (inverterSize >= 361 && inverterSize <= 720) {
    //   inverter = "5kW Smart Hybrid Inverter, 6kWp Dual String MPPT Controller, Dual AC Output, 48V, 100A BMS & Smart App";
    // } else if (inverterSize >= 721 && inverterSize <= 3000) {
    //   inverter = "8kW Smart Hybrid Inverter, 10kWp Dual String MPPT Controller, Dual AC Output, 48V 190A BMS, & Smart App";
    // }
		// // number of inverters required (i)
    // if (inverterSize >= 200 && inverterSize <= 1350) {
    //   inverterQty = 1;
    // } else if (inverterSize >= 1351 && inverterSize <= 1800) {
    //   inverterQty = 2;
    // } else if (inverterSize >= 1801 && inverterSize <= 3000) {
    //   inverterQty = 3;
    // }
		//
		// // cost of inverters (r)
		// if (inverterSize >= 200 && inverterSize <= 360) {
		// 	inverterCost = 13800;
		// } else if (inverterSize >= 361 && inverterSize <= 720) {
		// 	inverterCost = 23300;
		// } else if (inverterSize >= 721 && inverterSize <= 1350) {
		// 	inverterCost = 36600;
		// } else if (inverterSize >= 1351 && inverterSize <= 1800) {
		// 	inverterCost = 73200;
		// } else if (inverterSize >= 1801 && inverterSize <= 3000) {
		// 	inverterCost = 109800;
		// }
		// // number of batteries required (j)
		// var batteryQty = (total * battery) / 30;
		// // cost of batteryQty (s)
		// var batteryCost = batteryQty * 6500;
		// // number of solar panels required (k)
		// var panelQty = invertSize / 120;
		// // cost of solar panels (t)
		// var panelCost = panelQty * 5700;
		// // generic Qty
		// var genericQty = 1;
		// // cost of mounting (u)
		// var mountingCost = (panelQty * dbSplit) + (inverterDistance * 100) + (inverterQty * 5000);
		// // cost of electrical work (v)
		// var electricalCost = dbSplit + (dbDistance * 360) +2800;
		// // cost of installation (w)
		// var installationCost = panelQty * 2000;
		// // subtotal
		// var subTotal = inverterCost + batteryCost + panelCost + mountingCost + electricalCost + installationCost;
		// // VAT
		// var vat = subTotal * 0.15;
		// // total cost
		// var totalCost = subTotal + vat;
		// // easy payment calculations (p)
		// var monthlyPayment = totalCost * 0.02611;
		// // solar cost of 10 years (q)
		// var solar10YearCost = totalCost / (panelQty * 14600);
		// // savings over 10 years (y)
		// var savings10Year = (panelQty * 1460 * 52.79) - totalCost;
		//
		// // UPDATE RESULTS
		// // $(".results").show();
		// // $("#totalRepay").html("&pound" + totalRepaid);
		// // $("#finalResult").html(finalResult);
		// // $("#totalCost1").html("<strong>Total Cost:</strong> &pound;" + totalKwh);
		// // $("#mortgageLTV").html("<strong>Mortgage LTV:</strong> " + mortgageLTV + "%");
		// // $("#mortgageDeposit").html("<strong>Deposit Percent:</strong>" + depositAmt + "%");
		//
		// // main applicant income tax math results
		// // $("#grossPay").html("<strong>Your Gross Pay:</strong> £" + userSalary);
		// // $("#taxFree").html("<strong>Your Tax Free Allowance:</strong> £" + tax1060L);
		// // $("#totalTaxable").html("<strong>Your Total Taxable Income:</strong> £" + taxableSalary + " | (£" + userSalary + " - £" + tax1060L + ")");
		// // $("#taxPaid").html("<strong>Your Tax Paid:</strong> £" + taxTakenAmount);
		// // $("#nationalInsurance").html("<strong>Your National Insurance Paid:</strong> £" + natInsurance);
		// // $("#takeHome").html("<strong>Your Yearly Take Home Pay:</strong> £" + takeHomeYear);
		// // $("#takeHomeMonthly").html("<strong>Monthly Take Home Pay:</strong> £" + takeHomeMonthly);
		// // // second applicant income tax math results
		// // $("#ap2GrossPay").html("<strong>App2 Gross Pay:</strong> £" + applicant2Salary);
		// // $("#ap2TotalTaxable").html("<strong>App2 Total Taxable Income:</strong> £" + ap2TaxableSalary + " | (£" + applicant2Salary + " - £" + tax1060L + ")");
		// // $("#ap2TaxPaid").html("<strong>App2 Tax Paid:</strong> £" + ap2TaxTakenAmount);
		// // $("#ap2NationalInsurance").html("<strong>App2 National Insurance Paid:</strong> £" + ap2NatInsurance);
		// // $("#ap2TakeHome").html("<strong>App2 Yearly Take Home Pay:</strong> £" + ap2TakeHomeYear);
		// // $("#ap2TakeHomeMonthly").html("<strong>Monthly Take Home Pay:</strong> £" + ap2TakeHomeMonthly);
		//
		//
		// // SET RESULT TEXT BASED ON PERCENT OF SALARY
		// // if (salaryPercent >= 27 )
		// // 	{ $("#howLikely").removeClass("green amber").addClass("red").text("You are very unlikely to get this mortgage because this amount equals " + salaryPercent + "%* of your monthly income") }
		// // else if (salaryPercent < 27 && salaryPercent > 20 )
		// // 	{ $("#howLikely").removeClass("red green").addClass("amber").text("You may be able to get this mortgage because this amount equals " + salaryPercent + "%* of your monthly income") }
		// // else if (salaryPercent <= 20 )
		// // 	{ $("#howLikely").removeClass("red amber").addClass("green").text("You are more likely to get this mortgage because this amount equals " + salaryPercent + "%* of your monthly income") };
		// //
		//
		// // GENERATE DOGNUT CHART //
		// var piedata = [
		// 	{ value: subTotal, color: "#e43c3c" },
		// 	{ value: vat, color: "#aacf18" }
		// ];
		// var pieoptions = {
		// 	segmentShowStroke : false,
		// 	percentageInnerCutout : 60, // This is 0 for Pie charts
		// 	animationSteps : 100,
		// 	animationEasing : "easeOutBounce",
		// 	animateRotate : true,
		// 	responsive: true,
		// 	tooltipTemplate: "<%= value %>%"
		// };
		//
		// var c = $('#LTVChart');
		// var ct = c.get(0).getContext('2d');
		// var ctx = document.getElementById("LTVChart").getContext("2d");
		// var myNewChart = new Chart(ct).Doughnut(piedata, pieoptions);
	} // END CALCULATE RESULTS FUNCTION


	// RADIO BUTTON SELECTION
	$(".custom-checkbox").click(function() {
		// ONE OR TWO APPLICANTS
		// if ($(this).is("#applyTwo")) {
		// 	// show second applicant questions
		// 	$("#applicantTwo").slideDown();
		// } else if ($(this).is("#applyOne")){
		// 	// hide second applicant questions
		// 	$("#applicantTwo").slideUp();
		// }

		// GENERAL RADIO SELECTION CODE
		var activeInput = $(this).children("input");
		if(activeInput.is(':checked')) {
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
		// fix one applicant error validation
		// if ($("#applyOne input").is(':checked')) {
		// 	$("#applicantTwo input").val("0");
		// }

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
		}
	}// END CHECK INPUTS FILLED


	// SUBMIT FORM
	$("#submitCalc").click(function(){
		validateCalc();
	});
});

