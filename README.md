# vue-datepicker

[![NPM](https://img.shields.io/npm/l/@hyjiacan/vue-datepicker?style=flat-square)](https://github.com/hyjiacan/vue-datepicker/blob/master/LICENSE)
[![Travis (.org)](https://img.shields.io/travis/hyjiacan/vue-datepicker?style=flat-square)](https://www.travis-ci.org/hyjiacan/vue-datepicker)
[![npm (scoped)](https://img.shields.io/npm/v/@hyjiacan/vue-datepicker?style=flat-square)](https://www.npmjs.com/package/@hyjiacan/vue-datepicker)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@hyjiacan/vue-datepicker?style=flat-square)
[![npm](https://img.shields.io/npm/dm/@hyjiacan/vue-datepicker?style=flat-square)](https://npmcharts.com/compare/@hyjiacan/vue-datepicker?minimal=true)
[![Coverage Status](https://coveralls.io/repos/github/hyjiacan/vue-datepicker/badge.svg?branch=master)](https://coveralls.io/github/hyjiacan/vue-datepicker?branch=master)
[![](https://data.jsdelivr.com/v1/package/npm/@hyjiacan/vue-datepicker/badge)](https://www.jsdelivr.com/package/npm/@hyjiacan/vue-datepicker)

Date picker for Vue.

## Install

### NodeJS ENV (commonjs)

```bash
npm i @hyjiacan/vue-datepicker
```

or

```bash
yarn add @hyjiacan/vue-datepicker
```

You can get the latest code:

```bash
git clone https://github.com/hyjiacan/vue-datepicker.git
```

or just [download archive](https://github.com/hyjiacan/vue-datepicker/archive/master.zip)

### Browser ENV (umd)

> Since version 2.4.0
 
Unlike node env, a lowercase global `datepicker` will be exploded.

The newest version
```html
<script src="https://cdn.jsdelivr.com/npm/@hyjiacan/vue-datepicker/dist/datepicker.umd.min.js"></script>
```

Specified version
```html
<script src="https://cdn.jsdelivr.com/npm/@hyjiacan/vue-datepicker@<VERSION>/dist/datepicker.umd.min.js"></script>
```

> **unpkg** is also available: instead *cdn.jsdelivr.net* with *unpkg.com*

> And you can use the uncompressed by instead *datepicker.umd.min.js* with *datepicker.umd.js* 

## Usage
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

### types

- `year` Choose year as result
- `month` Choose month as result
- `season` Choose season as result
- `date` Choose date as result
- `week` Choose week as result
- `datetime` Choose datetime as result
- `time` Choose time as result

### formats

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

These are not configurable.
