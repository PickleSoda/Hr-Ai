<script setup>
import { reactive, ref, computed } from "vue";
import axios from "axios";
import FilePicker from "@/components/FormFilePicker.vue";
import BaseButton from "@/components/BaseButton.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import NotificationBarInCard from "@/components/NotificationBarInCard.vue";
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();
const token = mainStore.userToken;
const chosenReq = ref("");
const form = reactive([]);
const files = ref([]);

const handleFileChange = (event) => {
  form.push(event);
  files.value = Array.from(event.target.files);
};
axios
  .post("http://192.168.243.67:5000/requirementFetch", {
    headers: {
      Authorization: token,
    },
  })
  .then((response) => {
    console.log(response.data);
    if (response.data) {
      mainStore.requirements = response.data;
    }
  })
  .catch((error) => {
    // Handle the error
    console.error(error);
  });
const requirements = computed(() => mainStore.requirements);

const chooseRequirement = (requirement) => {
  chosenReq.value = requirement;
  console.log(chosenReq.value);
  // form.requirement = requirement;
};
const tryPdfUpload = () => {
  console.log(form);
  // if(file)
  uploadPdf;
};
const formStatusWithHeader = ref(true);

const formStatusCurrent = ref(0);

const formStatusOptions = [
  "",
  "success",
  "error uploading the pdfs",
  "warning",
];

const uploadPdf = async () => {
  try {
    const response = await axios.post(
      "http://192.168.243.67:5000/upload",
      {
        requirement_id: chosenReq.value.id, // Assuming you want to use the first requirement's ID
        file: form[0],
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
    console.log(token);
    console.log(chosenReq.value);
  }
};
// const uploadPdfs = async () => {
//   try {
//     const response = await axios.post(
//       "http://192.168.243.67:5000/upload_bulk",
//       {
//         // requirementId: store.requirementId, // Pass the selected requirement ID
//         files: form.file,
//       },
//       {
//         headers: {
//           // Authorization: authHeader,
//         },
//       }
//     );

//     // Handle the response if needed
//     console.log(response.data);
//     formStatusCurrent.value = 1;
//   } catch (error) {
//     // Handle any errors
//     console.error(error);
//     formStatusCurrent.value = 2;
//   }
// };
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitle>Upload a PDF of a candidate</SectionTitle>
      <CardBox
        class="md:w-8/12 lg:w-8/12 xl:w-8/12 shadow-2xl md:mx-auto flex flex-row"
        is-form
        is-hoverable
        @submit.prevent="tryPdfUpload()"
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
        <BaseButtons
          class="flex flex-row pb-7 overflow-hidden"
          :requirements="requirements"
        >
          <BaseButton
            v-for="requirement in requirements"
            :key="requirement.id"
            :color="chosenReq.value == requirement ? 'primary' : 'lightDark'"
            :label="requirement.title"
            :style="{
              fontWeight: chosenReq == requirement ? 'bold' : 'normal',
            }"
            @click="chooseRequirement(requirement)"
          />
        </BaseButtons>
        <FilePicker
          label="Upload PDF"
          accept="application/pdf"
          @change="handleFileChange"
        />
        <BaseButtons
          class="flex flex-row items-center justify-center pb-7 overflow-hidden"
        >
          <BaseButton label="Submit" type="submit" color="info" />
        </BaseButtons>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
