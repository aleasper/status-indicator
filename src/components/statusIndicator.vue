<template>
  <div class="status-indicator">
    <span class="status-indicator__title">
      {{indicatedData.title}}
    </span>
    <span class="status-indicator__indicator">
      <span
          v-for="(data, i) in indicatedDataPerPercent"
          :key="i"
          :class="['status-indicator__segment',
           {'status-indicator__segment_transparent': hoveredItemIndex !== null && hoveredItemIndex !== i}]"
          :style="{'--flex-grow': `${data.value}`}"
          @mouseover.stop.prevent="handleMouseover(i)"
          @mouseleave.stop.prevent="handleMouseleave(i)"
      >
        <colored-block
            class="status-indicator__color-block"
            :color="data.valueName || hoveredItemIndex === i ? data.color: notDataDefaultColor"
        >
        </colored-block>
        <span
            :class="['status-indicator__hint', 'status-indicator__hint_top',
            {'status-indicator__hint_reflect': i+1 > indicatedDataPerPercent.length  / 2}]"
            :style="{'--font-color': data.color}"
        >
         {{data.valueName || noDataValueName}} — {{data.valuePercents}}%
        </span>
        <span
            :class="['status-indicator__hint', 'status-indicator__hint_bottom',
            {'status-indicator__hint_reflect': i+1 > indicatedDataPerPercent.length  / 2}]"
        >
          {{data.value}} {{data.valueMeasure}}
        </span>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref, ToRef} from "vue";
import ColoredBlock from "@/components/coloredBlock.vue";
import {IndicatedData, IndicatedDataValue} from "@/entities/indicatedData"
import {defaultNotRatedSegmentColor, defaultValueName} from "@/consts/ui_consts.ts";

interface IndicatedDataPerPercent extends IndicatedDataValue {
  valuePercents: number
}

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
    const noDataValueName = defaultValueName;
    const notDataDefaultColor = defaultNotRatedSegmentColor;
    const valuesSum = computed( () => props.indicatedData.data.reduce((acc, el) => {
      acc += el.value;
      return acc;
    }, 0));
    const indicatedDataPerPercent = computed(() => props.indicatedData.data.map((el) => {
      return {
        valueName: el.valueName,
        valuePercents: Math.round(el.value / (valuesSum.value / 100)),
        valueMeasure: el.valueMeasure,
        value: el.value,
        color: el.color
      } as IndicatedDataPerPercent;
    }) as IndicatedDataPerPercent[]);

    const hoveredItemIndex: ToRef<null|number> = ref(null);

    const handleMouseover = (i: number) => {
      hoveredItemIndex.value = i;
    }
    const handleMouseleave = (i: number) => {
      if (i === hoveredItemIndex.value) {
        hoveredItemIndex.value = null;
      }
    }

    return {
      indicatedDataPerPercent,
      hoveredItemIndex,
      noDataValueName, notDataDefaultColor,

      handleMouseover,
      handleMouseleave
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
  height: 3.625rem;

  &__title {
    color: colors.$basic-text-color;
    font-size: 1rem;
    text-wrap: none;
  }

  &__indicator {
    display: flex;
    gap: 1px; // or 0.0625rem but I think this should be always 1px
    border-radius: 4px;
    overflow: hidden;
    flex: 1 1;
    height: 100%;

    align-items: center;
    position: relative;

    & span:first-child .status-indicator__color-block {
      border-radius: 4px 0 0 4px;
    }
    & span:last-child .status-indicator__color-block {
      border-radius: 0 4px 4px 0;
    }
  }

  &__segment {
    flex-grow: var(--flex-grow);
    display: flex;
    align-items: center;
    height: 100%;
    min-width: consts.$min-segment-width;
    cursor: pointer;

    &:hover .status-indicator__hint {
      display: block;
    }
    &_transparent {
      opacity: 0.08;
    }
  }

  &__color-block {
    height: 0.5rem;
    width: 100%;
  }

  &__hint {
    position: absolute;
    display: none;
    height: 1.375rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    width: calc(100%);

    &_bottom {
      bottom: 0;
    }
    &_top {
      top: 0;
      font-weight: 700;
      color: var(--font-color);
    }

    &_reflect {
      right: 0;
      text-align: right;
    }
  }
}
</style>