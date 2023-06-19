import { createRouter, createWebHashHistory } from "vue-router";
// import Style from "@/views/StyleView.vue";
import Home from "@/views/HomeView.vue";

const routes = [
  {
    meta: {
      title: "Select style",
    },
    path: "/",
    name: "log in",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: "Dashboard",
    },
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/DashboardView.vue"),
  },
  {
    meta: {
      title: "Home",
    },
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    meta: {
      title: "Tables",
    },
    path: "/tables",
    name: "tables",
    component: () => import("@/views/TablesView.vue"),
  },
  {
    meta: {
      title: "Forms",
    },
    path: "/forms",
    name: "forms",
    component: () => import("@/views/FormsView.vue"),
  },
  {
    meta: {
      title: "Add a Requirement",
    },
    path: "/requirement",
    name: "requirement",
    component: () => import("@/views/RequirementFormView.vue"),
  },
  {
    meta: {
      title: "Add a Pdf",
    },
    path: "/resumeUpload",
    name: "resumeUpload",
    component: () => import("@/views/PdfUploadView.vue"),
  },
  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    meta: {
      title: "Ui",
    },
    path: "/ui",
    name: "ui",
    component: () => import("@/views/UiView.vue"),
  },
  {
    meta: {
      title: "Responsive layout",
    },
    path: "/responsive",
    name: "responsive",
    component: () => import("@/views/ResponsiveView.vue"),
  },
  {
    meta: {
      title: "Login",
    },
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    meta: {
      title: "Error",
    },
    path: "/error",
    name: "error",
    component: () => import("@/views/ErrorView.vue"),
  },
  {
    meta: {
      title: "Candidates Listing",
    },
    path: "/candidatesListing",
    name: "candidatesListing",
    component: () => import("@/views/CandidatesListingView.vue"),
  },
  {
    meta: {
      title: "Jira Analysis",
    },
    path: "/jiraAnalysis",
    name: "jiraAnalysis",
    component: () => import("@/views/JiraListingView.vue"),
  },
  {
    meta: {
      title: "Email Analysis",
    },
    path: "/emailAnalysis",
    name: "emailAnalysis",
    component: () => import("@/views/EmailListingView.vue"),
  },
  {
    meta: {
      title: "Chat",
    },
    path: "/chat/:id", // Define a dynamic parameter :id in the route path
    name: "chat",
    component: () => import("@/views/ChatView.vue"),
    props: true, // Enable passing route params as props
  },
  {
    meta: {
      title: "Requirement Listing",
    },
    path: "/requirementListing",
    name: "requiremnetListing",
    component: () => import("@/views/RequirementListingView.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
