import data from "@/__tests__/mocks/_data.json";
import { generateLogoSrc } from "@/utils";
import { Cart } from "@/types/Cart";
import { Company } from "@/types/Company";
import { Product } from "@/types/Product";

export const AVAILABLE_PRODUCTS: Product[] = data.items.filter(
  (item) => !!item.BasePrice && item.OnHandQuantity > 5,
);

export const UNAVAILABLE_PRODUCTS: Product[] = data.items.filter(
  (item) => item.OnHandQuantity <= 0,
);

export const COMPANY: Company = {
  CompanyName: data.CompanyName,
  logoSrc: generateLogoSrc(data.ManufacturerID),
  ManufacturerID: data.ManufacturerID,
  Message: data.Message,
};

export const LINE_ITEMS = AVAILABLE_PRODUCTS.map((product) => {
  const quantityToPurchase = Math.floor(product.OnHandQuantity / 3);
  return {
    ...product,
    quantityToPurchase,
    lineItemTotal: quantityToPurchase * product.BasePrice,
  };
});

export const CART_FILLED: Cart = LINE_ITEMS.reduce((acc, cur) => {
  return { ...acc, [cur.ItemID]: cur.quantityToPurchase };
}, {});

export const SALES_REP = data.SalesRep;
