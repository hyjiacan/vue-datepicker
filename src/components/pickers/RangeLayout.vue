<template>
  <div class="date-picker-container" :class="{'date-picker-container__show-clear': showClear}">
    <div class="date-picker-range__begin">
      <slot name="begin"/>
    </div>
    <div class="date-picker-range__separator"></div>
    <div class="date-picker-range__end">
      <slot name="end"/>
    </div>
    <div class="date-picker__clear">
      <span class="date-picker__clear-button" @click.stop.prevent="$emit('clear')">x</span>
    </div>
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
