<script setup>
// import { reactive } from "vue";
import { useMainStore } from "@/stores/main";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { mdiBallotOutline } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
// import BaseDivider from "@/components/BaseDivider.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
// import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

const route = useRoute();
const id = ref("");

onMounted(() => {
  id.value = route.params.id;
});

const mainStore = useMainStore();

const questions = ref([]);
const messages = ref([]);
const currentQuestionIndex = ref(0);
const answer = ref("");
onMounted(() => {
  questions.value = mainStore.questions;
  if (questions.value.length > 0) {
    messages.value.push({
      id: questions.value[0].id,
      type: "question",
      content: questions.value[0].question,
    });
  }
});

const submitAnswer = () => {
  if (answer.value) {
    messages.value.push({
      id: questions.value[currentQuestionIndex.value].id,
      type: "answer",
      content: answer.value,
    });
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++;
      messages.value.push({
        id: questions.value[currentQuestionIndex.value].id,
        type: "question",
        content: questions.value[currentQuestionIndex.value].question,
      });
    }
    answer.value = "";
  }
};

const resetForm = () => {
  currentQuestionIndex.value = 0;
  messages.value = [];
  if (questions.value.length > 0) {
    messages.value.push({
      id: questions.value[0].id,
      type: "question",
      content: questions.value[0].question,
    });
  }
};
</script>

<template>
  <LayoutGuest>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Chat" main>
      </SectionTitleLineWithButton>
      <div
        class="container mx-auto h-[90vh] space-y-4 flex-grow overflow-y-auto pb-4"
      >
        <div
          v-for="message in messages"
          :key="message.id"
          :class="{
            'bg-gray-700 text-white': message.type === 'question',
            'bg-blue-600 text-white': message.type === 'answer',
          }"
          class="rounded-lg py-2 px-4"
        >
          {{ message.content }}
        </div>
      </div>
      <div
        v-if="currentQuestionIndex === questions.length"
        class="thank-you-message mt-4"
      >
        Thank you for answering the questions!
      </div>
      <CardBox class="fixed bottom-0 left-0 w-full">
        <div class="form-field mt-4">
          <FormField label="Answer">
            <FormControl
              v-model="answer"
              type="textarea"
              placeholder="Explain how we can help you"
            />
          </FormField>

          <div class="footer mt-4">
            <BaseButtons>
              <BaseButton
                v-if="currentQuestionIndex !== questions.length"
                type="submit"
                color="info"
                label="Submit"
                @click="submitAnswer"
              />
              <BaseButton
                v-if="currentQuestionIndex !== questions.length"
                type="reset"
                color="info"
                outline
                label="Reset"
                @click="resetForm"
              />
            </BaseButtons>
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutGuest>
</template>
