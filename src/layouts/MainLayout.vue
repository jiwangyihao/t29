<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

import { store } from "../store";

const rightDrawerOpen = store.rightDrawerOpen;
</script>
