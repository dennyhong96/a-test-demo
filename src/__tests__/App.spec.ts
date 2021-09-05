import { render, fireEvent, screen } from "./testUtils";

import App from "@/App.vue";

test("full app rendering/navigating", async () => {
  render(App);
  const heading = await screen.findByRole("heading", { name: /a test demo/i });
  expect(heading).toBeInTheDocument();
});
