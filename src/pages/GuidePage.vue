<!--suppress HtmlRequiredAltAttribute -->
<script setup>
import { computed, ref } from "vue";
import CryptoJS from "crypto-js";
import { store } from "src/store";

const step = ref("guide");
const guideDone = ref(false);
const vpnDone = ref(false);
const telegramDone = ref(false);
const settingDone = ref(false);
//const MTProtoDone = ref(false);
const QQDone = ref(false);

const xiaoniuExpanded = ref(false);
const qifeiExpanded = ref(false);
//const xiaoyuExpanded = ref(false);
//const laowangExpanded = ref(false);

const stepper = ref(null);

const data = ref({
  guide: {
    title: "入群教程",
    paras: [
      "恭喜你通过了挑战，现在我们已经是自己人了！（笑",
      "下面我们将用一些简单的步骤帮助你加入我们的群聊。",
      "如果你只是想寻找一个能收到班长、课代表通知，大家一起正能量的地方，也可以点击跳过直接加入我们的 QQ 分群",
      "警告：不够“正能量”的消息可能会被撤回，屡犯不改可能会被禁言或踢出群聊。",
      "警告：QQ 分群中不会有特别的防护措施（毕竟已经有了 Telegram 总群）",
    ],
  },
  vpn: {
    title: "安装一个 VPN",
    paras: [
      "Telegram 作为一个拥有 7 亿（全球）月活跃用户的世界第五大应用，自然无法在国内直接访问（笑",
      "因此在正式开始之前，我们要安装一个 VPN。",
      "下面列出了几个我认为还算好用的 VPN，按照推荐程度排序。你可以从中选择一个你喜欢的下载。",
      "对于苹果用户，很抱歉之前没有考虑到这方面的内容。苹果闭环的生态决定了它不能像安卓一样。下面新增了由小牛 VPN 提供的苹果教程。请在换区之后自行下载 VPN 以及 Telegram 软件，并从“加入群组”一节继续",
    ],
    vpnList: [
      {
        id: "xiaoniu",
        name: "小牛加速器",
        caption: "速度快，无广告",
        link: "https://aoxvpn.cc/dl/package/android/aoxvpn-v3.3.2.apk",
        expanded: false,
      },
      {
        id: "qifei",
        name: "起飞 VPN",
        caption: "节点丰富",
        link: "https://bitbucket.org/AmbroseLee/gofly/raw/master/gofly4.2.0.apk",
        expanded: false,
      },
      {
        id: "xiaoniu",
        name: "【苹果】小牛加速器",
        caption: "苹果相关教程",
        link: "https://aoxvpn.cc/zhs/iosdownload/",
        expanded: computed(() => false),
      },
    ],
    btn: {
      label: "尝试访问谷歌",
      link: "https://google.com",
    },
    additionalPara: "配置完成后就让我们继续吧！",
  },
  download: {
    title: "下载并注册 Telegram",
    paras: [
      "现在我们已经来到了墙外，让我们下载 Telegram 并注册一个账号吧！",
      "注意：接下来的操作需要在开启 VPN 后进行。",
    ],
    btn: {
      label: "下载 Telegram",
      link: "https://telegram.org/dl/android/apk",
    },
    video: "/videos/download.mp4",
  },
  group: {
    title: "加入我们的群组",
    paras: ["软件设置里找不到中文？先不要急，我们会在加入群组后解决这个问题："],
    btn: {
      label: "加入群组",
      link: "https://t.me/+wYjsAaInSiUwNTJl",
    },
    video: "/videos/join.mp4",
  },
  setting: {
    title: "一点额外的设置",
    paras: [
      "现在我们对 Telegram 进行一点设置，让它更好用一点吧！",
      "下面是一些简单的设置：",
    ],
    list: [
      "切换中文（此处翻译来自频道“枫叶的中文电报计划”，Telegram 中也有官方社区提供的中文翻译）",
      "禁用手机号码搜寻功能",
      "延长账号保留时间",
      "启用消息翻译功能",
      "开启锁定密码并禁止 Telegram 被截屏",
    ],
    video: "/videos/setting.mp4",
  },
  qq: {
    title: "QQ 分群",
    paras: [
      "不论你是完成了上述教程还是直接跳至此处，有关 Telegram 的部分就此告一段落了。",
      "处于许多原因考虑（比如 Telegram 的使用难度、同学们的使用习惯等等），我们依然为大家准备了一个 QQ 上的分群。",
      "尽管之前已经说过一次，但这一还是要再次重申：",
    ],
    list: [
      "本群仅供班长、课代表发布通知，以及大家一起“正能量”",
      "不够“正能量”的消息可能会被撤回，屡犯不改可能会被禁言或踢出群聊",
      "QQ 分群中不会有特别的防护措施（毕竟已经有了 Telegram 总群）",
    ],
    additionalParas: [
      "扫码入群大家想必都会，所以就不录制视频教程了（笑",
      "注：必答题是第10题，答案你肯定知道（不然也看不到这段话）",
    ],
  },
  conclusion: {
    title: "总结",
    paras: ["现在我们已经完成了所有设置，还愣着干嘛？去群里啊！"],
  },
});
/*
console.log(
  CryptoJS.AES.encrypt(JSON.stringify(data.value), "陈晴").toString()
);

console.log(
  CryptoJS.AES.decrypt(
    "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",
    "陈晴"
  ).toString(CryptoJS.enc.Utf8)
);

const data = ref(
  JSON.parse(
    CryptoJS.AES.decrypt(
      "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",
      store.secret
    ).toString(CryptoJS.enc.Utf8)
  )
);*/
</script>

