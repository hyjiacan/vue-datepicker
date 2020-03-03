# vue-datepicker

基于 Vue 的日期/时间选择组件。

[![NPM](https://img.shields.io/npm/l/@hyjiacan/vue-datepicker?style=flat-square)](https://github.com/hyjiacan/vue-datepicker/blob/master/LICENSE)
[![Travis (.org)](https://img.shields.io/travis/hyjiacan/vue-datepicker?style=flat-square)](https://www.travis-ci.org/hyjiacan/vue-datepicker)
[![npm (scoped)](https://img.shields.io/npm/v/@hyjiacan/vue-datepicker?style=flat-square)](https://www.npmjs.com/package/@hyjiacan/vue-datepicker)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@hyjiacan/vue-datepicker?style=flat-square)
[![npm](https://img.shields.io/npm/dm/@hyjiacan/vue-datepicker?style=flat-square)](https://npmcharts.com/compare/@hyjiacan/vue-datepicker?minimal=true)
[![Coverage Status](https://coveralls.io/repos/github/hyjiacan/vue-datepicker/badge.svg?branch=master)](https://coveralls.io/github/hyjiacan/vue-datepicker?branch=master)
[![](https://data.jsdelivr.com/v1/package/npm/@hyjiacan/vue-datepicker/badge)](https://www.jsdelivr.com/package/npm/@hyjiacan/vue-datepicker)

## 安装

### NodeJS 环境 (commonjs)

```bash
npm i @hyjiacan/vue-datepicker
```

或者

```bash
yarn add @hyjiacan/vue-datepicker
```

可以通过以下方式获取最后代码

```bash
git clone https://github.com/hyjiacan/vue-datepicker.git
```

或者直接 [download archive](https://github.com/hyjiacan/vue-datepicker/archive/master.zip)

### 浏览器环境 (umd)

> Since version 2.4.0
 
与 NodeJS 环境不同的是，会暴露一个小写的全局 `datepicker`。

最新版本

```html
<script src="https://cdn.jsdelivr.com/npm/@hyjiacan/vue-datepicker/dist/datepicker.umd.min.js"></script>
```

指定版本
```html
<script src="https://cdn.jsdelivr.com/npm/@hyjiacan/vue-datepicker@<VERSION>/dist/datepicker.umd.min.js"></script>
```

> **unpkg** 也是可用的: 替换 *cdn.jsdelivr.net* 为 *unpkg.com*

> 你也可以替换 *datepicker.umd.min.js* 为 *datepicker.umd.js* 以使用未压缩的版本进行开发调试。 

## 使用
```vue
<template>
    <date-picker v-model="date" type="date" :min="min" :max="max" />
</template>
<script>
import DatePicker from '@hyjiacan/vue-datepicker'

export default {
    components: {DatePicker},
    data(){
        return {
            date: new Date(),
            min: '2012-12-12',
            max: '2020-12-12'
        }
    }
}
</script>
```

### 类型定义 `types`

- `year` 日期选择，选择 **年** 为结果
- `month` 日期选择，选择 **月** 为结果
- `season` 日期选择，选择 **季度** 为结果
- `date` 日期选择，选择 **天** 为结果
- `week` 日期选择，选择 **周** 为结果
- `datetime` 日期时间选择，选择 **天和时间** 为结果
- `time` 时间选择，选择 **时间** 为结果

### 格式定义 `formats`

```json
{
  "year": "yyyy",
  "month": "yyyy-MM-dd",
  "season": "yyyy-MM-dd",
  "date": "yyyy-MM-dd",
  "time": "HH:mm:ss",
  "datetime": "yyyy-MM-dd HH:mm:ss",
  "week": "yyyy-MM-dd"
}
```

> 格式定义是不可配置的。

## 配置



