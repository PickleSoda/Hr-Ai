import {
  // mdiAccountCircle,
  mdiMonitor,
  // mdiLock,
  // mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  // mdiTelevisionGuide,
  // mdiResponsive,
  // mdiPalette,
} from "@mdi/js";

export default [
  {
    to: "/dashboard",
    icon: mdiMonitor,
    label: "Dashboard",
  },
  // {
  //   to: "/tables",
  //   label: "Tables",
  //   icon: mdiTable,
  // // },
  // {
  //   to: "/forms",
  //   label: "Forms",
  //   icon: mdiSquareEditOutline,
  // },
  {
    to: "/emailAnalysis",
    label: "Email Analysis",
    icon: mdiTable,
  },
  {
    to: "/jiraAnalysis",
    label: "Jira Analysis",
    icon: mdiTable,
  },
  {
    to: "/candidatesListing",
    label: "Candidates",
    icon: mdiTable,
  },
  {
    to: "/resumeUpload",
    label: "Upload Resume",
    icon: mdiSquareEditOutline,
  },
  {
    label: "Requirements",
    icon: mdiViewList,
    menu: [
      {
        to: "/requirement",
        label: "Add",
      },
      {
        to: "/requirementListing",
        label: "Listing",
      },
    ],
  },
  // {
  //   to: "/ui",
  //   label: "UI",
  //   icon: mdiTelevisionGuide,
  // },
  // {
  //   to: "/responsive",
  //   label: "Responsive",
  //   icon: mdiResponsive,
  // },
  // {
  //   to: "/",
  //   label: "Styles",
  //   icon: mdiPalette,
  // },
  // {
  //   to: "/profile",
  //   label: "Profile",
  //   icon: mdiAccountCircle,
  // },
  // {
  //   to: "/login",
  //   label: "Login",
  //   icon: mdiLock,
  // },
  // {
  //   to: "/error",
  //   label: "Error",
  //   icon: mdiAlertCircle,
  // },
  // {
  //   label: "Requirements",
  //   icon: mdiViewList,
  //   menu: [
  //     {
  //       to: "",
  //       label: "Add",
  //     },
  //     {
  //       to: "",
  //       label: "Listing",
  //     },
  //   ],
  // },
];
