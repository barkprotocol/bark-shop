/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */

import { AdminPostProductCategoriesCategoryReq as MedusaAdminPostProductCategoriesCategoryReq } from "@medusajs/medusa";
import { IsOptional, IsArray, IsString } from "class-validator";

/**
 * Custom request validation class for handling product categories.
 * Extends the Medusa default request class to add additional validation rules.
 */
export class AdminPostProductsProductCategoriesCategoryReq extends MedusaAdminPostProductCategoriesCategoryReq {
    /**
     * Array of image URLs associated with the product category.
     * This field is optional.
     */
    @IsArray()
    @IsOptional()
    images?: string[];

    /**
     * Thumbnail URL for the product category.
     * This field is optional.
     */
    @IsString()
    @IsOptional()
    thumbnail?: string;
}
