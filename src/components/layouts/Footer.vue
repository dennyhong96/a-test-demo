<template>
  <footer>
    <Section>
      <Container>
        <p>
          <span>{{ year }} {{ company?.CompanyName }}</span
          ><span>|</span>
          <span>All rights reserved</span>
        </p>
      </Container>
    </Section>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import Container from "@/components/common/Container.vue";
import Section from "@/components/common/Section.vue";
import useCompany from "@/composables/company/useCompany";

export default defineComponent({
  name: "Footer",

  components: {
    Container,
    Section,
  },

  setup() {
    const { company } = useCompany();
    const year = computed(() => new Date().getFullYear());
    return { company, year };
  },
});
</script>

<style scoped>
footer {
  background: var(--color-gray-900);
  color: var(--color-white);
  text-transform: uppercase;
}

footer p {
  text-align: center;
}

footer p span:nth-child(2) {
  margin: 0 8px;
}

@media (max-width: 600px) {
  footer p {
    display: flex;
    flex-direction: column;
  }

  footer p span:nth-child(2) {
    margin: 0;
    display: none;
  }
}
</style>
