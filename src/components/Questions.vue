<template>
  <div class="container">
    <h2 class="display-4">Where am i ?</h2>
    <div class="form-group">
      <input id="firstname" type="text" name="title" />

      <select name="names">
        <option value="one">One</option>
        <option value="two">Two</option>
      </select>
    </div>

    <div class="users">
      <li class="user" v-for="user in users" :key="user.id">
        <span v-text="user.name"></span>
      </li>
    </div>

    <button class="edit" @click="edit">Edit</button>
    <button class="apply" @click="applyNow">Apply Now</button>
    <button class="status" @click="checkStatus">My Status</button>
    <button class="products" @click="checkProducts">Products</button>
    <div v-if="editing">
      <form>
        <div class="form-group">
          <input type="text" name="name" />
        </div>
        <button class="update" @click="update">Update</button>

        <button class="cancel">Cancel</button>
      </form>
    </div>
    <ul v-show="false">
      <li>Hidden</li>
    </ul>

    <button id="emit" @click="$emit('applied')">Emit Event</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
const editing = ref(false);

const emit = defineEmits(["updated", "applied", "isEditing", "status", "obj", "prices"]);

function update() {
  emit("updated");
  editing.value = true;
}
function applyNow() {
  emit("applied");
}
function edit() {
  emit("isEditing", 40);
  editing.value = true;
}

function checkStatus() {
  emit("status", 200, 300, 400, 404, 500);
}

function checkProducts() {
  let data = {
    company: "Apple.inc",
    product: "iPhone X",
    price: "1200 usd",
  };
  emit("obj", data);
}

type User = {
  id: number;
  name: string;
};
const users = ref<User[]>([]);
// const error = ref("");
function fetchData() {
  axios
    .get("http://localhost:3000/users")
    .then((data) => {
      users.value = data.data;
    })
    .catch((error) => (error.value = error));
}

onMounted(() => {
  fetchData();
});
</script>

<style lang="css" scoped>
li {
  list-style: none;
}
</style>
