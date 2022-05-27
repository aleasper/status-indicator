<template>
  <span class="colored-block" :style="cssProp">

  </span>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from "vue";

export default defineComponent({
  name: "coloredBlock",
  props: {
    color: {
      type: String as PropType<string>,
      required: true
    },
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
@use "src/consts/colors" as colors;

.colored-block {
  width: 100%;
  height: 100%;
  display: block;
  background-color: var(--block-color);
}
</style>