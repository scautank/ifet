# ifet

A FE Development tool.

----

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/ifet.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ifet
[travis-image]: https://img.shields.io/travis/scautank/ifet.svg?style=flat-square
[travis-url]: https://travis-ci.org/scautank/ifet
[downloads-image]: http://img.shields.io/npm/dm/ifet.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/ifet

## 特性

- 基于webpack
- 可以使用ES6编码
- 支持sass
- 支持artTemplate
- 支持react
- 支持开启服务器调试
- 服务器调试支持自动刷新
- 支持单元测试
- 支持自定义配置

## 安装

```bash
  npm install ifet -g
```

## 使用

### 初始化项目

```bash
 ifet init -t react/jquery  // 默认生成react项目
```

### 启动调试

```bash
 ifet server -p 3001 -m dev/prod  // 默认启动dev模式
```

### 构建

```bash
 ifet build --debug/--watch  // 加上debug参数会生成Source Map文件，watch参数会监控文件变化重新执行build操作
```

### 测试

```bash
 ifet test --no-cov  // 默认会生成覆盖率
```

### 配置文件示例

#### ifet-conf.js 请放置在项目根目录

#### 注意：约定entry和html里面的key值必须对应

```text
{
  "entry": {  // 入口js文件
    "app": "./source_code/js/app/main",
    "bell": "./source_code/js/bell/main"
  },
  "html": {  // 入口html文件
    "app": "./source_code/app/index.html",
    "bell": "./source_code/bell/index.html"
  },
  "copy": ["./source_code/robots.txt"],  // build的时候需要复制的文件
  "output": "./build_code",  // build输出目录，默认build_code目录
  "publicPath": "/",  // 资源路径，例如http://www.tt.com/
  "imageLimit": 10000,  // 图片的大小小于10000B直接用base64
  "testDir": "./source_code/tests/",  // 测试文件目录
  "proxy": {}  // 代理配置
}
```

### 其它

- es6features https://github.com/lukehoban/es6features
- 单元测试 http://jasmine.github.io/
- http proxy https://github.com/nodejitsu/node-http-proxy#options
