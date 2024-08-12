import { registerOverriddenValidators } from '@medusajs/medusa';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { AdminPostProductCategoriesCategoryReq as MedusaAdminPostProductCategoriesCategoryReq } from '@medusajs/medusa/dist/api/routes/admin/product-categories';

// Extend Medusa's request class to include additional validation rules
class AdminPostProductsProductCategoriesCategoryReq extends MedusaAdminPostProductCategoriesCategoryReq {
  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  thumbnail?: string;
}

// Register the overridden validators
registerOverriddenValidators(AdminPostProductsProductCategoriesCategoryReq);
