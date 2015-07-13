@extends('./frame.blade.php')

@section('body')


{{-- widget 引用, 相对路径或者绝对路径，忽略 laravel 中的路径方式吧，太难用了 --}}
@widget('../header/header.blade.php')

<div id="middle" class="container">
    <div class="row">
        <div class="col-md-3">@widget('../sidebar/sidebar.blade.php')</div>
        <div class="col-md-9">
            <div id="content">@yield("content")</div>
        </div>
    </div>
</div>

@widget('../footer/footer.blade.php')

@stop
