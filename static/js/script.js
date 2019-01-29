   $(document).ready(function() {
            $("#Env").change(function() {
                alert("option is changed");
                var val = $(this).val();

                $("#privm").html(options[val]);

                $("#secvm").html(secoption[val]);

                $("#priltm").html(pltmoption[val]);

                $("#secltm").html(sltmoption[val]);

                $("#gtm").html(gtmoption[val]);

            });
        var options = [
        "<option value='blank'></option><option value='fili_sftp_testphp_prd1.fmr.com'>fili_sftp_testphp_prd1.fmr.com</option>",
        "<option value='blank'></option><option value='fili_sftp_testphp_dev1.fmr.com'>fili_sftp_testphp_dev1.fmr.com</option>"
        ];

        var secoption = [
        "<option value='blank'></option><option value='fili_sftp_testphp_prd2.fmr.com'>fili_sftp_testphp_prd2.fmr.com</option>",
        "<option value='blank'></option><option value='fili_sftp_testphp_dev2.fmr.com'>fili_sftp_testphp_dev2.fmr.com</option>"
        ];

        var pltmoption = [
        "<option value='blank'></option><option value='fili-sftp-winauto-prod.fmr.com'>fili-sftp-winauto-prod.fmr.com</option>",
        "<option value='blank'></option><option value='fili-sftp-winauto-test.fmr.com'>fili-sftp-winauto-test.fmr.com</option>"
        ];

        var sltmoption = [
        "<option value='blank'></option><option value='fili-sftp-winauto-prod2.fmr.com'>fili-sftp-winauto-prod2.fmr.com</option>",
        "<option value='blank'></option><option value='fili-sftp-winauto-test2.fmr.com'>fili-sftp-winauto-test2.fmr.com</option>"
        ];

        var gtmoption = [
        "<option value='blank'></option><option value='fili_sftp_winauto_prod_gtm.fmr.com'>fili_sftp_winauto_prod_gtm.fmr.com</option>",
        "<option value='blank'></option><option value='fili_sftp_winauto_test_gtm.fmr.com'>fili_sftp_winauto_test_gtm.fmr.com</option>"
        ];

        $("#Env").change(function () {
         //     pvmval = $(this).val();
                var envval = jQuery("#Env").val();
                alert(envval);
                $("#formvalidation").empty();

                if ( jQuery("#Env").val() == "0" ){
                        jQuery("#button").attr("disabled",true);
                        $("#prodenv").empty();
                        $("#prodenv").append("<p>"+"Deployment is disabled for Prod. Try Non-Pord"+"<p>");

                } else {
                        jQuery("#button").removeAttr("disabled");
                        $("#prodenv").empty();
                }

        });

     });

  function ProcessForm() {
        alert("form is working");
        var env = document.getElementById("Env");
        var pvvm = document.getElementById("privm");
        var svvm = document.getElementById("secvm");
        var pvltm = document.getElementById("priltm");
        var svltm = document.getElementById("secltm");
        var vgtm = document.getElementById("gtm");

        $("#formvalidation").empty();
        var env = jQuery("#Env").val();
        var privm = jQuery("#privm").val();
        var secvm = jQuery("#secvm").val();
        var priltm = jQuery("#priltm").val();
        var secltm = jQuery("#secltm").val();
        var gtm = jQuery("#gtm").val();

//        alert("the primary ltm is " + priltm);
        var dataTosend='Env='+env+'&Privm='+privm+'&Secvm='+secvm+'&Priltm='+priltm+'&Secltm='+secltm+'&GTM='+gtm;
//      alert(dataTosend);
        if ( pvvm.selectedIndex == 0 ) {
                $("#formvalidation").append("<p>"+"Select a Primary Machine"+"<p>");
        }else if ( svvm.selectedIndex == 0 ) {
                $("#formvalidation").append("<p>"+"Select a Secondary Machine"+"</P>");
        }else if ( pvltm.selectedIndex == 0 ) {
                $("#formvalidation").append("<p>"+"Select a Primary LTM"+"</p>");
        }else if ( svltm.selectedIndex == 0 ) {
                $("#formvalidation").append("<p>"+"Select a Secondary LTM"+"</p>");
        }else if ( vgtm.selectedIndex == 0 ) {
                $("#formvalidation").append("<p>"+"Select a GTM Name"+"</p>");
        }else {
                $.ajax({
                        url: "c2csftpwrapper.php",
                        type: 'post',
                        data: dataTosend,
        //              data: { Env : env, Privm : privm, Secvm : secvm, Priltm : priltm, Secltm : secltm, GTM : gtm },
                        dataType: 'text',
//                      contentType: "application/json; charset=utf-8",
//                      async: true,
                        success: function(data) {

                                alert("Great the script is working!");
                                alert(data);
                        },
                        error: function(err) {
                        alert("Error: its not working..");
                                alert(err.responseText);
                        }
                });
        }
};
        
