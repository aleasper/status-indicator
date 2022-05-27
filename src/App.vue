<template>
  <div class="main-playground">
      <status-indicator
          :indicated-data="indicatedData_1"
      ></status-indicator>
    <status-indicator
        :indicated-data="indicatedData_2"
    ></status-indicator>
    <status-indicator
        :indicated-data="indicatedData_3"
    ></status-indicator>
    <status-indicator
        :indicated-data="indicatedData_4"
    ></status-indicator>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StatusIndicator from "@/components/statusIndicator.vue";
import {test_data_1, test_data_2, test_data_3, test_data_4} from "@/test_data/test_data";

export default defineComponent({
  name: 'App',
  components: {
    StatusIndicator
  },
  data: () => ({
    indicatedData_1:  test_data_1,
    indicatedData_2:  test_data_2,
    indicatedData_3: test_data_3,
    indicatedData_4: test_data_4,
  })
});
</script>

<style lang="scss">
@use "src/consts/colors" as colors;

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

#app {
  font-family: 'Roboto', sans-serif; // Lab Grotesque according to import from googleapis
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  color: colors.$basic-text-color;
  line-height: 1.5rem;
  font-size: 16px;
}

.main-playground {
  padding: 2.5rem;
  width: 100%;
  column-gap: 2.5rem;
  row-gap: 2.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  box-sizing: border-box;
}
</style>
