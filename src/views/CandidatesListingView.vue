<script setup>
import { computed } from "vue";
import { mdiTableBorder } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
// import TableSampleClients from "@/components/TableSampleClients.vue";
// import CardBox from "@/components/CardBox.vue";
// import CardBoxClient from "@/components/CardBoxClient.vue";
import CardBoxCandidates from "@/components/CardBoxCandidates.vue";
import { useMainStore } from "@/stores/main";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

const mainStore = useMainStore();

const candidatesBarItems = computed(() => mainStore.candidates);
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Tables" main />

      <div class="flex flex-col justify-between">
        <CardBoxCandidates
          v-for="client in candidatesBarItems"
          :key="client.requirement_id"
          :requirement-id="client.requirement_id"
          :name="client.owner_name"
          :email="client.owner_email"
          :path="client.path"
          :summary="client.summary"
        />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
