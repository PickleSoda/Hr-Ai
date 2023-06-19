<script setup>
// import { mdiTrendingDown, mdiTrendingUp, mdiTrendingNeutral } from "@mdi/js";
import CardBox from "@/components/CardBox.vue";
import BaseLevel from "@/components/BaseLevel.vue";
// import PillTag from "@/components/PillTag.vue";
import { ref } from "vue";
import { mdiMinus, mdiPlus } from "@mdi/js";
import UserAvatar from "@/components/UserAvatar.vue";
import BaseIcon from "./BaseIcon.vue";
const props = defineProps({
  requirementId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});
console.log(props);
const isDropdownActive = ref(false);

const candidateClick = () => {
  isDropdownActive.value = !isDropdownActive.value;
};
</script>

<template>
  <CardBox class="mb-6 last:mb-0" is-hoverable>
    <BaseLevel>
      <BaseLevel type="justify-start">
        <UserAvatar class="w-12 h-12 mr-6" :username="name" />
        <div class="text-center md:text-left overflow-hidden">
          <h4 class="text-xl text-ellipsis">
            {{ name }}
          </h4>
          <p class="text-gray-500 dark:text-slate-400">
            {{ email }}
          </p>
        </div>
      </BaseLevel>
      <BaseIcon
        :path="isDropdownActive ? mdiMinus : mdiPlus"
        class="flex-none cursor-pointer rounded-md p-4 hover:bg-blue-800 scale-125"
        :class="[vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : '']"
        w="w-12"
        @click="candidateClick"
      />
    </BaseLevel>
    <BaseLevel v-if="isDropdownActive" class="w-full p-4">
      <div
        class="text-center space-y-1 md:text-left md:mr-6 flex flex-col items-center"
      >
        <h4 class="text-xl">candidate summary</h4>
        <p class="text-gray-500 dark:text-slate-400">
          {{ summary }}
        </p>
        <div class="p-3 mr-5 mb-10 overflow-hidden w-56 my-4">
          <router-link
            :to="{ name: 'chat', params: { id: requirementId } }"
            target="_blank"
            class="p-3 rounded-md bg-red-500"
          >
            generate custom chat
          </router-link>
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
