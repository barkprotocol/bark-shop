import { EntityRepository, Repository } from "typeorm";
import { ProductCategory } from "../models/product-category";

/**
 * @repository ProductCategoryRepository
 * @description Custom repository for the ProductCategory entity.
 */
@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends Repository<ProductCategory> {
    /**
     * @method findAllWithImagesAndThumbnail
     * @description Retrieves all categories with their associated images and thumbnail.
     * @returns {Promise<ProductCategory[]>} List of product categories with images and thumbnail.
     */
    async findAllWithImagesAndThumbnail(): Promise<ProductCategory[]> {
        return this.createQueryBuilder("category")
            .leftJoinAndSelect("category.images", "image")
            .getMany();
    }

    /**
     * @method findByCategoryId
     * @description Retrieves a category by its ID, including images and thumbnail.
     * @param {string} categoryId - The ID of the category to retrieve.
     * @returns {Promise<ProductCategory | undefined>} The product category with the specified ID, or undefined if not found.
     */
    async findByCategoryId(categoryId: string): Promise<ProductCategory | undefined> {
        return this.createQueryBuilder("category")
            .leftJoinAndSelect("category.images", "image")
            .where("category.id = :id", { id: categoryId })
            .getOne();
    }

    /**
     * @method findRootCategories
     * @description Retrieves all root categories (categories with no parent).
     * @returns {Promise<ProductCategory[]>} List of root product categories.
     */
    async findRootCategories(): Promise<ProductCategory[]> {
        return this.createQueryBuilder("category")
            .where("category.parent_category_id IS NULL")
            .getMany();
    }

    /**
     * @method createCategory
     * @description Creates a new category.
     * @param {Partial<ProductCategory>} categoryData - The data for the new category.
     * @returns {Promise<ProductCategory>} The created category.
     */
    async createCategory(categoryData: Partial<ProductCategory>): Promise<ProductCategory> {
        const category = this.create(categoryData);
        return this.save(category);
    }
}
