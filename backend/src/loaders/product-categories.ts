export default async function updateCategoryRelations() {
  // Dynamically import the admin category routes
  const adminCategoriesImports = (await import(
    '@medusajs/medusa/dist/api/routes/admin/product-categories/index'
  )) as { defaultAdminCategoryRelations?: string[] };

  // Dynamically import the store category routes
  const storeCategoriesImports = (await import(
    '@medusajs/medusa/dist/api/routes/store/product-categories/index'
  )) as { 
    defaultStoreCategoryRelations?: string[],
    allowedStoreCategoryRelations?: string[]
  };

  // Update admin category relations to include 'images'
  if (adminCategoriesImports.defaultAdminCategoryRelations) {
    adminCategoriesImports.defaultAdminCategoryRelations = [
      ...adminCategoriesImports.defaultAdminCategoryRelations,
      'images',
    ];
  }

  // Update store category relations to include 'images'
  if (storeCategoriesImports.defaultStoreCategoryRelations) {
    storeCategoriesImports.defaultStoreCategoryRelations = [
      ...storeCategoriesImports.defaultStoreCategoryRelations,
      'images',
    ];
  }

  if (storeCategoriesImports.allowedStoreCategoryRelations) {
    storeCategoriesImports.allowedStoreCategoryRelations = [
      ...storeCategoriesImports.allowedStoreCategoryRelations,
      'images',
    ];
  }
}
