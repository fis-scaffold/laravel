// 按需编译，只编译用到的资源
fis.set('project.files', ['*.blade.php', 'map.json']);

fis.match(/^\/(?:static\/)?(.*)$/, {
  release: '/public/$1',
  url: '/$1'
});

fis.match('*.blade.php', {
  preprocessor: fis.plugin('extlang', {
    type: 'blade'
  }),

  release: '/resources/views/$&',
  url: '$&',
  useMap: true
});

fis.match(/^\/page\/(.*\.blade\.php)$/, {
  release: '/resources/views/$1',
  url: "$1"
});

fis.match('/(map.json)', {
  release: '/resources/map/map.json',
});

fis.match('*.js', {
  isMod: true
});

// static/js 下面放非模块化 js
fis.match('/static/js/*.js', {
  isMod: false,
});

// 给组件设置同名依赖
fis.match('/components/**.js', {
  useSameNameRequire: true
})

fis.match('*.tmpl', {
  parser: fis.plugin('utc'),
  rExt: '.js',
  release: false
});

fis.hook('module', {
  mode: 'mod',
  packages: [

    // 短路径
    {
      name: 'libs',
      location: './static/libs'
    }
  ]
});

fis
  .media('prod')

  .match('*.js', {
    optimizer: fis.plugin('uglify-js')
  })

  .match('*.css', {
    optimizer: fis.plugin('clean-css')
  })

  .match('*.png', {
    optimizer: fis.plugin('png-compressor')
  })

  // pack 相关

  // libs 目录下面的 js 打成一个
  .match('/static/libs/**.js', {
    packTo: 'pkg/lib.js'
  })

  // components 目录下面的打成一个。
  .match('/components/**.js', {
    packTo: '/pkg/components.js'
  })
