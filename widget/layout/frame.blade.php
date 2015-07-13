<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>@yield('title') - FIS &amp; Laravel Demo</title>
    @framework('/static/js/mod.js')
    @require('/static/css/normalize.css')
    @require('bootstrap/css/bootstrap.css')
    @require('bootstrap/css/bootstrap-theme.css')
    <!--[if lt IE 9]>
    <script src="/static/js/html5shiv.js" type="text/javascript"></script>
    <script src="/static/js/response.js" type="text/javascript"></script>
    <![endif]-->
    @require('/static/css/style.css')
    @placeholder('styles')
</head>
<body>
@script()
// initalize bootstrap
require(['bootstrap', 'jquery']);
@endscript
<div id="wrapper">@yield('body')</div>
@placeholder('framework')
@placeholder('scripts')
</body>
</html>
