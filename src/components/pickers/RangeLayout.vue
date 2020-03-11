<template>
    <div class="date-picker--container">
        <div class="date-picker--range-begin">
            <slot name="begin"/>
        </div>
        <clear-button @clear="$emit('clear')"/>
        <div class="date-picker--range-separator"></div>
        <div class="date-picker--range-end">
            <slot name="end"/>
        </div>
        <clear-button @clear="$emit('clear')"/>
    </div>
</template>

<script>
import ClearButton from '../comps/ClearButton'

export default {
  name: 'RangeLayout',
  components: {ClearButton},
  props: {
    showClear: Boolean
  }
}
</script>
