import { render, screen } from "@/__tests__/testUtils";
import { COMPANY } from "@/__tests__/fixtures";
import Header from "@/components/layouts/Header.vue";

describe("Header component", () => {
  test("Should display company logo and name", async () => {
    render(Header, {
      storeOptionsOverrite: {
        modules: {
          company: { state: { data: COMPANY, isLoading: false } },
        },
      },
    });

    const companyLogo = screen.getByAltText("Back to home page");
    expect(companyLogo).toBeInTheDocument();
    expect((companyLogo as HTMLImageElement).src).toBe(COMPANY.logoSrc);

    const companyName = screen.getByRole("heading", { name: COMPANY.CompanyName });
    expect(companyName).toBeInTheDocument();
  });
});
