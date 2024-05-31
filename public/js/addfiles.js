$(document).ready(function () {
  if ((window.location.href.indexOf("admin") > -1) || (window.location.href.indexOf("1099") > -1)) {
    // for admin include these files
    $("head").append(
      '  <link href="/admin_assets/css/icons.css" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet"><link rel="stylesheet" href="/admin_assets/css/bootstrap-icons.css"><link href="/admin_assets/metismenu/css/metisMenu.min.css" rel="stylesheet" /><link href="/admin_assets/css/semi-dark.css" rel="stylesheet" /><link href="/admin_assets/css/style.css" rel="stylesheet" />  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"> '
    );

    var metisMenu = document.createElement("script");
    metisMenu.src = "/admin_assets/metismenu/js/metisMenu.min.js";
    $("body").append(metisMenu);

    var adminuser = document.createElement("script");
    adminuser.src = "/admin_assets/js/app.js";
    $("body").append(adminuser);
  } else {
    // for user include these files
    $("head").append(
      '    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />'
    );

    var userScript = document.createElement("script");
    userScript.src = "/js/script.js";
    $("body").append(userScript);
  }
});