<template>
  <q-page class="flex flex-center">
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
      header-nav
      ref="stepper"
    >
      <q-step
        name="guide"
        :title="data.guide.title"
        icon="contact_support"
        :done="guideDone"
      >
        <p v-for="content in data.guide.paras" :key="content">{{ content }}</p>
        <q-stepper-navigation>
          <q-btn
            @click="
              $refs.stepper.next();
              guideDone = true;
            "
            color="primary"
            label="继续"
          />
          <q-btn
            flat
            @click="step = 'QQ'"
            color="primary"
            label="跳过"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step name="vpn" :title="data.vpn.title" icon="send" :done="vpnDone">
        <p v-for="content in data.vpn.paras" :key="content">{{ content }}</p>

        <q-card class="my-card" v-for="vpn in data.vpn.vpnList" :key="vpn">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="`/img/${vpn.id}.png`" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ vpn.name }}</q-item-label>
              <q-item-label caption>{{ vpn.caption }}</q-item-label>
            </q-item-section>

            <q-card-actions>
              <q-btn :href="vpn.link" target="_blank" color="primary">
                下载
              </q-btn>
              <q-btn
                color="grey"
                round
                flat
                dense
                :icon="
                  vpn.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                "
                @click="vpn.expanded = !vpn.expanded"
              />
            </q-card-actions>
          </q-item>

          <q-slide-transition>
            <div v-show="vpn.expanded">
              <q-separator />
              <q-card-section>
                <video :src="`/videos/${vpn.id}.mp4`" controls></video>
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
        <!--
        <q-card class="my-card">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="../assets/img/qifei.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>起飞 VPN</q-item-label>
              <q-item-label caption>节点丰富</q-item-label>
            </q-item-section>

            <q-card-actions>
              <q-btn href="" target="_blank" color="primary">下载</q-btn>
              <q-btn
                color="grey"
                round
                flat
                dense
                :icon="
                  qifeiExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                "
                @click="qifeiExpanded = !qifeiExpanded"
              />
            </q-card-actions>
          </q-item>

          <q-slide-transition>
            <div v-show="qifeiExpanded">
              <q-separator />
              <q-card-section>
                <video src="../assets/videos/qifei.mp4" controls></video>
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
        <q-card class="my-card">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="../assets/img/xiaoyu.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>小羽</q-item-label>
              <q-item-label caption>操作便捷</q-item-label>
            </q-item-section>

            <q-card-actions>
              <q-btn
                href="http://apk.xiaoyukj.cc/api/bg/apk/smallwings-latest.apk?v=13007"
                target="_blank"
                color="primary"
                >下载</q-btn
              >
              <q-btn
                color="grey"
                round
                flat
                dense
                :icon="
                  xiaoyuExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                "
                @click="xiaoyuExpanded = !xiaoyuExpanded"
              />
            </q-card-actions>
          </q-item>

          <q-slide-transition>
            <div v-show="xiaoyuExpanded">
              <q-separator />
              <q-card-section>
                <video src="../assets/videos/sample.mp4" controls></video>
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
        <q-card class="my-card">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="../assets/img/laowang.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>老王 VPN</q-item-label>
              <q-item-label caption>经典，但最近并不好使</q-item-label>
            </q-item-section>

            <q-card-actions>
              <q-btn href="/files/laowang.apk" target="_blank" color="primary"
                >下载</q-btn
              >
              <q-btn
                color="grey"
                round
                flat
                dense
                :icon="
                  laowangExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                "
                @click="laowangExpanded = !laowangExpanded"
              />
            </q-card-actions>
          </q-item>

          <q-slide-transition>
            <div v-show="laowangExpanded">
              <q-separator />
              <q-card-section>
                <video src="../assets/videos/sample.mp4" controls></video>
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
        -->

        <q-btn :href="data.vpn.btn.link" target="_blank">
          {{ data.vpn.btn.label }}
        </q-btn>

        <p>{{ data.vpn.additionalPara }}</p>

        <q-stepper-navigation>
          <q-btn
            @click="
              $refs.stepper.next();
              vpnDone = true;
            "
            color="primary"
            label="继续"
          />
          <q-btn
            flat
            @click="$refs.stepper.previous()"
            color="primary"
            label="上一步"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        name="download"
        :title="data.download.title"
        icon="file_download"
        :done="telegramDone"
      >
        <p v-for="content in data.download.paras" :key="content">
          {{ content }}
        </p>

        <q-btn :href="data.download.btn.link">
          {{ data.download.btn.label }}
        </q-btn>
        <p></p>
        <video :src="data.download.video" controls></video>

        <q-stepper-navigation>
          <q-btn
            @click="
              $refs.stepper.next();
              telegramDone = true;
            "
            color="primary"
            label="继续"
          />
          <q-btn
            flat
            @click="$refs.stepper.previous()"
            color="primary"
            label="上一步"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        name="group"
        :title="data.group.title"
        icon="group_add"
        :done="telegramDone"
      >
        <p v-for="content in data.group.paras" :key="content">
          {{ content }}
        </p>

        <q-btn :href="data.group.btn.link">
          {{ data.group.btn.label }}
        </q-btn>
        <p></p>
        <video :src="data.group.video" controls></video>

        <q-stepper-navigation>
          <q-btn
            @click="
              $refs.stepper.next();
              telegramDone = true;
            "
            color="primary"
            label="继续"
          />
          <q-btn
            flat
            @click="$refs.stepper.previous()"
            color="primary"
            label="上一步"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        name="setting"
        :title="data.setting.title"
        icon="settings"
        :done="settingDone"
      >
        <p v-for="content in data.setting.paras" :key="content">
          {{ content }}
        </p>

        <ol>
          <li v-for="content in data.setting.list" :key="content">
            {{ content }}
          </li>
        </ol>

        <video :src="data.setting.video" controls></video>

        <q-stepper-navigation>
          <q-btn
            @click="
              $refs.stepper.next();
              settingDone = true;
            "
            color="primary"
            label="继续"
          />
          <q-btn
            flat
            @click="$refs.stepper.previous()"
            color="primary"
            label="上一步"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <!--
      <q-step
        name="MTProto"
        title="【可选】Telegram MTProto"
        icon="hub"
        :done="MTProtoDone"
      >
        <p>每次使用都要打开 VPN 软件很麻烦？</p>

        <p>VPN 偶尔会失效？</p>

        <p>
          GoogleHosts 项目组提供了 Telegram 公益代理，你可以点击下方链接添加：
        </p>

        <q-btn
          href="https://t.me/proxy?server=tg-7.googlehosts.org&port=2335&secret=7hFCDxWP-ehFO9fQguLNzup0Zy0xMC5nb29nbGVob3N0cy5vcmc"
        >
          线路七
        </q-btn>

        <video src="../assets/videos/join.mp4" controls></video>

        <q-stepper-navigation>
          <q-btn
            @click="
              $refs.stepper.next();
              MTProtoDone = true;
            "
            color="primary"
            label="继续"
          />
          <q-btn
            flat
            @click="$refs.stepper.previous()"
            color="primary"
            label="上一步"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
      -->

      <q-step
        name="QQ"
        :title="data.qq.title"
        icon="qr_code_scanner"
        :done="QQDone"
      >
        <p v-for="content in data.qq.paras" :key="content">
          {{ content }}
        </p>

        <ul>
          <li v-for="content in data.qq.list" :key="content">
            {{ content }}
          </li>
        </ul>

        <p v-for="content in data.qq.additionalParas" :key="content">
          {{ content }}
        </p>

        <q-img src="/img/qq.jpg" :ratio="3 / 4" />

        <q-stepper-navigation>
          <q-btn
            @click="
              $refs.stepper.next();
              QQDone = true;
            "
            color="primary"
            label="继续"
          />
          <q-btn
            flat
            @click="$refs.stepper.previous()"
            color="primary"
            label="上一步"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step name="conclusion" :title="data.conclusion.title" icon="hub">
        <p v-for="content in data.conclusion.paras" :key="content">
          {{ content }}
        </p>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<style scoped lang="scss">
:deep(.q-avatar) {
  box-shadow: 0 1px 5px #0003, 0 2px 2px #00000024, 0 3px 1px -2px #0000001f;
}

:deep(video) {
  width: 80%;
  margin: 0 auto;
  display: block;
}

:deep(p) {
  margin: 1em 0;
}

main {
  width: 100vmin;
  padding: 1em;
  margin: 0 auto;

  .q-stepper {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .q-card {
    margin: 1em 0;
  }
}
</style>
