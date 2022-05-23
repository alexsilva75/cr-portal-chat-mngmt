<template>
  <div class="card">
    <div
      class="card-body"
      :class="{
        customer: sender == 'CUSTOMER',
        attendant: sender == 'ATTENDANT',
      }"
    >
      {{ message }}
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({ message: String, sender: String });
</script>

<style scoped>
.customer {
  background-color: aqua;
}

.attendant {
  background-color: burlywood;
}
</style>
