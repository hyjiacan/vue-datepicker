# vue-datepicker

适用于 Vue2 的日期/时间选择组件。

[![NPM](https://img.shields.io/npm/l/@wangankeji/vue-datepicker?style=flat-square)](https://gitee.com/wangankeji/vue-datepicker/blob/master/LICENSE)
[![npm (scoped)](https://img.shields.io/npm/v/@wangankeji/vue-datepicker?style=flat-square)](https://www.npmjs.com/package/@wangankeji/vue-datepicker)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@wangankeji/vue-datepicker?style=flat-square)
[![](https://data.jsdelivr.com/v1/package/npm/@wangankeji/vue-datepicker/badge)](https://www.jsdelivr.com/package/npm/@wangankeji/vue-datepicker)

Powered by [popper.js V2](https://popper.js.org/docs/v2/)

> 原 `@hyjiacan/vue-datepicker`

## 安装

### NodeJS 环境 (commonjs)

```bash
npm i @wangankeji/vue-datepicker
```

或者

```bash
yarn add @wangankeji/vue-datepicker
```

可以通过以下方式获取最新的代码

```bash
git clone https://gitee.com/wangankeji/vue-datepicker.git
```

源码仓库 https://gitee.com/wangankeji/vue-datepicker

或者直接 [download archive](https://gitee.com/wangankeji/vue-datepicker/archive/master.zip)

### 浏览器环境 (umd)

> Since 2.2.0

与 NodeJS 环境相同，会暴露一个全局的 `DatePicker`。

最新版本

```html

<script src="https://cdn.jsdelivr.net/npm/@wangankeji/vue-datepicker/dist/datepicker.umd.min.js"></script>
```

指定版本

```html

<script src="https://cdn.jsdelivr.net/npm/@wangankeji/vue-datepicker@<VERSION>/dist/datepicker.umd.min.js"></script>
```

> **unpkg** 也是可用的: 替换 *cdn.jsdelivr.net* 为 *unpkg.com*

> 你也可以替换 *datepicker.umd.min.js* 为 *datepicker.umd.js* 以使用未压缩的版本进行开发调试。

注意：在浏览器环境直接引入时，需要显示引入依赖

[popper.js](https://popper.js.org/)

```html

<script src="https://cdn.jsdelivr.net/npm/popper.js@1/dist/umd/popper.min.js"></script>
```

## 使用

[在线示例(CodePen)](https://codepen.io/hyjiacan/pen/WNOMYdo)

```vue

<template>
  <date-picker v-model="date" type="date" :min="min" :max="max"/>
</template>
<script>
import DatePicker from '@wangankeji/vue-datepicker'
import '@wangankeji/vue-datepicker/dist/datepicker.css'

export default {
  components: {DatePicker},
  data() {
    return {
      date: new Date(),
      min: '2012-12-12',
      max: '2020-12-12'
    }
  }
}
</script>
```

作为日历使用

```vue

<template>
  <picker v-model="date"/>
</template>
<script>
import {Picker} from '@wangankeji/vue-datepicker'
import '@wangankeji/vue-datepicker/dist/datepicker.css'

export default {
  components: {Picker},
  data() {
    return {
      date: ''
    }
  }
}
</script>
```

更多示例参见 https://wangankeji.gitee.io/vue-datepicker/

### 类型定义

- `year` 日期选择，选择 **年** 为结果
- `month` 日期选择，选择 **月** 为结果
- `quarter` 日期选择，选择 **季度** 为结果
- `date` 日期选择，选择 **天** 为结果
- `week` 日期选择，选择 **周** 为结果
- `datetime` 日期时间选择，选择 **天和时间** 为结果
- `time` 时间选择，选择 **时间** 为结果

### 内置格式定义

```json
{
  "year": "yyyy",
  "month": "yyyy-MM-dd",
  "quarter": "yyyy-MM-dd",
  "date": "yyyy-MM-dd",
  "time": "HH:mm:ss",
  "datetime": "yyyy-MM-dd HH:mm:ss",
  "week": "yyyy-MM-dd"
}
```

> 格式定义是不可配置的。

## props

#### v-model

- type: Array, String, Number, Date
- required: true

日期/时间值。

在按范围选择时 (指定 `range`)，需要传入数组。 例外的是，按**星期**和**季度**选择时，可以仅传入一个值。 此时会自动根据传入日期所在范围设置值。

> 若要使用空值时，请传入空字符串 `''`。

#### type

- type: String
- default: 'date'

选择器显示的类型。可选值见[#类型定义](#类型定义)。

#### format

- type: String

选择器显示的日期/时间的格式。格式参考[#内置格式定义](#内置格式定义)。

此处设置的格式会应用到 `v-model`, `min`, `max` 上。

#### min

- type: Number, String, Date

设置允许的日期/时间最小值。

#### max

- type: Number, String, Date

设置允许的日期/时间最大值。

#### range

- type: Boolean
- default: false

是否按范围选择。

#### split

- type: Boolean
- default: false

是否将起止日期输入框分开显示。在指定了 `range` 为 `true` 时有效。

#### size

- type: String
- default: normal

控制日期值框的尺寸，可选值: `mini`, `small`, `normal`, `large`

#### mousewheel

- type: Boolean
- default: true

是否允许鼠标滚轮操作，当设置为 `true` 时，可以使用滚轮快速切换年/月翻页。

#### week-start

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

#### visible

- type: Boolean

控制弹出框是否可见。设置为`true`以显示。

#### shortcuts

> Since 0.3.0

- type: Array

快捷按钮的数据，这是一个对象数组。每一项的结构为:

```json
{
  "text": "按钮文本",
  "value": "按钮的值"
}
```

其中，`value` 在指定了 `range` 时为数组，否则为单个值。`text` 是按钮显示的文字。 一般最多不超过5个中文字符，超过时会自动显示为省略号。

> `value` 也可以是一个函数(异步支持)，函数内的返回值将作为结果。

#### clearable

- type: Boolean

控制清除功能是否可用。可用时会显示清除按钮。

#### hide-icon

> Since 0.4.0

- type: Boolean
- default: false

是否隐藏左侧的日历图标

#### placeholder

> Since 0.4.0

- type: String, Array
- default: 见下方

指定 `placeholder` 文本。 当未指定 `range` 属性，或 `type` 为 `week/quarter`时，应该指定为单个字符串； 否则，应该指定为包含两个字符串的数组。

默认值如下:

```javascript
const placeholders = {
  year: '选择年',
  month: '选择月',
  week: '选择周',
  quarter: '选择季度',
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

#### highlight-range

> Since 1.1.0

- type: Boolean
- default: `false`

是否高亮选中范围。(仅在指定了 `range` 时有效)

#### readonly

> (未实现)

- type: Boolean

组件是否只读。

#### editable

> (未实现)

- type: Boolean

输入框是否可编辑。设置为`true`以手动输入日期/时间。

#### to-body

> since 2.0.3

- type: Boolean
- default: `true`

#### popper-class

> since 2.1.0

- type: String
- default: `''`

指定附加到弹出框的样式名称(这个名称应该是全局的，而不是局部(`scoped`)的)。

#### value-class

> since 2.1.0

- type: String
- default: `''`

指定附加到值显示部分的样式名称(这个名称应该是全局的，而不是局部(`scoped`)的)。

#### popper-options

> since 2.1.0

- type: Object
- default: `{}`

传递给 `popperjs` 的初始化选项。详见 [popper.js#options](https://popper.js.org/docs/v2/constructors/#options)

#### trigger

> Since 2.2.0

- type: String
- default: `click`

显示日期选择弹框的触发器，可选值为 `click`, `focus`。

- `click` 此时仅可通过鼠标点击触发
- `focus` 此时仅可通过获得焦点触发
- 其它值 暂未处理。此时需要通过指定 `visible` 属性来触发

#### show-lunar

> Since 2.2.0

- type: Boolean
- default: `false`

是否显示农历信息。

#### show-festival

> Since 2.2.1

- type: Boolean
- default: `false`

是否显示节日信息。

#### markFunction

> Since 2.3.0

- type: Function

标记函数，用于在日历上做标记。

此函数接收一个参数 `e`，其在不同的类型时，结构是不同的。

但是，其始终包含一个 `type` 属性，其标识了当前的类型: `date/month/year`

## 事件

#### change

参数: `({type, value, src}, oldValue)`

- type 指定的类型
- src 事件源，用以区分事件是从何而来:
  > Since 1.1.0
  - `picker` 选择面板
  - `shortcut` 快捷键
  - `init` 初始化
  - `clear` 清空按钮

## 插槽

#### shortcut

放置自定义的快捷按钮。

> 注意：在指定了 `trigger=blur` 时，应该尽量避免在此插槽中使用会获得焦点的元素(e.g. `button/input/select`)，以防止弹框意外关闭。

#### value

> since 0.5.0

自定义值的显示。

参数: `{value, type, format, visible}`

#### title

> since 0.6.0

设置选择器上方的标题文字

当指定了 `range` 属性时，插槽需要传入包含两个元素:

```vue

<date-picker range>
<template v-slot:title>
  <div>左侧的标题</div>
  <div>右侧的标题</div>
</template>
</date-picker>
```

#### footer

> Since 2.2.0

设置选择器底部的内容。

## 工具函数

导出了一点可能会用上的日期工具函数。

引用:

```javascript
import DatePicker from '@wangankeji/vue-datepicker'
// DatePicker.util.format
```

> 所有的格式化串，请参照 [内置格式定义](#内置格式定义) 的写法。

```typescript
export interface WeekRangeOption {
  /**
   * 周起始量，0-6分别表示星期天到星期六
   */
  start: Number;
  /**
   * 周偏移量，可以是任意整数
   */
  offset: Number;
  /**
   * 是否附带时间串
   */
  time: Boolean;
  /**
   * 格式化串，不指定时返回 Date 类型
   */
  format: String;
}

export interface MonthRangeOption {
  /**
   * 月偏移量，可以是任意整数
   */
  offset: Number;
  /**
   * 是否附带时间串
   */
  time: Boolean;
  /**
   * 格式化串，不指定时返回 Date 类型
   */
  format: String;
}

export interface QuarterRangeOption {
  /**
   * 季度偏移量，可以是任意整数
   */
  offset: Number;
  /**
   * 是否附带时间串
   */
  time: Boolean;
  /**
   * 格式化串，不指定时返回 Date 类型
   */
  format: String;
}

export interface WeekOfOption {
  /**
   * 周的偏移值
   */
  start: Number;
  /**
   * 是否格式化
   */
  format: boolean;
  /**
   * 遇到跨年的情况时，周应该放置在前一年(prev)还是当年(留空)或者下一年(next)
   */
  boundary: string;
}

export interface DateRangeOption {
  /**
   * 是否格式化
   */
  format: boolean;
  /**
   * 是否附带时间串
   */
  time: Boolean;
}

export interface DateOffset {
  year: number;
  month: number;
  date: number;
}

export interface Util {
  /**
   * 将任意格式的日期格式化成指定的格式
   * @param {Date|String|Number} date
   * @param {String} format 输出格式
   * @param {String} [inputFormat] 当 date 是字符串时，通过此参数指定格式，不指定时使用 format 的值
   * @return {string}
   */
  format(date: [Date, String, Number], format: String, inputFormat?: string): string;

  /**
   * 将任意类型的日期格式转换成 Date 类型
   * @param {Date|String|Number} date
   * @param {String} [format] 当 date 是字符串时，通过此参数指定格式
   * @return {Date}
   */
  parse(date: [Date, String, Number], format?: string): Date;

  /**
   * 根据一个日期，谋算出其所在周的起止日期
   * @param {Date} date
   * @param {WeekRangeOption} [option]
   * @param {number} [option.start=0] 周起始量，0-6分别表示星期天到星期六
   * @param {number} [option.offset=0] 周偏移量，可以是任意整数
   * @param {boolean} [option.time=false] 是否附带时间串
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @return {Date[]|String[]}
   */
  getWeekRange(date: Date, option?: WeekRangeOption): Date[] | String[];

  /**
   * 根据一个日期，谋算出其所在月的起止日期 (月的第一天和最后一天)
   * @param {Date} date
   * @param {MonthRangeOption} [option]
   * @param {number} [option.offset=0] 月偏移量，可以是任意整数
   * @param {boolean} [option.time=false] 是否附带时间串
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @return {Date[]|String[]}
   */
  getMonthRange(date: Date, option?: MonthRangeOption): Date[] | String[];

  /**
   * 根据一个日期，谋算出其所在季度的起止日期
   * @param {Date} date
   * @param {QuarterRangeOption} [option]
   * @param {number} [option.offset=0] 季度偏移量，可以是任意整数
   * @param {boolean} [option.time=false] 是否附带时间串
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @return {Date[]|String[]}
   */
  getQuarterRange(date: Date, option?: QuarterRangeOption): Date[] | String[];

  /**
   * 获取传入日期处于一年中的第多少周
   * @param {Date|Date[]} date
   * @param {WeekOfOption} [option]
   * @param {number} [option.start=0] 周的偏移值
   * @return {{year: Number, week: Number}}
   */
  getWeekOfYear(date: Date | Date[], option?: WeekOfOption): { year: Number, week: Number };

  /**
   * 获取传入日期处于一月中的第多少周
   * @param {Date|Date[]} date
   * @param {WeekOfOption} [option]
   * @param {number} [option.start=0] 周的偏移值
   * @return {{year: Number, month: Number, week: Number}}
   */
  getWeekOfMonth(date: Date | Date[], option?: WeekOfOption): { year: Number, month: Number, week: Number };

  /**
   * 根据一个日期以及偏移参数获取日期范围
   * @param {Date} date
   * @param {DateOffset|string} beginOffset 开始日期的偏移量
   * @param {DateOffset|string} endOffset 结束日期的偏移量
   * @param {DateRangeOption} [option]
   * @param {string} [option.format] 格式化串，不指定时返回 Date 类型
   * @param {boolean} [option.time=false] 是否附带时间串
   * @return {Date[]|String[]}
   */
  getDateRange(date: Date, beginOffset: DateOffset | string, endOffset: DateOffset | string, option?: DateRangeOption): Date[] | string[];

  /**
   * 按指定规则对日期进行偏移
   * @param {Date} date
   * @param {DateOffset|string} offset 日期的偏移量
   * @return {Date} 偏移后的日期对象（新对象)
   */
  offsetDate(date: Date, offset: DateOffset | string): Date;

  /**
   * 获取被修正过的日期对象
   * 其修正依赖 setDate 接口
   * @see setDate
   * @return {Date} 被修正过的日期对象
   */
  getDate(): Date;

  /**
   * 设置当前日期（用于修正当前的错误日期，比如使用服务器时间的情况）
   * @param timestamp 当前的时间戳，其什可以是 秒 或者 毫秒，传入 0 表示使用系统时间
   */
  setDate(timestamp: Number): void;
}
```

说明：

函数 `getDateRange` 和  `offsetDate` 的偏移参数为字符串时，取值格式为 `1y-2m3d`:

- `1y` 表示年偏移量为 `1`
- `-2m` 表示月偏移量为 `-2`
- `3d` 表示天偏移量为 `3`

这个串的偏移结果相当于：

```javascript
const date = new Date()

date.setFullYear(date.getFullYear() + 1)
date.setMonth(date.getMonth() - 2)
date.setDate(date.getDate() + 3)
```

可以仅指定一项(`y/m/d`其中之一)或同时指定多项，不区分大小写。

## 支持

- 感谢 [iconfont](https://www.iconfont.cn/) 提供的图标平台，以及开源图标的设计者们
- 感谢 [LunarCalendar](https://github.com/zzyss86/LunarCalendar) 开源的农历算法

## 更新日志

### 2.2.4

- 添加属性 `Datepicker.util` 代替 `DatePicker.$util`
- 修复 无法使用 `Picker` 组件的问题
- 调整 属性 `marker` 为 `mark-function`
- 使用 `div+flex` 代替 `table` 布局

### 2.2.3

- 修复 新版本的 Vue 导致的插件展示错误

### 2.2.1

- 调整一些示例
- 优化 时间选择器使用 添加 `marker` 属性支持
- 修复 IE10下打不开选择框的问题
- 修复 不同浏览器的样式混乱
- 修复 插槽内的自定义内容不显示的问题
- 优化 时间选择样式
- 添加 时间修正支持

### 2.2.0

- 添加 农历显示支持 `show-lunar`
- 添加 弹框的底部插槽 `footer` 支持
- 添加 自定义触发支持 `trigger`

### 2.1.0

- 移除 `vue-popperjs`，直接使用 `popper.js`，以避免前者过多处理导致不可预料的问题
- 添加 `popper-class` 和 `value-class` ，以深度自定义样式
- 添加 `popper-options`，以自定义 `popper.js` 组件的行为
- 添加 `to-body` 属性，以支持将弹框渲染至 `body` 元素下，以解决某些情况下弹框被其它元素挡住的问题
- 修复 某些情况下选中值后无法关闭弹框的问题

### 2.0.0

- 修复 `season` 词义错误，使用 `quarter` 作为季度名称

### 1.1.2

- 修复 在仅改变了开始日期时，未触发 `change` 事件的问题

### 1.1.1

- 修复 选择弹框布局错乱

### 1.1.0

- 添加 `highlight-range` 属性，以高亮选中范围的背景
- 优化 给 `change` 事件添加 `src` 参数，以辅助开发

### 1.0.0

- 优化 将样式文件生成到独立CSS文件中，不再混入JS代码
- 修复 outline 样式

### 0.6.14

- 修复 `outline` 样式范围超出容器宽度的问题

### 0.6.13

- 修复 选中值后焦点仍然存在导致无法打开弹框的问题
- 修复 点击清除按钮会打开弹框的问题
- 修复 点击快捷按钮可能会关闭弹框的问题
- 修复 其它问题
- 优化 高亮当前日期

### 0.6.12

- 修复 点击快捷按钮时，会导致弹框关闭的问题

### 0.6.10

- 优化 支持通过焦点显示/隐藏弹框

### 0.6.9

- 修复 `type=week` 初始化时，传入值不是有正确的星期范围时可能不会触发值更新的问题

### 0.6.8

- 修复 `getDateRange` 在未传入 `option` 参数时报错的问题

### 0.6.7

- 修复 `getWeekRange` 计算错误

### 0.6.6

- 添加工具函数 `getDateRange` 与 `offsetDate`

### 0.6.5

- 优化 快捷键配置的json格式中，支持将 `value` 设置成函数

### 0.6.0

- 添加 `title` 插槽支持

### 0.5.2

- 修复 `getWeekRange` 计算错误

### 0.5.0

- 暴露出工具函数 `getWeekOfYear`
- 添加 值渲染插槽

### 0.4.0

- 修改 `geWeek(Month/Quarter)Range` 参数
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

- 优化 `range` 属性，当设置 `type` 为 `week`或`quarter`时， `range` 自动变更为 `true`
- 优化 `v-model` 属性，当设置的值为空(即未设置)时，使用当前日期

### 0.2.5

- 修复 计算周范围的错误
- 添加 工具函数 DatePicker.$util
- 添加 types 声明

### 0.2.1

- 修复 按范围选择时，背景透明的问题
- 修复 选择1月28号以后，导致1月日历丢失的问题
