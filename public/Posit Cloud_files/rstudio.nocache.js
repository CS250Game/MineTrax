<!doctype html>
<!--[if lt IE 7 ]>
<html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>
<html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>
<html lang="en" class="no-js ie8"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html lang="en" class="no-js"> <!--<![endif]-->
<head>
<meta charset="utf-8">
<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
<script src="//oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="//oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
<![endif]-->
<link href="/__static__/components/@icon/themify-icons/themify-icons.css?v=74945e1d23bc5d5606d3227cd8d89215caa019f4b28d668e6f02b2781a349539047652bed0b49d7f894c54541fb6c12f008ad7eda46515905be7e6d2c1cf69f6" rel="stylesheet"/>
<link href="/__static__/frontend/css/style.css?v=07049025a95746608ba399d5882bc336f051ee8e935aa3f97a998d719591d3abbb283ff4da5dee7187b7cc721a759196cf9ed4362dd9a7726617fd79ed4dc472" rel="stylesheet"/>
<!-- block head -->

<style>
.spinner {
clear: both;
margin: 0 auto;
}
</style>

<!-- block head -->
</head>
<body>
<header>
<!-- block header -->

<!-- block header -->
</header>
<div id="content">
<!-- block content -->

<div class="container vertical-table">
<div class="row vertical-align-middle">
<div class="col-lg-12">
<div class="spinner text-center">
<h3>Please Wait</h3>
<img alt="loading" src="/__static__/frontend/images/spinner.gif?v=ce6bcde20b2f6c562913c06be83f9e7c8a19b008017407a3094b76fa82bbd6b7f4048e032e07e534d4ab5442b9105294d612863735077ab13a47653a14c5866e"/>
</div>
</div>
</div>
</div>

<!-- block content -->
</div>
<footer>
<!-- block footer -->

<!-- block footer -->
</footer>
</body>
<script src="/__static__/components/jquery/dist/jquery.min.js?v=6e722fce1e8553be592b1a741972c7f5b7b0cdafce230e9d2d587d20283482881c96660682e4095a5f14df45a96ec193a9b222030c53b1b7bbe8312b2eae440d" type="text/javascript"></script>
<script src="/__static__/components/bootstrap/dist/js/bootstrap.min.js?v=a014e9acc78d10a0a7a9fbaa29deac6ef17398542d9574b77b40bf446155d210fa43384757e3837da41b025998ebfab4b9b6f094033f9c226392b800df068bce" type="text/javascript"></script>
<script src="/__static__/components/iframe-resizer/js/iframeResizer.contentWindow.js?v=f3d29f0ab8760cc6dfd51bc4a085f73618e294908a0d5ed5a8440ec7d2088857eea7eacd568d9d7414ecae76032970bfc68e593a0daaa43d8fb61701dbe276ab" type="text/javascript"></script>
<script src="/__static__/frontend/scripts/shinyapps.frame.content.js?v=d886f2a347cfa6b3658e766b104da8e1889894b31b4b38db17fc339bb87d71219d4bfe9bd5b0cac5b0796fce434474e0192e448a0f3f84f19df8c7f8e3e59aab" type="text/javascript"></script>
<!-- block layout_scripts -->

<script src="/__static__/frontend/scripts/shinyapps.js?v=290dbc9d711ce3f15a5bb8fc4006299d26e60ab34a278d6a43fac6b2157fc27f8ce613ed2930774a0e91f3ec528bed3cc26cb6f581b2b8be1ef010472c4bd95e" type="text/javascript"></script>

<!-- block layout_scripts -->
<!-- block scripts -->

<script>
var app_url = 'https://c6df117de3574d4fbf51aeddc62dc9a0.app.posit.cloud';
var healthcheck_endpoint = '/health-check';
var started_at = new Date().getTime();
var finished_at = null;
var count = 0;
var timeout = null;
function debug(message) {
if (window.console && window.console.log) {
window.console.log(message);
}
}
function reload() {
window.location.reload(true);
}
function wait() {
// wait and try again
count += 1;
var snooze = Math.min(3000, (250 * count));
debug("Application not loaded. Retrying in " + snooze + "ms");
setTimeout(function () {
check();
}, snooze);
}
function check() {
var url = app_url + healthcheck_endpoint;
$.ajax({url: url, cache: false})
.done(function (data, textStatus, xhr) {
if (xhr.status === 200) {
// log time elapsed
finished_at = new Date().getTime();
var elapsed = finished_at - started_at;
debug("Application loaded in " + elapsed + "ms (" + count + " checks). Reloading.");
if (timeout != null) {
clearTimeout(timeout);
}
reload();
} else {
wait();
}
})
.fail(function() {
wait();
});
}
$(document).ready(function () {
debug("Waiting for application to load ...");
check();
// reload regardless of success after 10 seconds
timeout = setTimeout(function () {
debug("Application failed to load after 10 seconds. Reloading.");
reload();
}, 10000);
});
</script>

<!-- block scripts -->
</html>
