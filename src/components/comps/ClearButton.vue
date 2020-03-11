<template>
    <div class="date-picker--clear">
        <span class="date-picker--clear-button datepicker-iconfont datepicker--icon-clear"
              @click.stop.prevent="$emit('clear')"/>
    </div>
</template>

<script>
export default {
  name: 'ClearButton'
}
</script>
