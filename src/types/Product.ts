export interface Product {
  ItemID: string;
  ProductID: number;
  ManufacturerID: number;

  ItemName: string;
  Description: string;
  Dimensions: string;
  BasePrice: number;
  PhotoName: string;

  OnHandQuantity: number;
  OrderMinimumQuantity: number;
  OrderMultipleQuantity: number;

  IntroDate: string;
  BackOrderDate: string;

  Discontinued: boolean;
  IsDeleted: boolean;
}
