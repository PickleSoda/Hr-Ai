<script setup>
import { mdiMonitorCellphone } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
// import TableSampleClients from "@/components/TableSampleClients.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import TableRequirements from "@/components/TableRequirements.vue";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiMonitorCellphone"
        title="Empty variation"
      />

      <CardBox class="mb-6" has-table>
        <TableRequirements checkable />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
