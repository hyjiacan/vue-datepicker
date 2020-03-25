<template>
  <div class="date-picker--container">
    <slot name="prepend"/>
    <div class="date-picker--range-begin">
      <slot name="begin"/>
    </div>
    <div class="date-picker--range-separator"></div>
    <div class="date-picker--range-end">
      <slot name="end"/>
    </div>
    <slot name="append"/>
  </div>
</template>

<script>

export default {
  name: 'RangeLayout',
  props: {
    showClear: Boolean
  }
}
</script>
