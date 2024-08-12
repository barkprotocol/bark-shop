import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    Tree,
    TreeChildren,
    TreeParent
} from "typeorm";
import {
    ProductCategory as MedusaProductCategory,
    Image
} from "@medusajs/medusa";

/**
 * @entity ProductCategory
 * @description Extends Medusa's ProductCategory to include additional features such as images, thumbnail, and hierarchical relationships.
 */
@Entity()
@Tree("materialized-path")
@Index(["parent_category_id", "rank"], { unique: true })
export class ProductCategory extends MedusaProductCategory {
    /**
     * @property {Image[]} images - Array of images associated with the category.
     * @relation Many-to-Many relationship with the Image entity.
     */
    @ManyToMany(() => Image, { cascade: ["insert"] })
    @JoinTable({
        name: "product_category_images",
        joinColumn: {
            name: "category_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "image_id",
            referencedColumnName: "id"
        }
    })
    images: Image[];

    /**
     * @property {string | null} thumbnail - URL or path of the category thumbnail image.
     */
    @Column({ type: "text", nullable: true })
    thumbnail: string | null;

    /**
     * @property {ProductCategory | null} parent_category - Parent category in the hierarchical structure.
     * @relation Many-to-One relationship with the same entity for parent-child hierarchy.
     */
    @TreeParent()
    @JoinColumn({ name: "parent_category_id" })
    parent_category: ProductCategory | null;

    /**
     * @property {ProductCategory[]} category_children - Child categories in the hierarchical structure.
     * @relation One-to-Many relationship with the same entity for child categories.
     */
    @TreeChildren({ cascade: true })
    category_children: ProductCategory[];
}
