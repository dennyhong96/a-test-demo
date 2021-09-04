<template>
  <div class="wrapper" v-click-outside="handleClickOutside">
    <div v-if="isWidgetOpen" class="sales-info">
      <p>Hi, this is {{ salesRep.FirstName }} {{ salesRep.LastName }} 👋</p>
      <p>
        If you have sany inquiries, please don't hesitate to call me at
        <a
          target="_blank"
          rel="noreferrer noopener"
          :href="`tel:${salesRep.CellPhone}`"
          >{{ salesRep.CellPhone }}</a
        >
        , or emil me at {{ salesRep.EmailAddress }}
        <a
          target="_blank"
          rel="noreferrer noopener"
          :href="`mailto:${salesRep.EmailAddress}`"
          >{{ salesRep.EmailAddress }}</a
        >
      </p>
    </div>

    <button @click="handleToggleWidget">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import useStore from "@/composables/useStore";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "SalesRefWidget",

  setup() {
    const store = useStore();

    const isWidgetOpen = ref(false);

    const salesRep = computed(() => store.state.SalesRep);

    const handleToggleWidget = () => {
      isWidgetOpen.value = !isWidgetOpen.value;
    };

    const handleClickOutside = () => {
      isWidgetOpen.value = false;
    };

    return {
      salesRep,
      isWidgetOpen,

      handleToggleWidget,
      handleClickOutside,
    };
  },
});
</script>

<style scoped>
.wrapper {
  position: fixed;
  bottom: 32px;
  right: 32px;
}

.wrapper button {
  display: block;
  padding: 0;
  width: 56px;
  height: 56px;
  background: var(--color-white);
  border-radius: 99999px;
  -webkit-box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
}

.sales-info {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateY(calc(-100% - 8px));
  background: var(--color-white);
  width: min(calc(100vw - 64px), 250px);
  border: 1px solid var(--color-gray-900);
  padding: 16px;
}

p:not(:last-of-type) {
  margin-bottom: 8px;
}
</style>
