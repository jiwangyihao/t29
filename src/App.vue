<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { getStorage } from "@sifrr/storage";
import { store } from "src/store";
import CryptoJS from "crypto-js";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

function check() {
  try {
    let bytes = CryptoJS.AES.decrypt(
      "U2FsdGVkX1+UV3kxnfzXTeq6wa1l0PfsqS7NFDQXAXw=",
      store.secret
    ).toString(CryptoJS.enc.Utf8);

    return !!bytes && bytes.toString(CryptoJS.enc.Utf8) === store.secret;
  } catch {
    return false;
  }
}

store.storage
  .get("secret")
  .then((data) => (store.secret = data.secret))
  .then(() => {
    if (route.path !== "/guide" && check()) {
      router.push("/guide");
    }
  });

onMounted(() => {
  document.querySelector("body>.loading").classList.add("mounted");
});
</script>
