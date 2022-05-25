<template>
  <div class="status-indicator">
    <span class="status-indicator__title">
      {{indicatedData.title}}
    </span>
    <span class="status-indicator__indicator">
      <span
          v-for="(data, i) in indicatedData.data"
          :key="i"
          class="status-indicator__segment"
          :style="{'--flex-grow': `${data.value}`}"
      >
        <colored-block
            :color="data.color"
        >
        </colored-block>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import ColoredBlock from "@/components/coloredBlock.vue";
import {IndicatedData, IndicatedDataValue} from "@/entities/indicatedData";

export default defineComponent({
  name: "statusIndicator",
  components: {ColoredBlock},
  props: {
    indicatedData: {
      type: Object as PropType<IndicatedData>,
      required: true
    }
  },
  setup(props) {
    // const valuesSum = computed( () => props.indicatedData.data.reduce((acc, el) => {
    //   acc += el.value;
    //   return acc;
    // }, 0));
    // const indicatedDataPerPercent = computed(() => props.indicatedData.data.map((el) => {
    //   return {
    //     valueName: el.valueName,
    //     value: el.value / (valuesSum.value / 100),
    //     color: el.color
    //   } as IndicatedDataValue;
    // }) as IndicatedDataValue[]);
    return {
      // valuesSum,
      // indicatedDataPerPercent
    }
  }
});
</script>;

<style scoped lang="scss">
@use "src/consts/colors" as colors;
@use "src/consts/layout_consts" as consts;

.status-indicator {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;

  &__title {
    color: colors.$basic-text-color;
    font-size: 1rem;
    text-wrap: none;
  }

  &__indicator {
    display: flex;
    gap: 1px; // or 0.0625rem but I think this should be always 1px
    border-radius: 4px;
    height: 0.5rem;
    overflow: hidden;
    flex: 1 1;
  }

  &__segment {
    flex-grow: var(--flex-grow);
    display: block;
    height: 100%;
    min-width: consts.$min-segment-width;
    //flex: 1 1;
  }
}
</style>