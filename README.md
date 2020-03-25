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

可以通过以下方式获取最新的代码

```bash
git clone https://github.com/hyjiacan/vue-datepicker.git
```

源码仓库

- [https://github.com/hyjiacan/vue-datepicker](https://github.com/hyjiacan/vue-datepicker)
- [https://gitee.com/hyjiacan/vue-datepicker](https://gitee.com/hyjiacan/vue-datepicker)

或者直接 [download archive](https://github.com/hyjiacan/vue-datepicker/archive/master.zip)

### 浏览器环境 (umd)

> Since 2.4.0
 
与 NodeJS 环境不同的是，会暴露一个小写的全局 `datepicker`。

最新版本

```html
<script src="https://cdn.jsdelivr.net/npm/@hyjiacan/vue-datepicker/dist/datepicker.umd.min.js"></script>
```

指定版本
```html
<script src="https://cdn.jsdelivr.net/npm/@hyjiacan/vue-datepicker@<VERSION>/dist/datepicker.umd.min.js"></script>
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

更多示例参见

- Github https://hyjiacan.github.io/vue-datepicker/
- Gitee https://hyjiacan.gitee.io/vue-datepicker/

### 类型定义

- `year` 日期选择，选择 **年** 为结果
- `month` 日期选择，选择 **月** 为结果
- `season` 日期选择，选择 **季度** 为结果
- `date` 日期选择，选择 **天** 为结果
- `week` 日期选择，选择 **周** 为结果
- `datetime` 日期时间选择，选择 **天和时间** 为结果
- `time` 时间选择，选择 **时间** 为结果

### 内置格式定义

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

## props

#### `v-model`

- type: Array, String, Number, Date
- required: true

日期/时间值。

在按范围选择时 (指定 `range`)，需要传入数组。
例外的是，按**星期**和**季度**选择时，可以仅传入一个值。
此时会自动根据传入日期所在范围设置值。

> 若要使用空值时，请传入空字符串 `''`。 

#### `type`

- type: String
- default: 'date'
      
选择器显示的类型。可选值见[#类型定义](#类型定义)。

#### `format`

- type: String

选择器显示的日期/时间的格式。格式参考[#内置格式定义](#内置格式定义)。

此处设置的格式会应用到 `v-model`, `min`, `max` 上。

#### `min`

- type: Number, String, Date

设置允许的日期/时间最小值。

#### `max`

- type: Number, String, Date

设置允许的日期/时间最大值。

#### `range`

- type: Boolean
- default: false

是否按范围选择。

#### `split`

- type: Boolean
- default: false

是否将起止日期输入框分开显示。在指定了 `range` 为 `true` 时有效。

### size

- type: String
- default: normal

控制日期值框的尺寸，可选值: `mini`, `small`, `normal`, `large`

#### `mousewheel`

- type: Boolean
- default: true

是否允许鼠标滚轮操作，当设置为 `true` 时，可以使用滚轮快速切换年/月翻页。

#### `week-start`

> Since 0.2.0

- type: Number
- default: 0

用于设置一周的第一天是哪一天。

- `0` 星期天
- `1` 星期一
- `2` 星期二
- `3` 星期三
- `4` 星期四
- `5` 星期五
- `6` 星期六

#### `visible`

- type: Boolean

控制弹出框是否可见。设置为`true`以显示。

#### `shortcuts`

> Since 0.3.0

- type: Array

快捷按钮的数据，这是一个对象数组。每一项的结构为:
```json
{
  "text": "按钮文本",
  "value": "按钮的值"
}
```

其中，`value` 在指定了 `range` 时为数组，否则为单个值。`text` 是按钮显示的文字。
一般最多不超过5个中文字符，超过时会自动显示为省略号。

#### `clearable`

- type: Boolean

控制清除功能是否可用。可用时会显示清除按钮。

#### `hide-icon`

> Since 0.4.0

- type: Boolean
- default: false

是否隐藏左侧的日历图标

#### `placeholder`

> Since 0.4.0

- type: String, Array
- default: 见下方

指定 `placeholder` 文本。
当未指定 `range` 属性，或 `type` 为 `week/season`时，应该指定为单个字符串；
否则，应该指定为包含两个字符串的数组。

默认值如下:

```javascript
const placeholders = {
    year: '选择年',
    month: '选择月',
    week: '选择周',
    season: '选择季度',
    date: '选择日期',
    time: '选择时间',
    datetime: '选择时间',
    
    yearRange: ['起始年份', '结束年份'],
    monthRange: ['起始月份', '结束月份'],
    dateRange: ['起始日期', '结束日期'],
    timeRange: ['起始时间', '结束时间'],
    datetimeRange: ['起始时间', '结束时间']
}
```

#### `readonly`

> (未实现)

- type: Boolean

组件是否只读。

#### `editable`

> (未实现)

- type: Boolean

输入框是否可编辑。设置为`true`以手动输入日期/时间。

## 事件

#### `change`

参数: `({type, value}, oldValue)`

- type 指定的类型

## 插槽

#### `shortcuts`

放置自定义的快捷按钮。

## 工具函数

导出了一点可能会用上的日期工具函数。

引用:

```javascript
import DatePicker from '@hyjiacan/vue-datepicker'
// DatePicker.$util.format
```

导出的工具函数，在属性 `$util` 上，如: `DatePicker.$util.format`

> 所有的格式，请参照 [内置格式定义](#内置格式定义) 的写法。

### 日期格式化

```javascript
/**
 * 将任意格式的日期格式化成指定的格式
 * @param {Date|String|Number} date
 * @param {String} format 输出格式
 * @param {String} [inputFormat] 当 date 是字符串时，通过此参数指定格式，不指定时使用 format 的值
 * @return {string}
 */
format(date: [Date, String, Number], format: String, inputFormat?: string): string;
```

### 将其它类型的数据处理成日期类型

```javascript
/**
 * 将任意类型的日期格式转换成 Date 类型
 * @param {Date|String|Number} date
 * @param {String} [format] 当 date 是字符串时，通过此参数指定格式
 * @return {Date}
 */
parse(date: [Date, String, Number], format?: string): Date;
```

### 获取指定日期所在的周的范围

```javascript
/**
 * 根据一个日期，谋算出其所在周的起止日期
 * @param {Date} date
 * @param {Object} [option]
 * @param {number} [option.start=0] 周起始量，0-6分别表示星期天到星期六
 * @param {number} [option.offset=0] 周偏移量，可以是任意整数
 * @param {boolean} [option.time=false] 是否附带时间串
 * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
 * @return {Date[]|String[]}
 */
getWeekRange(date: Date, option?: WeekRangeOption): Date[];
```

### 获取指定日期所在的月的范围

```javascript
/**
 * 根据一个日期，谋算出其所在月的起止日期 (月的第一天和最后一天)
 * @param {Date} date
 * @param {Object} [option]
 * @param {number} [option.offset=0] 月偏移量，可以是任意整数
 * @param {boolean} [option.time=false] 是否附带时间串
 * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
 * @return {Date[]|String[]}
 */
getMonthRange(date: Date, option?: MonthRangeOption): Date[];
```

### 获取指定日期所在的季度的范围

```javascript
/**
 * 根据一个日期，谋算出其所在季度的起止日期
 * @param {Date} date
 * @param {Object} [option]
 * @param {number} [option.offset=0] 季度偏移量，可以是任意整数
 * @param {boolean} [option.time=false] 是否附带时间串
 * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
 * @return {Date[]|String[]}
 */
getSeasonRange(date: Date, option?: SeasonRangeOption): Date[];
```

## 支持

### 感谢 [iconfont](https://www.iconfont.cn/) 提供的图标平台，以及开源图标的设计者们

## 更新日志

### 0.4.0

- 修改 `geWeek(Month/Season)Range` 参数
- 添加 日历图标
- 优化 样式
- 移除 `split` 属性
- 添加 `placeholder` 支持

### 0.3.0

- 优化 日历上对年的限制 1900 到 2999
- 优化 范围选择样式
- 优化 函数功能
- 优化 统一样式类命名规则
- 添加 清除值功能
- 添加 空值支持
- 添加 `shortcuts`属性以及`slots=shortcut`，用于放置快捷按钮

### 0.2.6

- 优化 `range` 属性，当设置 `type` 为 `week`或`season`时， `range` 自动变更为 `true`
- 优化 `v-model` 属性，当设置的值为空(即未设置)时，使用当前日期

### 0.2.5

- 修复 计算周范围的错误
- 添加 工具函数 DatePicker.$util
- 添加 types 声明

### 0.2.1

- 修复 按范围选择时，背景透明的问题
- 修复 选择1月28号以后，导致1月日历丢失的问题
