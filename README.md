# laravel
后端为 Laravel 的 FIS 项目模板。 为了能让此项目运行，请先后端安装 [laravel-fis](https://github.com/fex-team/laravel-fis) 插件


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

开启 laravel 服务后，直接把该项目产出到 laravel 项目。

```bash
$ fis3 release -d /path/of/your/laravel/app
```

## 发布产品代码

开启压缩和合并等等。。

```bash
$ fis3 release prod -d /path/of/your/laravel/app
```

## 扩展 [blade](http://laravel.com/docs/5.0/templates) 语法说明


### @require

用来引用 fis 资源，支持相对路径或者绝对路径（相对与项目根目录）。

