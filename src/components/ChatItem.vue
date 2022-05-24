<template>
  <div class="col-md-3 col-sm-6 col-12">
    <div class="info-box">
      <span class="info-box-icon bg-info">
        <button @click="selectActiveChat" class="btn btn-info">
          <i class="fas fa-headset"></i>
        </button>
      </span>

      <div class="info-box-content">
        <span class="info-box-text"> {{ customerName }} </span>
        <span class="info-box-number">{{
          moment(sessionStart).format(" H:m:s")
        }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import moment from "moment";
const props = defineProps({
  customerName: String,
  sessionStart: String,
  chatId: Number,
});
const router = useRouter();
function parseDate(sDate: string) {
  return new Date(sDate);
}

function selectActiveChat() {
  router.push("/dashboard/active-chat/" + props.chatId);
}
</script>
