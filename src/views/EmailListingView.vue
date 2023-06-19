<script setup>
import { computed } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxEmail from "@/components/CardBoxEmail.vue";
import { useMainStore } from "@/stores/main";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

const mainStore = useMainStore();

const emailAnalysis = computed(() => mainStore.emailAnalysis);
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
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
    </SectionMain>
  </LayoutAuthenticated>
</template>
