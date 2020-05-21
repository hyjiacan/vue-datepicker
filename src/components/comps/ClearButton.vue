<template>
  <div class="date-picker--clear" title="清空">
        <span class="date-picker--clear-button datepicker-iconfont datepicker--icon-close"
              @click.capture.stop.prevent="$emit('clear')"
              @mouseup.stop.prevent @mousedown.stop.prevent/>
  </div>
</template>

<script>
export default {
  name: 'ClearButton'
}
</script>
