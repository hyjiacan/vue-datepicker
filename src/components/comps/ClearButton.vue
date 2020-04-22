<template>
  <div class="date-picker--clear" title="清空">
        <span class="date-picker--clear-button datepicker-iconfont datepicker--icon-close"
              @click.stop.prevent="$emit('clear')"/>
  </div>
</template>

<script>
export default {
  name: 'ClearButton'
}
</script>
