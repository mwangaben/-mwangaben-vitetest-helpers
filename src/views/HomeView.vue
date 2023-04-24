<template>
  <div class="container">
    <Questions />
  </div>
</template>

<script setup lang="ts">
import Questions from "../components/Questions.vue";
import { ref } from "vue";

const numbers = ref([2, 3]);

console.log(numbers.value);
</script>

<style>
.container {
  margin-top: 2rem;
}
</style>
