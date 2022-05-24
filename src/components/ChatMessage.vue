<template>
  <div class="direct-chat-msg" :class="{ right: isAttendant }">
    <div class="direct-chat-infos clearfix">
      <span
        class="direct-chat-name"
        :class="{ 'float-left': isCustomer, 'float-right': isAttendant }"
        >{{ isCustomer ? "Cliente" : "Você" }}</span
      >
      <span
        class="direct-chat-timestamp"
        :class="{ 'float-right': isCustomer, 'float-left': isAttendant }"
        >23 Jan 2:00 pm</span
      >
    </div>
    <!-- /.direct-chat-infos -->
    <!-- <img
      class="direct-chat-img"
      src="dist/img/user1-128x128.jpg"
      alt="message user image"
    /> -->

    <svg
      class="direct-chat-img"
      :class="{ right: isAttendant }"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path
        d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"
      />
    </svg>
    <!-- /.direct-chat-img -->
    <div class="direct-chat-text">
      {{ message }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "@vue/reactivity";

const props = defineProps({ message: String, sender: String });
// const emitNewMessage = defineEmits(["newMessage"]);

const isCustomer = computed(() => props.sender == "CUSTOMER");
const isAttendant = computed(() => props.sender == "ATTENDANT");
</script>

<style scoped>
.customer {
  background-color: aqua;
}

.attendant {
  background-color: burlywood;
}
</style>
