import { render, screen } from "@/__tests__/testUtils";
import { COMPANY } from "@/__tests__/fixtures";
import Footer from "@/components/layouts/Footer.vue";

describe("Footer component", () => {
  test("Should display the correct year and company name in copyright text", async () => {
    render(Footer, {
      storeOptionsOverrite: {
        state: {
          isLoading: false,
          Company: COMPANY,
          Products: [],
          Cart: {},
        },
      },
    });

    const copyright = screen.getByText(`${new Date().getFullYear()} ${COMPANY.CompanyName}`, {
      exact: false,
    });

    expect(copyright).toBeInTheDocument();
  });
});
