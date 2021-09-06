import { nextTick } from "vue";
import userEvent from "@testing-library/user-event";

import { render, screen, waitForElementToBeRemoved } from "@/__tests__/testUtils";
import { server } from "@/__tests__/mocks/server";
import data from "@/__tests__/mocks/_data.json";
import { AVAILABLE_PRODUCTS, COMPANY } from "@/__tests__/fixtures";
import { formatCurrency, pluralize } from "@/utils";
import App from "@/App.vue";

describe("App component", () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    // Mock IntersectionObserver
    window.IntersectionObserver = jest.fn(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })) as any;
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test("Should load the app and navigate bewteen pages.", async () => {
    render(App);

    // Wait for app to load
    const companyName = await screen.findByRole("heading", { name: COMPANY.CompanyName });
    expect(companyName).toBeInTheDocument();

    // App renders
    const productCards = await screen.findAllByRole("listitem");
    expect(productCards).toHaveLength(data.items.length);

    // Click on a product card to navigate to the product details page
    userEvent.click(productCards[0]);
    const productNameOnDetailsPage = await screen.findByRole("heading", {
      name: data.items[0].ItemName,
    });
    expect(productNameOnDetailsPage).toBeInTheDocument();

    // Click on the logo in header to go back to products listing page
    const logo = screen.getByAltText("Back to home page");
    userEvent.click(logo);

    expect(await screen.findAllByRole("listitem")).toHaveLength(data.items.length);
  });

  test("Should pick a product, fill out form, add products to cart, and delete line items from cart", async () => {
    // Mock window confirm popup
    window.confirm = jest.fn().mockImplementation(() => true);

    render(App);

    // Wait for app to load
    const companyName = await screen.findByRole("heading", { name: COMPANY.CompanyName });
    expect(companyName).toBeInTheDocument();

    const productToPurchase = { ...AVAILABLE_PRODUCTS[0] };
    const quantityToPurchase = Math.ceil(productToPurchase.OnHandQuantity / 2);
    const productCard = await screen.findByTestId(`product-card-${productToPurchase.ItemID}`);
    expect(productCard).toBeInTheDocument();

    // Click on a product card to navigate to the product details page
    userEvent.click(productCard);

    // Input quantity to add to cart
    const quantityInput = await screen.findByTestId("product-form-quantity-input");
    expect(quantityInput).toBeInTheDocument();
    expect(quantityInput).toBeEnabled();
    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, quantityToPurchase.toString());

    // Click add to cart button
    const addToCartButton = screen.getByRole("button", { name: /Add to cart/i });
    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton).toBeEnabled();
    userEvent.click(addToCartButton);

    // Should update quantity available
    await nextTick();
    const itemAvailableQuantityText = screen.getByTestId("product-available-quantity");
    expect(itemAvailableQuantityText).toBeInTheDocument();
    expect(itemAvailableQuantityText).toHaveTextContent(
      (productToPurchase.OnHandQuantity - quantityToPurchase).toString(),
    );

    // Wait for added to cart notification
    await screen.findByText(
      `${quantityToPurchase} ${pluralize("unit", quantityToPurchase)} added to your cart.`,
      { exact: false },
    );

    // Open cart
    const toggleButton = screen.getByRole("button", { name: /Open shopping cart/i });
    userEvent.click(toggleButton);

    // Check if line item information is correct
    const lineItem = await screen.findByTestId(`cart-line-item-${productToPurchase.ItemID}`);
    expect(lineItem).toHaveTextContent(
      `${quantityToPurchase} x ${productToPurchase.ItemName} - ${formatCurrency(
        quantityToPurchase * productToPurchase.BasePrice,
      )}`,
    );

    // Check if total is correct
    const total = screen.getByTestId("cart-total");
    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent(
      formatCurrency(quantityToPurchase * productToPurchase.BasePrice),
    );

    // Remove line item
    const removeLineItemButton = lineItem.querySelector("button");
    expect(removeLineItemButton).toBeInTheDocument();
    userEvent.click(removeLineItemButton as HTMLButtonElement);

    // Check if total updates
    await waitForElementToBeRemoved(lineItem);
    const total2 = screen.getByTestId("cart-total");
    expect(total2).toHaveTextContent(formatCurrency(0));

    // Check if product availability updates
    expect(itemAvailableQuantityText).toHaveTextContent(
      productToPurchase.OnHandQuantity.toString(),
    );
  });
});
