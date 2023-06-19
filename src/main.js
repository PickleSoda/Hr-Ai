import { createApp } from "vue";
import { createPinia } from "pinia";
// import { axios } from "axios";
import App from "./App.vue";
import router from "./router";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import { darkModeKey, styleKey } from "@/config.js";

import "./css/main.css";

/* Init Pinia */
const pinia = createPinia();

/* Create Vue app */
createApp(App).use(router).use(pinia).mount("#app");

/* Init Pinia stores */
const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia);

/* Fetch sample data */
mainStore.fetch("clients");
mainStore.fetch("history");
mainStore.fetch("requirements");
mainStore.fetch("candidates");
mainStore.fetch("telegramAnalysis");
mainStore.fetch("jiraAnalysis");
mainStore.fetch("emailAnalysis");
const initialQuestions = [
  { id: "id1", question: "Some question 1" },
  { id: "id2", question: "Some question 2" },
  // Add more questions as needed
];
mainStore.setQuestions(initialQuestions);
// axios.post("http://192.168.243.67:5000/requirementFetch",{
//   headers: {
//     Authorization: token,
//   },
// })
//   .then((response) => {
//     console.log(response.data);
//     if (response.data) {
//       mainStore.requirements = response.data;
//     }
//   })
//   .catch((error) => {
//     // Handle the error
//     console.error(error);
//   });
/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(true);
}

/* Default title tag */
const defaultDocumentTitle = "Admin One Vue 3 Tailwind";

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});
