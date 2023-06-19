<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import axios from "axios";
import { useMainStore } from "@/stores/main";
const form = reactive({
  login: "user1",
  pass: "password1",
  remember: true,
});

const router = useRouter();

const submit = async () => {
  try {
    const username = form.login;
    const password = form.pass;
    const token = mainStore.userToken;
    const mainStore = useMainStore();

    const response = await axios.post(
      "http://192.168.243.67:5000/creds",
      {
        user: username,
        password: password,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    // Handle the response if needed
    console.log(response.data);
    mainStore.setUser({
      name: username,
      email: password,
      token: response.data.creds,
    });
    // Redirect to the dashboard
    router.push("/dashboard");
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
};
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.login"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.pass"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <FormCheckRadio
          v-model="form.remember"
          name="remember"
          label="Remember"
          :input-value="true"
        />

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
