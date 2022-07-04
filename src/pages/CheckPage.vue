<!--suppress SpellCheckingInspection, JSUnresolvedVariable -->
<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { scroll } from "quasar";
const { setHorizontalScrollPosition } = scroll;

import { store } from "../store";

import CryptoJS from "crypto-js";

import { useRouter } from "vue-router";

const router = useRouter();

const stepper = ref(null);
const step = ref(0);

watch(step, (value) => {
  const offset =
    14 + 38 * (value + 0.5) - stepper.value.$el.firstChild.clientWidth / 2;
  setHorizontalScrollPosition(stepper.value.$el.firstChild, offset, 200);
});

//const m = "汪经尧";
//console.log(CryptoJS.AES.encrypt(m, m).toString());
/*
console.log(
  CryptoJS.AES.decrypt(
    "U2FsdGVkX18EHIFZedu/uuEfVdgHFCOYLageBc9emCs=",
    "胡子昂"
  ).toString(CryptoJS.enc.Utf8)
);
 */

const questions = ref([
  {
    question: "《元旦快乐》的男主角：",
    answer: "U2FsdGVkX18EHIFZedu/uuEfVdgHFCOYLageBc9emCs=",
    input: ref(""),
  },
  {
    question: "《元旦快乐》的女主角：",
    answer: "U2FsdGVkX1/4PmQNfzYXEwcykL5skRKiV3XXyMmAMow=",
    input: ref(""),
  },
  {
    question: "《April》的主角：",
    answer: "U2FsdGVkX1/S1ZqLETj3GWgXpZtIqb7UkKbq0Rxi7MA=",
    input: ref(""),
  },
  {
    question: "《DICK》的主角：",
    answer: "U2FsdGVkX1+QAC9eRiz9xWqfMPK50iLNGEG2b4JWZss=",
    input: ref(""),
  },
  {
    question: "《我是求》中的经典台词：你们是______，我是____",
    answer: "U2FsdGVkX1/+h0NDdkNnPk9wgAlozn6ARb2xqOVfV/g=",
    input: ref(""),
  },
  {
    question: "《海绵宝宝》中章鱼哥：",
    answer: "U2FsdGVkX19j6OyM4n9paRa69CWfJ0zLItkeVGSm2Tc=",
    input: ref(""),
  },
  {
    question: "《熊出没》中熊大：",
    answer: "U2FsdGVkX18sPRBixIrhmjwagvHg+wOdmNkeiq3ypJ4=",
    input: ref(""),
  },
  {
    question: "《焦裕禄》中：喂，________吗？",
    answer: "U2FsdGVkX18p14I3T4FHZA+bBXGszUGW/27IhB295S8=",
    input: ref(""),
  },
  {
    question: "《食物链顶端》的主角：",
    answer: "U2FsdGVkX19V1pdMT9yzbdgfyzF8t42mSK5YzJhS26E=",
    input: ref(""),
  },
  {
    question: "《人美心善》的主角：",
    answer: "U2FsdGVkX1+UV3kxnfzXTeq6wa1l0PfsqS7NFDQXAXw=",
    input: ref(""),
  },
  {
    question: "《手势表示的女生》的主角：",
    answer: "U2FsdGVkX186lThFVWwuFe8SWQI0vG56Ziry5Uj1nMk=",
    input: ref(""),
  },
  {
    question: "《Boss Egg》的主角：",
    answer: "U2FsdGVkX18EHIFZedu/uuEfVdgHFCOYLageBc9emCs=",
    input: ref(""),
  },
  {
    question: "《谦谦君子》的主角：",
    answer: "U2FsdGVkX1/le25O4OblNhWlvFfIa75BeZuukbIccfg=",
    input: ref(""),
  },
  {
    question: "《二九之歌》的主题曲：",
    answer: "U2FsdGVkX19CzurvXeBNXP68tdk5LK0QHJORtAL+RDk=",
    input: ref(""),
  },
  {
    question: "《牛头人与YYFQ》的主角：",
    answer: "U2FsdGVkX196/tc3ScsPy6+NVuKx7EhVqEok6yNJLKs=",
    input: ref(""),
  },
  {
    question: "《英语课》的第一个单词：",
    answer: "U2FsdGVkX1+9Mc7aVw4iSJHPyfmut74S8jxozjvNbao=",
    input: ref(""),
  },
  {
    question: "经典台词：数学一百五，____________",
    answer: "U2FsdGVkX1/EXA53Z0Ifa08A+0xaXNu8Lk2SK4zu3zM=",
    input: ref(""),
  },
]);

