<script setup>
import { computed } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxJira from "@/components/CardBoxJira.vue";
import { useMainStore } from "@/stores/main";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

const mainStore = useMainStore();

const jiraAnalysis = computed(() => mainStore.jiraAnalysis);
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
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
    </SectionMain>
  </LayoutAuthenticated>
</template>
