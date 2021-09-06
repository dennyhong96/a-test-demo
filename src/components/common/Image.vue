<template>
  <picture ref="pictureRef" :style="{ '--aspect-ratio': aspectRatio ?? 1 }">
    <source :srcset="lazy ? undefined : srcset" />
    <img :src="lazy ? undefined : baseSrc" :alt="alt" />
  </picture>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref } from "vue";

import { optimizeProductImageSrc } from "@/utils";

export default defineComponent({
  name: "Image",

  props: {
    lazy: {
      type: Boolean as PropType<boolean>,
    },
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

  setup(props) {
    const pictureRef = ref<HTMLPictureElement | null>(null);

    const { baseSrc, srcset } = optimizeProductImageSrc(props.src);

    let observer: IntersectionObserver;

    onMounted(() => {
      if (!props.lazy) return;
      const picture = pictureRef.value;
      if (!picture) return;
      const source = picture.querySelector("source") as HTMLSourceElement;
      const image = picture.querySelector("img") as HTMLImageElement;

      observer = new IntersectionObserver(([entry], observer) => {
        if (entry.isIntersecting) {
          source.srcset = srcset;
          image.src = baseSrc;
          observer.unobserve(entry.target);
        }
      });

      observer.observe(picture);
    });

    onBeforeUnmount(() => {
      if (!props.lazy || !observer) return;
      observer.disconnect();
    });

    return {
      pictureRef,
      baseSrc,
      srcset,
    };
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
