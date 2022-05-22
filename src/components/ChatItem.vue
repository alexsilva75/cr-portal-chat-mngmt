<template>
  <div class="card">
    <div class="card-body d-flex justify-content-between">
      <span>{{ customerName }}</span
      ><span>{{ moment(sessionStart).format("DD/MM/YYYY H:m:s") }}</span>
      <button @click="selectActiveChat" class="btn btn-primary">
        Iniciar Atendimento
      </button>
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
