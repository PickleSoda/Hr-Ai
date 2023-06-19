<script setup>
import { mdiTrendingDown, mdiTrendingUp, mdiTrendingNeutral } from "@mdi/js";
import CardBox from "@/components/CardBox.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import PillTag from "@/components/PillTag.vue";
import UserAvatar from "@/components/UserAvatar.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  analysis: {
    type: Object,
    required: true,
  },
});
const transformAnalysis = (analysis) => {
  const transformedArray = [];

  for (const key in analysis) {
    const label = key;
    const rate = analysis[key];
    let color = "info";
    let icon = null;

    if (rate >= 6) {
      color = "success";
      icon = mdiTrendingUp;
    } else if (rate >= 4) {
      color = "warning";
      icon = mdiTrendingNeutral;
    } else {
      color = "danger";
      icon = mdiTrendingDown;
    }

    transformedArray.push({ label, rate, color, icon });
  }

  return transformedArray;
};

console.log(transformAnalysis(props.analysis));

const details = transformAnalysis(props.analysis);
</script>

<template>
  <CardBox class="mb-6 last:mb-0" is-hoverable>
    <BaseLevel>
      <BaseLevel type="justify-start">
        <UserAvatar class="w-12 h-12 mr-6" :username="name" />
        <div class="text-center md:text-left overflow-hidden">
          <h4 class="text-xl text-ellipsis">
            {{ name }}
          </h4>
          <p class="text-gray-500 dark:text-slate-400">
            {{ date }}
          </p>
        </div>
      </BaseLevel>
      <div v-for="detail in details" :key="detail.label" class="px-2">
        <p class="text-sm text-gray-400 pb-1">
          {{ detail.label }}
        </p>
        <PillTag
          :color="detail.color"
          :label="detail.rate.toString()"
          :icon="detail.icon"
        />
      </div>
    </BaseLevel>
  </CardBox>
</template>
