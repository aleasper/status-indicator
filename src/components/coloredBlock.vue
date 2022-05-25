<template>
  <span class="colored-block" :style="cssProp">

  </span>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "coloredBlock",
  props: {
    color: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const cssProp = computed(() => ({
      '--block-color': props.color
    }))
    return {
      cssProp
    }
  }
});
</script>

<style scoped lang="scss">
.colored-block {
  width: 100%;
  height: 100%;
  display: block;
  background-color: var(--block-color);
}
</style>