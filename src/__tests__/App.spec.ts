import { render, fireEvent, screen } from "./testUtils";
import { server } from "./mocks/server";
import App from "@/App.vue";

describe("App component", () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test("Should render app and navigate bewteen pages.", async () => {
    render(App);
    const heading = await screen.findByRole("heading", { name: /a test demo/i });
    expect(heading).toBeInTheDocument();

    // App renders
    const squareStorageCrateCard = screen.getByRole("link", { name: /Square Storage Crate/i });
    expect(squareStorageCrateCard).toBeInTheDocument();

    // Click on a product card to navigate to the product details page for that product
    fireEvent.click(squareStorageCrateCard);
    const squareStorageCrateHeading = await screen.findByRole("heading", {
      name: /Square Storage Crate/i,
    });

    expect(squareStorageCrateHeading).toBeInTheDocument();
    const squareStorageCratePricing = await screen.findByRole("heading", {
      name: /\$243.00/i,
    });
    expect(squareStorageCratePricing).toBeInTheDocument();
    const squareStorageCrateProductId = await screen.findByText("642698838", { exact: false });
    expect(squareStorageCrateProductId).toBeInTheDocument();

    // Click on the logo in header to go back to products listing page
    const logo = screen.getByAltText("Back to home page");
    fireEvent.click(logo);

    const productCards = await screen.findAllByRole("listitem");
    expect(productCards).toHaveLength(10);
  });
});
