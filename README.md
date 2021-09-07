# TestApplication

Simple VueJS Test Application Project

[Preview here](https://a-test-demo.vercel.app)

## Run the app locally

```bash
git clone https://github.com/dennyhong96/a-test-demo
cd a-test-demo && npm install && npm run serve
```

Then go to `http://localhost:8080/` to view the app.

## Features implemented

- A products listing page that displays product cards with lazy loading thumbnails.
- A product details page for each product. (Contains ItemID, ItemName, Description, Dimensions, BasePrice, and Image)
- A header that displays company name and logo.
- Clicking on each product card navigates to individual product details page.
- Clicking on company logo in the header navigates back to product listing page.
- A floating "Help" button (bottom right of the screen) that toggles the display of SalesRep contact information in a popup.

## Extra features implemented

- The ability to sort and filter products on the products listing page.
- A shopping cart that displays line items and total price. (toggled by the icon button on top right cornor of the screen)
- The ability to select quantity, add to cart, and delete line items from cart.

## Testing

Testing is done with Jest, @vue/test-utils, and @vue/testing-library. The priciple I choose to follow is to avoid testing implementation details, instead, write the tests in a way that closely resembles the way my application is used.

### Component Unit Tests

Components unit tests are ran with a store pre-filled with mock data, no network request is made. Components are grouped by functionalities in `@/src/components`, e.g. `@/src/components/products/`. Component unit tests are placed in a `__tests__` folder nested inside components group, e.g. `@/src/components/products/__tests__/`.

### Integration Tests

Integration tests are ran with an empty store, uses `msw` to mock API (the github raw JSON url) endpoint. Integration tests, along with test utilities, are placed inside `@/src/__tests__/` folder.

### Run the tests

```bash
npm run test
```
