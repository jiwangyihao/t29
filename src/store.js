import { reactive } from "vue";
import { getStorage } from "@sifrr/storage";

export const store = reactive({
  secret: "0",
  rightDrawerOpen: false,
  storage: getStorage({
    priority: ["indexeddb", "websql", "localstorage"],
    name: "storage", // name of table (treat this as a variable name, i.e. no Spaces or special characters allowed)
    version: 1, // version number (integer / float / string), 1 is treated same as '1'
    description: "storage", // description (text)
    ttl: 24 * 60 * 60 * 1000, // Time to live/expire for data in table (in ms), 0 = forever, data will expire ttl ms after saving
  }),
});
