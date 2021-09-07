<template>
  <div class="wrapper">
    <div class="filter">
      <input type="text" :value="filter" @input="handleInput" placeholder="Search..." />
      <button @click="handleClearFilter" aria-label="Clear filter input">
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <div class="sort">
      <button :class="{ active: sortBy === 'DEFAULT' }" @click="handleSort('DEFAULT')">
        A - Z
      </button>
      <button :class="{ active: sortBy === 'PRICE_LOW' }" @click="handleSort('PRICE_LOW')">
        <span>Price -</span> $
      </button>
      <button :class="{ active: sortBy === 'PRICE_HIGH' }" @click="handleSort('PRICE_HIGH')">
        <span>Price -</span> $$$
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import useSortProduct from "@/composables/products/useSortProduct";
import useFilterProduct from "@/composables/products/useFilterProduct";

export default defineComponent({
  name: "ProductsFilterSort",

  setup() {
    const { filter, handleFilterChange, handleClearFilter } = useFilterProduct();

    const handleInput = (evt: InputEvent) => {
      const newFilter = (evt.target as HTMLInputElement).value;
      handleFilterChange(newFilter);
    };

    return {
      filter,
      handleInput,
      handleClearFilter,
      ...useSortProduct(),
    };
  },
});
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.filter {
  display: flex;
  align-content: center;
  width: 240px;
}

.filter input {
  font: inherit;
  color: inherit;
  height: 36px;
  border: 2px solid var(--color-gray-900);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right-width: 0;
  padding: 0 8px;
  flex: 0 0 calc(100% - 36px);
  width: calc(100% - 36px);
}

.filter input:focus {
  outline: none;
  background: var(--color-gray-100);
}

.filter button {
  flex: 0 0 36px;
  width: 36px;
  height: 36px;
  font: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-gray-900);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.filter button svg {
  width: 24px;
  height: 24px;
}

.sort {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: var(--font-weight-medium);
  width: 280px;
}

.sort button {
  flex: 1;
  height: 36px;
  padding: 0 8px;
  border: 2px solid var(--color-gray-900);
  text-align: center;
}

.sort button:first-of-type {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right-width: 0;
}

.sort button:last-of-type {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left-width: 0;
}

.filter button:hover,
.filter button:focus,
.filter button:active,
.sort button:hover,
.sort button:focus,
.sort button:active {
  background: var(--color-gray-100);
}

.sort button.active {
  background: var(--color-gray-900);
  color: var(--color-white);
}

@media (max-width: 950px) {
  .sort {
    width: 240px;
  }

  .sort button span {
    display: none;
  }
}

@media (max-width: 600px) {
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .wrapper .filter,
  .wrapper .sort {
    width: 100%;
  }

  .sort button span {
    display: initial;
  }
}

@media (max-width: 340px) {
  .sort button span {
    display: none;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .filter input,
  .filter button,
  .sort button {
    transition: var(--transition-standard);
  }
}
</style>
