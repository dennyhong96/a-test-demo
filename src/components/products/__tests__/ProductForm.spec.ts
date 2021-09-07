import { nextTick, ref } from "vue";
import userEvent from "@testing-library/user-event";

import { render, screen } from "@/__tests__/testUtils";
import { AVAILABLE_PRODUCTS, UNAVAILABLE_PRODUCTS } from "@/__tests__/fixtures";
import { pluralize } from "@/utils";
import ProductForm from "@/components/products/ProductForm.vue";

const productToPurchase = AVAILABLE_PRODUCTS[0];

describe("ProductForm component", () => {
  test("Should fill and submit correctly with an available product", async () => {
    const product = ref({ ...productToPurchase });

    render(ProductForm, {
      storeOptionsOverrite: {
        modules: {
          products: { state: { isLoading: false, data: { productsList: AVAILABLE_PRODUCTS } } },
        },
      },
      renderOptions: {
        props: { product },
      },
    });

    const decreaseQuantityButton = screen.getByRole("button", { name: "Decrease quantity" });
    expect(decreaseQuantityButton).toBeInTheDocument();
    expect(decreaseQuantityButton).toBeDisabled();

    const quantityInput = screen.getByTestId("product-form-quantity-input");
    expect(quantityInput).toBeInTheDocument();
    expect(quantityInput).toBeEnabled();

    const increaseQuantityButton = screen.getByRole("button", { name: "Increase quantity" });
    expect(increaseQuantityButton).toBeInTheDocument();
    expect(increaseQuantityButton).toBeEnabled();

    const addToCartButton = screen.getByRole("button", { name: /Add to cart/i });
    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton).toBeEnabled();

    let quantityAddedToCart = 0;

    // Enter all units of product on hand as quantity
    userEvent.clear(quantityInput);
    userEvent.type(quantityInput, product.value.OnHandQuantity.toString());

    // Increase quantity button should be disabled now
    await nextTick();
    expect(decreaseQuantityButton).toBeEnabled();
    expect(increaseQuantityButton).toBeDisabled();
    expect(addToCartButton).toBeEnabled();

    // Decrease one quantity
    userEvent.click(decreaseQuantityButton);
    await nextTick();
    expect(decreaseQuantityButton).toBeEnabled();
    expect(increaseQuantityButton).toBeEnabled();
    expect(addToCartButton).toBeEnabled();

    // Submit form should trigger added to cart notification with correct quantity
    userEvent.click(addToCartButton);
    quantityAddedToCart = product.value.OnHandQuantity - 1;
    product.value = {
      ...product.value,
      OnHandQuantity: product.value.OnHandQuantity - quantityAddedToCart,
    };
    await screen.findByText(
      `${quantityAddedToCart} ${pluralize("unit", quantityAddedToCart)} added to your cart.`,
      { exact: false },
    );

    // Quantity input should have reset to 1, add one more to cart
    userEvent.click(addToCartButton);
    product.value = { ...product.value, OnHandQuantity: product.value.OnHandQuantity - 1 };
    await screen.findByText(`1 unit added to your cart.`, { exact: false });

    // Out of stock now, should disable input and buttons
    expect(decreaseQuantityButton).toBeDisabled();
    expect(quantityInput).toBeDisabled();
    expect(increaseQuantityButton).toBeDisabled();
    expect(addToCartButton).toBeDisabled();
  });

  test("Should not allow add to cart with an unavailable product", async () => {
    const product = UNAVAILABLE_PRODUCTS[0];

    render(ProductForm, {
      storeOptionsOverrite: {
        modules: {
          products: { state: { isLoading: false } },
        },
      },
      renderOptions: {
        props: { product },
      },
    });

    const decreaseQuantityButton = screen.getByRole("button", { name: "Decrease quantity" });
    expect(decreaseQuantityButton).toBeInTheDocument();
    expect(decreaseQuantityButton).toBeDisabled();

    const quantityInput = screen.getByTestId("product-form-quantity-input");
    expect(quantityInput).toBeInTheDocument();
    expect(quantityInput).toBeDisabled();

    const increaseQuantityButton = screen.getByRole("button", { name: "Increase quantity" });
    expect(increaseQuantityButton).toBeInTheDocument();
    expect(increaseQuantityButton).toBeDisabled();

    const addToCartButton = screen.getByRole("button", { name: /Add to cart/i });
    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton).toBeDisabled();
  });
});
