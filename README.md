# laravel

基于 laravel  的 fis3 解决方案。

* 支持模块化开发，默认采用 CommonJs 规范。
* 支持模板继承（受益于 blade 模板引擎）
* 支持自动加载 fis 资源依赖，并收集 js 和 css 统一在页尾页头输出，提高性能。
* 支持 widget, 并能够支持局部变量。

## 安装 fis3

```
$ npm install fis3 -g
```

## 初始化

```bash
$ mkdir demo
$ cd demo
$ fis3 init laravel
```

## 运行 & 预览

开启 laravel 服务后，直接把该项目产出到 laravel 项目里面。

注意：laravel app 里面请先安装[laravel-fis](https://github.com/fex-team/laravel-fis) 插件，用来加载由 fis 产出的资源。

```bash
$ fis3 release -d /path/of/your/laravel/app
```

## 发布产品代码

开启压缩和合并等等。。

```bash
$ fis3 release prod -d /path/of/your/laravel/app
```

## 详细说明

### 编译插件说明

laravel 解决方案中用的插件跟其他项目差不多，唯一不同的就是使用了 [extlang](https://github.com/fex-team/fis3-preprocessor-extlang), 去掉了 [loader](https://github.com/fex-team/fis3-postpackager-loader)。

这里需要强调一下为何要去掉 [loader](https://github.com/fex-team/fis3-postpackager-loader)。因为不像纯前端项目，用 blade 后端模板，是有按需加载需求的，如:

```blade
<div>
  @if ($someCondition)
    @require('./a.js')
  @else
    @require('./b.js')
  @endif
</div>
```

此类资源加载只有在后端运行完了之后才能知道页面到底需要加载什么资源，所以，我们不能在编译期去加载资源。

laravel 方案中的做法是，将资源信息写在 `map.json` 文件中，让后端运行时去加载。

另外，[extlang](https://github.com/fex-team/fis3-preprocessor-extlang) 中主要的编译工作如下：

1. 让 `@require(path)` 、`@widget(path)`、`@url(path)`、`@extends(path)` 和 `@framework(path)` 支持相对路径或者绝对路径。
2. 识别 `@style() @endstyle` 和 `@script() @endscript`，让内容支持对应的语言能力。
3. 在适当的位置插入 `@section('fis_resource')` 用来支持后端自动收集模板中依赖的资源。

### 扩展的 [blade](http://laravel.com/docs/5.0/templates) 语法说明


#### @require(id, prefix?, affix?)

用来引用 fis 资源，可以是 js 文件，也可以是 css 文件，甚至是 `.blade.php` 文件。主要用来收集 js 和 css 文件，收集到 js 和 css 会被统一放在页尾和页头输出。支持相对路径或者绝对路径（相对与项目根目录）。注意: id 只能是项目内的资源。如果发现引用失效，请查看产出的 `map.json` 文件中是否包含此资源 ID 信息。

```blade
@require('/static/js/xxx.js')

@require('/static/css/xxx.css')
```

#### @script(url|id?, prefix?, affix?)@endscript

用来引入 js 文件或者，内嵌 js。与 `@require` 不同的时，此标签除了 `资源ID` 外，还支持外部 url。

```blade
@script('http://xxxx.domian/xxx.js')@endscript
```

另外支持内嵌 js, 内嵌的 js 同样会被收集，最终在页尾统一输出。

```blade
@script()
var alert = require('libs/alert');
alert('Hello World!');
@endscript
```

#### @style(url?, prefix?, affix?)@endstyle
请参考 `@script` 说明

#### @widget(id, data?)

widget 可以理解成页面的一部分，为了公用或者方便维护被拆分成页面片段。

被拆分的片段，可以通过 @widget(id) 引入进来，等价与 @include。

#### @uri(id)

输出指定资源的 url 地址。

### @url(id)

返回指定资源的 url 地址，可以选择输出，或者复制。

```
{{ @url('/static/js/mod.js') }}

{{-- 等价于 --}}
@uri('/static/js/mod.js')

{?
$varA = $condition ? @url('/static/js/a.js') : @url('/static/js/b.js');
?}
{{ $varA }}
```

#### @framework(id)

设置前端框架，也可以说是设置`前端模块化加载器`，可以是满足 commonJs 规范的 `mod.js` 或者 AMD 规范的 `require.js`、`esl.js` 等。

#### @placeholder(type)

fis 收集的资源，最终吐出在什么位置，完全是靠 `placeholder` 来控制的。

- `@placeholder('framework')` 输出前端框架 js.
- `@placeholder('styles')` 输出收集的 css.
- `@placeholder('scripts')` 输出收集的 js.
- `@placeholder('framework_config')` 输出异步依赖的`模块化资源映射表`。可选，因为当没有设置时，会自动在 `@placeholader('scripts')`中包含。
- `@placeholder('framework_config_with_script')` 与 `@placeholder('framework_config')` 不同的是，这个会把内容用 `<script>` 包起来
