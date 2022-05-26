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
            class="status-indicator__color-block"
            :color="data.color"
        >
        </colored-block>
        <span
            :class="['status-indicator__hint', 'status-indicator__hint_bottom',
            {'status-indicator__hint_reflect': i+1 > indicatedData.data.length  / 2}]"
        >
          {{data.valueName}}
        </span>
        <span
            :class="['status-indicator__hint', 'status-indicator__hint_top',
            {'status-indicator__hint_reflect': i+1 > indicatedData.data.length  / 2}]"
        >
         {{data.value}}
        </span>
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
    //position: relative;

    &:hover .status-indicator__hint {
      display: block;
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
    }

    &_reflect {
      right: 0;
      text-align: right;
    }
  }
}
</style>