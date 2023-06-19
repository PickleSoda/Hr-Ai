<script setup>
import { computed, ref, reactive } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountMultiple,
  mdiChartTimelineVariant,
  mdiReload,
  mdiGithub,
  mdiChartPie,
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import LineChart from "@/components/Charts/LineChart.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
// import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
// import CardBoxClient from "@/components/CardBoxClient.vue";
import CardBoxEmail from "@/components/CardBoxEmail.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import SectionBannerStarOnGitHub from "@/components/SectionBannerStarOnGitHub.vue";
import FormCheckRadioGroup from "@/components/FormCheckRadioGroup.vue";
import CardBoxJira from "@/components/CardBoxJira.vue";

// const fillChartData = () => {
//   chartData.value = chartConfig.sampleChartData();

// };

// onMounted(() => {
// fillChartData();
// });

const mainStore = useMainStore();

// const clientBarItems = computed(() => mainStore.clients.slice(0, 4));

const emailAnalysis = computed(() => mainStore.emailAnalysis.slice(0, 4));

const jiraAnalysis = computed(() => mainStore.jiraAnalysis.slice(0, 4));

// console.log(emailAnalysis.value)
const telegramAnalysis = computed(() => mainStore.telegramAnalysis);

const chartData = ref(null);

chartData.value = chartConfig.sampleChartData(telegramAnalysis.value.analysis);

// console.log(chartData.value)

const chartFilter = reactive({
  checkbox: ["EmotionalTone"],
});

const filteredChartData = computed(() => {
  if (!chartData.value) {
    return null;
  }

  // Get the selected checkboxes from chartFilter
  const selectedCheckboxes = chartFilter.checkbox;

  // Filter the datasets based on the selected checkboxes
  const filteredDatasets = chartData.value.datasets.filter((dataset) =>
    selectedCheckboxes.includes(dataset.label)
  );
  //   console.log(filteredDatasets)
  // Return the filtered chartData
  return {
    ...chartData.value,
    datasets: filteredDatasets,
  };
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="Overview"
        main
      >
        <BaseButton
          href="https://github.com/AchiUgulava/Hr-Ai"
          target="_blank"
          :icon="mdiGithub"
          label="Star on GitHub"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <CardBoxWidget
          trend="12%"
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="512"
          label="Clients"
        />
        <CardBoxWidget
          trend="Overflow"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="256"
          suffix="%"
          label="Performance"
        />
      </div>

      <SectionTitleLineWithButton
        :icon="mdiChartPie"
        title="Telegram Chat analysis"
      >
        <BaseButton
          :icon="mdiReload"
          color="whiteDark"
          @click="fillChartData"
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div v-if="filteredChartData">
          <line-chart :data="filteredChartData" class="h-96" />
        </div>

        <div class="pt-10 flex flex-col items-center">
          <FormCheckRadioGroup
            v-model="chartFilter.checkbox"
            name="sample-checkbox"
            :options="{
              EmotionalTone: 'Emotional Tone',
              Negative: 'Negative',
              Problem: 'Problem',
              Positive: 'Positive',
            }"
          />
        </div>
      </CardBox>

      <SectionTitleLineWithButton
        :icon="mdiAccountMultiple"
        title="Jira Analysis"
      />
      <div class="grid grid-cols-1 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxJira
            v-for="client in jiraAnalysis"
            :key="client.id"
            :name="client.username"
            :project="client.project_id"
            :analysis="client.analysis"
          />
        </div>
      </div>

      <SectionTitleLineWithButton
        :icon="mdiAccountMultiple"
        title="Email analysis"
      />
      <div class="grid grid-cols-1 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxEmail
            v-for="(client, index) in emailAnalysis"
            :key="index"
            :name="client.Sender"
            :date="client.Date"
            :analysis="client.Analysis"
          />
        </div>
      </div>

      <SectionBannerStarOnGitHub class="mt-6 mb-6" />
    </SectionMain>
  </LayoutAuthenticated>
</template>
