<template>
  <div>
    <div style="width: 300px">
      <status-indicator
          :indicated-data="indicatedData"
      ></status-indicator>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StatusIndicator from "@/components/statusIndicator.vue";
import {IndicatedData} from "@/entities/indicatedData";

export default defineComponent({
  name: 'App',
  components: {
    StatusIndicator
  },
  data: () => ({
    indicatedData: {
      title: 'Risk of Loss',
      data: [
        {
          valueName: 'low',
          value: 20,
          color: '#18ef00'
        },
        {
          valueName: 'medium',
          value: 33,
          color: '#ffe01b'
        },
        {
          valueName: 'high',
          value: 12,
          color: '#ef0000'
        },
      ]
    } as IndicatedData
  })
});
</script>

<style lang="scss">
@use "src/consts/colors" as colors;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;

  color: colors.$basic-text-color;
  line-height: 1.5rem;
  font-size: 16px;
}
</style>
