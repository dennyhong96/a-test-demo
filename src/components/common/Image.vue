<template>
  <picture :style="{ '--aspect-ratio': aspectRatio ?? 1 }">
    <source :srcset="optimizedSrc.srcset" />
    <img :src="optimizedSrc.baseSrc" :alt="alt" width="400" />
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
    aspectRatio: {
      type: Number as PropType<number>,
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
picture {
  position: relative;
  display: block;
  width: 100%;
  padding-bottom: calc(var(--aspect-ratio) * 100 * 1%);
}

img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}
</style>
