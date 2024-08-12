export default async function updateProductRelations() {
    // Import admin product routes
    const adminProductImports = (await import(
      '@medusajs/medusa/dist/api/routes/admin/products/index'
    )) as any;
  
    // Import store product routes
    const storeProductImports = (await import(
      '@medusajs/medusa/dist/api/routes/store/products/index'
    )) as any;
  
    // Update admin product relations to include 'categories.images'
    if (adminProductImports.defaultAdminProductRelations) {
      adminProductImports.defaultAdminProductRelations = [
        ...adminProductImports.defaultAdminProductRelations,
        'categories.images',
      ];
    }
  
    // Update store product relations to include 'categories.images'
    if (storeProductImports.defaultStoreProductsRelations) {
      storeProductImports.defaultStoreProductsRelations = [
        ...storeProductImports.defaultStoreProductsRelations,
        'categories.images',
      ];
    }
  
    if (storeProductImports.allowedStoreProductsRelations) {
      storeProductImports.allowedStoreProductsRelations = [
        ...storeProductImports.allowedStoreProductsRelations,
        'categories.images',
      ];
    }
  }
  