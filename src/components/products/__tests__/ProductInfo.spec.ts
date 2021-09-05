import { render, screen } from "@/__tests__/testUtils";
import { AVAILABLE_PRODUCTS, UNAVAILABLE_PRODUCTS } from "@/__tests__/fixtures";
import ProductInfo from "@/components/products/ProductInfo.vue";

describe("ProductInfo component", () => {
  test("Should display ItemID, ItemName, Description, Dimensions, BasePrice, and available quantities.", async () => {
    const product = { ...AVAILABLE_PRODUCTS[0] };
    if (!product.Description) product.Description = "Mock product description.";

    render(ProductInfo, {
      renderOptions: {
        props: {
          product,
        },
      },
    });

    const itemNameHeading = screen.getByRole("heading", { name: product.ItemName });
    expect(itemNameHeading).toBeInTheDocument();

    const basePriceHeading = screen.getByRole("heading", { name: product.BasePrice.toString() });
    expect(basePriceHeading).toBeInTheDocument();

    const itemIdText = screen.getByText(product.ItemID, { exact: false });
    expect(itemIdText).toBeInTheDocument();

    const itemDescriptionText = screen.getByText(product.Description, { exact: false });
    expect(itemDescriptionText).toBeInTheDocument();

    const itemDimensionsText = screen.getByText(product.Dimensions, { exact: false });
    expect(itemDimensionsText).toBeInTheDocument();

    const itemAvailableQuantityText = screen.getByTestId("product-available-quantity");
    expect(itemAvailableQuantityText).toBeInTheDocument();
    expect(itemAvailableQuantityText).toHaveTextContent(product.OnHandQuantity.toString());
  });

  test("Should display out of stock notice for unavailable products.", async () => {
    const product = UNAVAILABLE_PRODUCTS[0];
    render(ProductInfo, {
      renderOptions: {
        props: {
          product,
        },
      },
    });

    const itemAvailableQuantityText = screen.queryByTestId("product-available-quantity");
    expect(itemAvailableQuantityText).not.toBeInTheDocument();

    const outOfStockNotice = screen.getByText(
      "This product is currently out of stock, please check again later.",
      { exact: false },
    );
    expect(outOfStockNotice).toBeInTheDocument();
  });
});
