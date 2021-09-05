<template>
  <div class="wrapper" v-click-outside="handleClickOutside">
    <!-- Sales Rep Info  -->

    <transition name="scale-fade">
      <div v-if="isWidgetOpen" class="sales-info">
        <div class="header">
          <p>
            Hi, this is {{ salesRep.FirstName }} {{ salesRep.LastName }}
            <span aria-label="Waving hand">👋</span>
          </p>
        </div>
        <div class="body">
          <p>
            If you have any inquiries, please don't hesitate to call me at
            <a
              target="_blank"
              rel="noreferrer noopener"
              :href="`tel:${salesRep.CellPhone}`"
              >{{ salesRep.CellPhone }}</a
            >
            , or emil me at
            <a
              target="_blank"
              rel="noreferrer noopener"
              :href="`mailto:${salesRep.EmailAddress}`"
              >{{ salesRep.EmailAddress }}</a
            >
          </p>
        </div>
      </div>
    </transition>

    <!-- Widget Toggler Button -->
    <button
      @click="handleToggleWidget"
      :aria-label="`${isWidgetOpen ? 'Close' : 'Open'} support widget`"
    >
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
  -webkit-box-shadow: var(--shadow-standard);
  box-shadow: var(--shadow-standard);
}

.wrapper button svg {
  width: 100%;
  height: 100%;
}

.sales-info {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--color-white);
  width: min(calc(100vw - 64px), 250px);
  border-radius: 15px;
  overflow: hidden;
  transform: translateY(calc(-100% - 8px));
  transform-origin: right bottom;
  will-change: transform;
  -webkit-box-shadow: var(--shadow-standard);
  box-shadow: var(--shadow-standard);
}

.sales-info.scale-fade-enter-active {
  opacity: 0;
  transform: scale(0.9) translateY(calc(-100% - 8px));
}

.sales-info.scale-fade-enter-to {
  transform: scale(1) translateY(calc(-100% - 8px));
  opacity: 1;
}

.sales-info.scale-fade-leave-to {
  transform: scale(0.9) translateY(calc(-100% - 8px));
  opacity: 0;
}

.sales-info .header {
  padding: 16px;
  background: var(--color-gray-900);
  color: var(--color-white);
}

.sales-info .body {
  padding: 16px;
}

.sales-info a {
  text-decoration: underline;
}

.sales-info a:hover {
  background: var(--color-gray-900);
  color: var(--color-white);
}

p:not(:last-of-type) {
  margin-bottom: 8px;
}

@media (max-width: 600px) {
  .wrapper button {
    width: 48px;
    height: 48px;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .wrapper button {
    transition: 0.3s ease-out;
    will-change: transform;
  }

  .wrapper button:hover,
  .wrapper button:focus,
  .wrapper button:active {
    transform: scale(1.05) translateY(-1px);
  }

  .sales-info.scale-fade-enter-active {
    transition: 0.3s;
  }

  .sales-info.scale-fade-leave-active {
    transition: 0.6s;
  }

  .sales-info a {
    transition: 0.2s ease-out;
  }
}
</style>
