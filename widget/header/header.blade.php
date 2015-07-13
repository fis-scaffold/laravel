<!-- Fixed navbar -->
<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
  <div class="container">
    <ul class="nav navbar-nav">
      <li @if( Request::is('/') )class="active"@endif>
        <a href="{{ url('/') }}">首页</a>
      </li>

      <li @if( Request::is('about') )class="active"@endif>
        <a href="{{ url('/about') }}">关于</a>
      </li>
    </ul>
  </div>
</div>

@script()
var init = require('./header');
init();
@endscript
