
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }

        if (form.checkValidity() === true) {
          event.preventDefault();

          $.ajax({
            url: 'https://api.apispreadsheets.com/data/4375/',
            type: 'post',
            data: $("#myForm").serializeArray(),
            success: function() {
              window.location.href = "checkout.html"
              // alert("Form Data Submitted :)")
            },
            error: function() {
              alert("There was an error :(")
            }
          });
          // document.getElementById("myForm").reset();



        }

        form.classList.add('was-validated')

      }, false)
    })
  }, false)
})()

// URL authenticaion

var oldURL = document.referrer;
if(oldURL!="index.html"){
   location.replace("index.html")
}
