import { useState, useEffect } from 'react';
import { Button, Container, DropdownMenu, Heading } from '@medusajs/ui';
import { ProductDetailsWidgetProps, WidgetConfig } from '@medusajs/admin';
import { Product, ProductCategory } from '@medusajs/medusa';
import { EllipsisHorizontal, PencilSquare, Spinner } from '@medusajs/icons';
import CategoriesImagesModal from '../category-images/category-images-modal';
import { useAdminUpdateProductCategory, useMedusa } from 'medusa-react';
import './CategoriesImagesWidget.css'; // Import your CSS file here

const CategoriesImagesWidget = ({
  product,
  notify,
}: ProductDetailsWidgetProps) => {
  const medusa = useMedusa();
  const [medusaProduct, setMedusaProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsWithCategories = async () => {
      const productWithCategory = await medusa.client.admin.products.retrieve(product.id, {
        relations: ["categories", "categories.images"]
      });
      setMedusaProduct(productWithCategory.product);
      setLoading(false);
    };
    fetchProductsWithCategories();
  }, [medusa.client.admin.products, product.id]);

  const [openedCategory, setOpenedCategory] = useState<ProductCategory | null>(null);
  const [openedDialogType, setOpenedDialogType] = useState<'media' | 'thumbnail' | null>(null);

  const handleClose = () => {
    setOpenedCategory(null);
    setOpenedDialogType(null);
  };

  return (
    <>
      <Container className="category-images-widget">
        <Heading
          level="h1"
          className="flex items-center justify-between gap-x-4 text-2xl font-semibold"
        >
          Categories Images
        </Heading>
        {loading && <Spinner />}
        {!loading && (
          <div>
            {medusaProduct?.categories?.length
              ? `Categories Images. Found ${medusaProduct.categories.length} categories`
              : 'No categories found.'}
          </div>
        )}

        {!loading && medusaProduct?.categories?.map((category) => (
          <div key={category.id} className="mt-3 w-full">
            <div className="flex items-center">
              <div className="inter-base-semibold flex-1">{category.name}</div>
              <DropdownMenu>
                <DropdownMenu.Trigger asChild>
                  <Button variant="secondary" format={'icon'}>
                    <EllipsisHorizontal />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item
                    onClick={() => {
                      setOpenedCategory(category);
                      setOpenedDialogType('thumbnail');
                    }}
                    className="gap-x-2"
                  >
                    <PencilSquare className="text-ui-fg-subtle" />
                    Edit Thumbnail
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      setOpenedCategory(category);
                      setOpenedDialogType('media');
                    }}
                    className="gap-x-2"
                  >
                    <PencilSquare className="text-ui-fg-subtle" />
                    Edit Media
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </div>
            <div className="flex flex-wrap items-center">
              {category.thumbnail ? (
                <img
                  src={category.thumbnail}
                  alt="Thumbnail"
                  className="image-preview"
                />
              ) : (
                <div className="inter-regular mr-1 w-20 break-words">
                  No thumbnail
                </div>
              )}

              {category.images.length ? (
                category.images.map((image) => (
                  <div key={image.id} className="image-item">
                    <img
                      src={image.url}
                      alt="Uploaded image"
                      className="image-preview"
                    />
                    {/* You can add additional elements or buttons here */}
                  </div>
                ))
              ) : (
                <span className="inter-regular">No images...</span>
              )}
            </div>
          </div>
        )}
      </Container>

      {openedDialogType && (
        <CategoriesImagesModal
          product={product}
          category={openedCategory}
          open={!!openedCategory}
          onClose={handleClose}
          type={openedDialogType}
          notify={notify}
        />
      )}
    </>
  );
};

export const config: WidgetConfig = {
  zone: 'product.details.after',
};

export default CategoriesImagesWidget;
