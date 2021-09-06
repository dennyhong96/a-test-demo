import userEvent from "@testing-library/user-event";

import { render, screen, waitForElementToBeRemoved } from "@/__tests__/testUtils";
import { CART_FILLED, LINE_ITEMS, AVAILABLE_PRODUCTS } from "@/__tests__/fixtures";
import { formatCurrency } from "@/utils";
import CartDropdown from "@/components/cart/CartDropdown.vue";

describe("Cart component", () => {
  test("Should open and close", async () => {
    render(CartDropdown, {
      storeOptionsOverrite: {
        state: { isLoading: false, Cart: {}, Products: AVAILABLE_PRODUCTS },
      },
    });

    // Open cart
    const toggleButton = screen.getByRole("button", { name: /Open shopping cart/i });
    userEvent.click(toggleButton);
    const cart = await screen.findByText(/Happy shopping!/i, { exact: false });
    expect(cart).toBeInTheDocument();

    // Close cart
    userEvent.click(toggleButton);
    await waitForElementToBeRemoved(cart);
  });

  test("Should be empty by default", async () => {
    render(CartDropdown, {
      storeOptionsOverrite: {
        state: { isLoading: false, Cart: {}, Products: AVAILABLE_PRODUCTS },
      },
    });

    // Open cart
    const toggleButton = screen.getByRole("button", { name: /Open shopping cart/i });
    userEvent.click(toggleButton);
    const cart = await screen.findByText(/Happy shopping!/i, { exact: false });
    expect(cart).toBeInTheDocument();

    // Cart should be empty
    const total = screen.getByTestId("cart-total");
    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent("$0.00");
  });

  test("Should render line items and total price", async () => {
    render(CartDropdown, {
      storeOptionsOverrite: {
        state: { isLoading: false, Cart: CART_FILLED, Products: AVAILABLE_PRODUCTS },
      },
    });

    // Open cart
    const toggleButton = screen.getByRole("button", { name: /Open shopping cart/i });
    userEvent.click(toggleButton);
    const cart = await screen.findByText(/total/i, { exact: false });
    expect(cart).toBeInTheDocument();

    // Cart should display all line items in 'quantity x item name - line total' format
    for (const cartLineItem of LINE_ITEMS) {
      const lineItem = screen.getByTestId(`cart-line-item-${cartLineItem.ItemID}`);
      expect(lineItem).toHaveTextContent(
        `${cartLineItem.quantityToPurchase} x ${cartLineItem.ItemName} - ${formatCurrency(
          cartLineItem.lineItemTotal,
        )}`,
      );
    }

    const total = screen.getByTestId("cart-total");
    expect(total).toHaveTextContent(
      formatCurrency(LINE_ITEMS.reduce((acc, cur) => acc + cur.lineItemTotal, 0)),
    );
  });

  test("Should delete line item and update total", async () => {
    // Mock window confirm popup
    window.confirm = jest.fn().mockImplementation(() => true);

    render(CartDropdown, {
      storeOptionsOverrite: {
        state: { isLoading: false, Cart: CART_FILLED, Products: AVAILABLE_PRODUCTS },
      },
    });

    // Open cart
    const toggleButton = screen.getByRole("button", { name: /Open shopping cart/i });
    userEvent.click(toggleButton);
    const cart = await screen.findByText(/total/i, { exact: false });
    expect(cart).toBeInTheDocument();

    // Cart should display all line items in 'quantity x item name - line total' format
    for (const cartLineItem of LINE_ITEMS) {
      const lineItem = screen.getByTestId(`cart-line-item-${cartLineItem.ItemID}`);
      expect(lineItem).toHaveTextContent(
        `${cartLineItem.quantityToPurchase} x ${cartLineItem.ItemName} - ${formatCurrency(
          cartLineItem.lineItemTotal,
        )}`,
      );
    }

    // Remove the first line item from cart
    const firstLineItem = LINE_ITEMS[0];
    const firstLineItemsElement = screen.getByTestId(`cart-line-item-${firstLineItem.ItemID}`);
    const removeLineItemButton = firstLineItemsElement.querySelector("button");
    expect(removeLineItemButton).toBeInTheDocument();
    userEvent.click(removeLineItemButton as HTMLButtonElement);

    // Cart should remove first line item from UI
    await waitForElementToBeRemoved(firstLineItemsElement);

    // Cart should correctly update total
    const total = screen.getByTestId("cart-total");
    expect(total).toHaveTextContent(
      formatCurrency(
        LINE_ITEMS.filter((item) => item.ItemID !== firstLineItem.ItemID).reduce(
          (acc, cur) => acc + cur.lineItemTotal,
          0,
        ),
      ),
    );
  });
});
