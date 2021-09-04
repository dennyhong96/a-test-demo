<template>
  <picture>
    <source :srcset="optimizedSrc.srcset" />
    <img :src="optimizedSrc.baseSrc" :alt="alt" />
  </picture>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { optimizeProductImageSrc } from "@/utils";

export default defineComponent({
  name: "Image",

  props: {
    src: {
      required: true,
      type: String as PropType<string>,
    },
    alt: {
      required: true,
      type: String as PropType<string>,
    },
  },

  computed: {
    optimizedSrc() {
      return optimizeProductImageSrc(this.src);
    },
  },
});
</script>

<style scoped>
img {
  width: 100%;
}
</style>
