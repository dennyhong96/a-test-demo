import { nextTick } from "vue";
import userEvent from "@testing-library/user-event";

import { render, screen } from "@/__tests__/testUtils";
import ProductsFilterSort from "@/components/products/ProductsFilterSort.vue";

// Mock debounce
jest.mock("@/utils/index", () => {
  const originalModule = jest.requireActual("@/utils/index");
  return {
    __esModule: true,
    ...originalModule,
    debounce: function debounce(func: (this: any, ...args: any[]) => void, wait = 100) {
      return function(this: any, ...args: any[]) {
        func.apply(this, args);
      };
    },
  };
});

describe("ProductsFilterSort component", () => {
  test("Should toggle between sorting options", async () => {
    render(ProductsFilterSort);

    // Sort by name option should be active by default
    const sortByNameButton = screen.getByRole("button", { name: /A - Z/i });
    expect(sortByNameButton).toBeInTheDocument();
    expect(sortByNameButton).toHaveClass("active"); // Active sorting option has an active class

    const sortByLowerPriceFirstButton = screen.getByText((content, node) => {
      if (!node) return false;
      if (node.textContent?.trim() === "Price - $") return true;
      return false;
    });
    expect(sortByLowerPriceFirstButton).toBeInTheDocument();
    expect(sortByLowerPriceFirstButton).not.toHaveClass("active");

    const sortByHighterPriceFirstButton = screen.getByText((content, node) => {
      if (!node) return false;
      if (node.textContent?.trim() === "Price - $$$") return true;
      return false;
    });
    expect(sortByHighterPriceFirstButton).toBeInTheDocument();
    expect(sortByHighterPriceFirstButton).not.toHaveClass("active");

    // Click on sortByLowerPriceFirstButton option
    userEvent.click(sortByLowerPriceFirstButton);
    await nextTick();
    expect(sortByNameButton).not.toHaveClass("active");
    expect(sortByLowerPriceFirstButton).toHaveClass("active");
    expect(sortByHighterPriceFirstButton).not.toHaveClass("active");

    // Click on sortByHighterPriceFirstButton option
    userEvent.click(sortByHighterPriceFirstButton);
    await nextTick();
    expect(sortByNameButton).not.toHaveClass("active");
    expect(sortByLowerPriceFirstButton).not.toHaveClass("active");
    expect(sortByHighterPriceFirstButton).toHaveClass("active");
  });

  test("Should allow filter input and clear input when click on clear button", async () => {
    render(ProductsFilterSort);

    // Allow user input
    const filterInput = screen.getByRole("textbox");
    expect(filterInput).toBeInTheDocument();
    userEvent.clear(filterInput);
    const mockInputValue = "test";
    userEvent.type(filterInput, mockInputValue);
    expect(screen.getByDisplayValue(mockInputValue)).toBeInTheDocument();

    // Clear input
    const clearInputButton = screen.getByRole("button", { name: /Clear filter input/i });
    expect(clearInputButton).toBeInTheDocument();
    userEvent.click(clearInputButton);
    await nextTick();
    expect(filterInput).not.toHaveValue(mockInputValue);
  });
});
