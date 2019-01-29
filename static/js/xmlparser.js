$(document).ready(function() {
  jQuery("#logviewpre").html("");
  $("#button").click(function() {
      var filename = jQuery("#search").val();
      var form = new FormData(document.getElementById("fileupload"));
      var filename = document.getElementById("fileid").value;
      $("#formvalidation").empty();
      $("#pattern").empty();

     if ( filename == "" ) {
        $("#formvalidation").empty();
        $("#formvalidation").append("<p>"+"Please select a xml file to process"+"<p>");
     } else if ( !$("#elemsearch").val() ) {
        $("#formvalidation").append("<p>"+"Please select YES/NO for element search"+"<p>");
     } else if ( jQuery("#elemsearch").val() == "YES" && jQuery("#search").val() == "" ) {
        $("#formvalidation").append("<p>"+"Please provide the element value"+"<p>");
     } else {
            $("#logviewpre").html("");
            var formData = new FormData($("#fileupload")[0]);
            $.ajax({
                    url: "/uploader/",
                    data: formData,
                    type: 'POST',
                    contentType: false,
                    cache: false,
                    processData: false,
                    async: false,
                    success: function(response) {
                             $("#response").show();
                             $("#logviewhead").html("<h3>JSON Output</h3>");
                             $("#logviewpre").html("Loading...");
                             $("#logviewpre").html(response);
                    },
                    error: function(err) {
                           jQuery("#logviewpre").html("");
                           $("#pattern").empty();
                           alert(filename);
                           alert(fileext);
                           $("#pattern").append("<p>"+"Unable to get data. Please provide the correct element value."+"<p>");

                    }
            });
      }
});


  $("#fileid").change(function () {
    if ( jQuery("#fileid").val() != "" ){
       $("#formvalidation").empty();
       $("#pattern").empty();
       $("#logviewpre").html("");
    }
    $('#elemsearch').prop('selectedIndex',0);
    document.getElementById("search").value = "";

    var filename = document.getElementById("fileid").value;
    var file = filename.split('.');
    var fileext = file[1].toLowerCase();
    if ( file.length < 2 ){
       $("#formvalidation").append("<p>"+"Please select a valid xml file to process"+"<p>");
       jQuery("#button").attr("disabled",true);
    }else if( fileext != 'xml' ){
       $("#formvalidation").append("<p>"+"Please select a valid xml file to process"+"<p>");
       jQuery("#button").attr("disabled",true);
    }else {
       jQuery("#button").removeAttr("disabled");
       $("#formvalidation").empty();
    }
});


  $("#elemsearch").change(function () {
      if ( jQuery("#elemsearch").val() == "YES" ){
         document.getElementById("YESNO").style.display = "block";
         $("#logviewpre").html("");
         $("#formvalidation").empty();
         $("#pattern").empty();
         jQuery("#button").removeAttr("disabled");
      } else if ( jQuery("#elemsearch").val() == "NO" ){
         document.getElementById("YESNO").style.display = "none";
         $("#logviewpre").html("");
         $("#pattern").empty();
         $("#formvalidation").empty();
         document.getElementById("search").value = "";
         jQuery("#button").removeAttr("disabled");
      } else {
         $("#logviewpre").html("");
         jQuery("#button").attr("disabled",true);
         $("#formvalidation").append("<p>"+"Please select YES/NO for element search"+"<p>");
      }
  });

});