function check() {
  let score = 0;
  questions.value.forEach((question) => {
    try {
      let bytes = CryptoJS.AES.decrypt(
        question.answer,
        question.input
      ).toString(CryptoJS.enc.Utf8);
      question.check =
        !!bytes && bytes.toString(CryptoJS.enc.Utf8) === question.input;
    } catch (e) {
      question.check = false;
    }
    score += question.check ? 1 : 0;
  });

  if (questions.value[9].check && score / questions.value.length > 0.6) {
    store.secret = questions.value[9].input;
    router.push("/guide");
  } else {
    router.push("/cheat");
  }
}

onBeforeMount(() => {
  document.querySelector("body>.loading").classList.add("check");
});
</script>

<template>
  <q-page class="flex flex-center">
    <q-stepper v-model="step" ref="stepper" contracted color="primary" animated>
      <q-step
        v-for="(question, index) in questions"
        :key="question"
        :name="index"
        :title="`Question ${index}`"
        :icon="`${index + 1}`"
        :done="step > index"
      >
        <h2>{{ question.question }}</h2>
        <form @submit.prevent="$refs.stepper.next()">
          <q-input
            v-model="question.input"
            label="请输入答案（多个值之间用分号隔开）："
            outlined
            hide-bottom-space
            autofocus
          />
        </form>
      </q-step>

      <q-step :name="questions.length" title="Commit" icon="assignment">
        <h2>恭喜完成答题，点击完成查看结果吧！</h2>
      </q-step>

      <template v-slot:navigation>
        <q-space />

        <q-stepper-navigation>
          <q-btn
            @click="step === questions.length ? check() : $refs.stepper.next()"
            color="primary"
            :label="step === questions.length ? '完成' : '下一题'"
          />
          <q-btn
            v-if="step > 0"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="上一题"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<style lang="scss" scoped>
.q-stepper {
  display: flex;
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
}
:deep(.q-stepper__header) {
  padding: 0 1em;
  overflow-x: auto;
  flex-wrap: nowrap;

  &::-webkit-scrollbar {
    height: 0;
  }

  .q-icon {
    font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial,
      sans-serif;
  }

  .q-stepper__tab {
    padding: 0.5em;
  }

  //noinspection CssNoGenericFontName
  .q-stepper__tab--done .q-icon,
  .q-stepper__tab--active .q-icon,
  .q-stepper__tab:last-of-type .q-icon {
    font-family: "Material Icons";
  }

  .q-stepper__tab:first-child,
  .q-stepper__tab:last-child {
    justify-content: center;
  }

  .q-stepper__tab:first-child .q-stepper__dot,
  .q-stepper__tab:last-child .q-stepper__dot {
    transform: unset;
  }
}

main {
  flex-wrap: nowrap;
  flex-direction: column;
  max-width: 100vmin;
  margin: 0 auto;
  justify-content: flex-start;
  padding: 1em;

  h1 {
    font-size: 2em;
    line-height: normal;
    font-weight: bold;
  }

  h2 {
    font-size: 1.4em;
    line-height: normal;
    font-weight: bold;
  }

  ul {
    list-style-type: none;
    padding: 0;
    width: 100%;

    li {
      margin: 1em;
    }
  }
}
</style>
