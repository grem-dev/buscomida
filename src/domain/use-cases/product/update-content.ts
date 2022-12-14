import productMapper from "../../../mappers/product";
import { ForbiddenError } from "../../errors";
import { Product } from "../../models/types";
import { hasActiveStatus } from "../helpers/exist-draft";
import { getProductOrError } from "./product-or-error";
import { saveProduct } from "./save-product";

export interface UpdateProductContentArgs {
  pId: string;
  description: string;
  displayName: string;
  price: number;
}

export const updateProductContent = async ({
  pId,
  price,
  description,
  displayName,
}: UpdateProductContentArgs) => {
  const product = await getProductOrError(pId);

  // TODO: - Add possibility to update disabled products
  // Should this be just the price and naming and description?
  if (hasActiveStatus(product)) {
    throw new ForbiddenError("Published products cannot be udpated");
  }

  const updatedProduct: Product = {
    ...product,
    displayName,
    description,
    price,
  };

  saveProduct(updatedProduct);
  return productMapper.domainToDTO(updatedProduct);
};
