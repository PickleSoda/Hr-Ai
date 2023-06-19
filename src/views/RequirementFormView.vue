<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { mdiAccount } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();

const formStatusWithHeader = ref(true);

const formStatusCurrent = ref(0);

const formStatusOptions = ["info", "success", "error", "warning"];

const form = reactive({
  requirements: "",
});
const token = mainStore.userToken;
const submitRequirements = async () => {
  try {
    const response = await axios.post(
      "http://192.168.243.67:5000/requirement",
      {
        requirements: form.requirements,
        title: "sample job",
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // Handle the response if needed
    console.log(response.data);
    formStatusCurrent.value = 1;
  } catch (error) {
    // Handle any errors
    console.error(error);
    formStatusCurrent.value = 2;
  }
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitle>Requirements Form</SectionTitle>

      <CardBox
        class="md:w-8/12 lg:w-8/12 xl:w-8/12 shadow-2xl md:mx-auto"
        is-form
        is-hoverable
        @submit.prevent="submitRequirements"
      >
        <NotificationBarInCard
          :color="formStatusOptions[formStatusCurrent]"
          :is-placed-with-header="formStatusWithHeader"
        >
          <span
            ><b class="capitalize">{{
              formStatusOptions[formStatusCurrent]
            }}</b>
          </span>
        </NotificationBarInCard>
        <FormField label="Requirements">
          <FormControl
            v-model="form.requirements"
            :icon-left="mdiAccount"
            help="Enter your requirements"
            placeholder="Requirements"
            type="textarea"
          />
        </FormField>

        <template #footer>
          <BaseButton label="Submit" type="submit" color="info" />
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
