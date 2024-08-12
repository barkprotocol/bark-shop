import { ProductCategoryRepository } from "../repositories/product-category";
import { ProductCategory } from "../models/product-category";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductCategoryService {
    constructor(
        private readonly productCategoryRepository: ProductCategoryRepository
    ) {}

    /**
     * @method getAllCategories
     * @description Retrieves all product categories with their images and thumbnails.
     * @returns {Promise<ProductCategory[]>} List of product categories.
     */
    async getAllCategories(): Promise<ProductCategory[]> {
        return this.productCategoryRepository.findAllWithImagesAndThumbnail();
    }

    /**
     * @method getCategoryById
     * @description Retrieves a product category by its ID.
     * @param {string} id - The ID of the category to retrieve.
     * @returns {Promise<ProductCategory | undefined>} The product category with the specified ID.
     */
    async getCategoryById(id: string): Promise<ProductCategory | undefined> {
        return this.productCategoryRepository.findByCategoryId(id);
    }

    /**
     * @method getRootCategories
     * @description Retrieves all root categories (categories without a parent).
     * @returns {Promise<ProductCategory[]>} List of root categories.
     */
    async getRootCategories(): Promise<ProductCategory[]> {
        return this.productCategoryRepository.findRootCategories();
    }

    /**
     * @method createCategory
     * @description Creates a new product category.
     * @param {Partial<ProductCategory>} categoryData - Data for the new category.
     * @returns {Promise<ProductCategory>} The newly created category.
     */
    async createCategory(categoryData: Partial<ProductCategory>): Promise<ProductCategory> {
        return this.productCategoryRepository.createCategory(categoryData);
    }

    /**
     * @method updateCategory
     * @description Updates an existing product category.
     * @param {string} id - The ID of the category to update.
     * @param {Partial<ProductCategory>} updateData - Data to update the category.
     * @returns {Promise<ProductCategory | undefined>} The updated category.
     */
    async updateCategory(id: string, updateData: Partial<ProductCategory>): Promise<ProductCategory | undefined> {
        const category = await this.getCategoryById(id);
        if (!category) {
            return undefined;
        }

        // Merge existing category with updated data
        Object.assign(category, updateData);
        return this.productCategoryRepository.save(category);
    }

    /**
     * @method deleteCategory
     * @description Deletes a product category by its ID.
     * @param {string} id - The ID of the category to delete.
     * @returns {Promise<void>} A promise that resolves when the category is deleted.
     */
    async deleteCategory(id: string): Promise<void> {
        const category = await this.getCategoryById(id);
        if (!category) {
            throw new Error(`Category with ID ${id} not found.`);
        }

        await this.productCategoryRepository.remove(category);
    }
}
