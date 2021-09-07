import { render, screen } from "@/__tests__/testUtils";
import { COMPANY } from "@/__tests__/fixtures";
import Footer from "@/components/layouts/Footer.vue";

describe("Footer component", () => {
  test("Should display the correct year and company name in copyright text", async () => {
    render(Footer, {
      storeOptionsOverrite: {
        modules: {
          company: { state: { data: COMPANY, isLoading: false } },
        },
      },
    });

    const copyright = screen.getByText(`${new Date().getFullYear()} ${COMPANY.CompanyName}`, {
      exact: false,
    });

    expect(copyright).toBeInTheDocument();
  });
});
