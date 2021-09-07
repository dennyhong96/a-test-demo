import userEvent from "@testing-library/user-event";

import { render, screen, waitForElementToBeRemoved } from "@/__tests__/testUtils";
import { SALES_REP } from "@/__tests__/fixtures";
import SalesRepPopup from "@/components/widgets/SalesRepPopup.vue";

describe("SalesRepPopup component", () => {
  test("Should open, close, and display sales rep contact information.", async () => {
    render(SalesRepPopup, {
      storeOptionsOverrite: {
        modules: { salesRep: { state: { isLoading: false, data: SALES_REP } } },
      },
    });

    // Open widget
    const toggleButton = screen.getByRole("button", { name: /Open support widget/i });
    userEvent.click(toggleButton);
    const salesRepInfo = await screen.findByTestId("sales-rep-info");
    expect(salesRepInfo).toBeInTheDocument();

    // Contains correct sales rep contact information
    expect(salesRepInfo).toHaveTextContent(SALES_REP.FirstName);
    expect(salesRepInfo).toHaveTextContent(SALES_REP.LastName);
    expect(salesRepInfo).toHaveTextContent(SALES_REP.EmailAddress);
    expect(salesRepInfo).toHaveTextContent(SALES_REP.CellPhone);

    // Close widget
    userEvent.click(toggleButton);
    await waitForElementToBeRemoved(salesRepInfo);
  });
});
