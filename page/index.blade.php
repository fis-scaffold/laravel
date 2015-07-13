@extends('/widget/layout/front.blade.php')

@section('title', '欢迎使用 fis3 + laravel 解决方案')
@section('content')

<div class="container">
  <div class="page-header">
    <h2>
      栗子
    </h2>
  </div>

  <button class="btn btn-primary btn-duang">Duang</button>
</div>

@script()
// 同步用法，放心吧，mod.js 支持
var index = require('./index');
index('.btn-duang');
@endscript

@stop


