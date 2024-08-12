import { AdminPostProductsReq, Region } from "@medusajs/medusa";

type SampleProductsOptions = {
  regions: Region[];
  collection_id?: string;
};

// Define the ProductStatus enum for product states
enum ProductStatus {
  PUBLISHED = "published",
}

export default function getSampleProducts({
  regions,
  collection_id,
}: SampleProductsOptions): AdminPostProductsReq[] {
  return [
    {
      title: "BARK Club Tier 1 Badge",
      status: ProductStatus.PUBLISHED,
      collection_id,
      discountable: false,
      subtitle: null,
      description: "Exclusive badge for Club Tier 1 members. Show off your membership with pride.",
      handle: "club-tier-1-badge",
      is_giftcard: false,
      weight: 50,
      images: [
        "https://example.com/images/club-tier-1-badge.png"
      ],
      options: [],
      variants: [
        {
          title: "One Size",
          prices: regions.map((region) => ({
            currency_code: region.currency_code,
            amount: 0, // Assuming badges are free
          })),
          options: [],
          inventory_quantity: 1000, // Large inventory for badges
          manage_inventory: false, // No need to manage inventory for badges
        },
      ],
    },
    {
      title: "BARK Club Tier 2 Badge",
      status: ProductStatus.PUBLISHED,
      collection_id,
      discountable: false,
      subtitle: null,
      description: "Exclusive badge for Club Tier 2 members. Recognize your higher status.",
      handle: "club-tier-2-badge",
      is_giftcard: false,
      weight: 50,
      images: [
        "https://example.com/images/club-tier-2-badge.png"
      ],
      options: [],
      variants: [
        {
          title: "One Size",
          prices: regions.map((region) => ({
            currency_code: region.currency_code,
            amount: 0, // Assuming badges are free
          })),
          options: [],
          inventory_quantity: 1000, // Large inventory for badges
          manage_inventory: false, // No need to manage inventory for badges
        },
      ],
    },
    {
      title: "BARK Club Tier 3 Badge",
      status: ProductStatus.PUBLISHED,
      collection_id,
      discountable: false,
      subtitle: null,
      description: "Exclusive badge for Club Tier 3 members. The pinnacle of club status.",
      handle: "club-tier-3-badge",
      is_giftcard: false,
      weight: 50,
      images: [
        "https://example.com/images/club-tier-3-badge.png"
      ],
      options: [],
      variants: [
        {
          title: "One Size",
          prices: regions.map((region) => ({
            currency_code: region.currency_code,
            amount: 0, // Assuming badges are free
          })),
          options: [],
          inventory_quantity: 1000, // Large inventory for badges
          manage_inventory: false, // No need to manage inventory for badges
        },
      ],
    },
    {
      title: "BARK Streetwear Jacket",
      status: ProductStatus.PUBLISHED,
      collection_id,
      discountable: true,
      subtitle: null,
      description: "Stylish streetwear jacket featuring BARK's unique design. Perfect for urban adventures.",
      handle: "streetwear-jacket",
      is_giftcard: false,
      weight: 800,
      images: [
        "https://example.com/images/streetwear-jacket-front.png",
        "https://example.com/images/streetwear-jacket-back.png"
      ],
      options: [
        {
          title: "Size",
        },
        {
          title: "Color",
        },
      ],
      variants: [
        {
          title: "S / Black",
          prices: regions.map((region) => ({
            currency_code: region.currency_code,
            amount: 5000,
          })),
          options: [
            {
              value: "S",
            },
            {
              value: "Black",
            },
          ],
          inventory_quantity: 100,
          manage_inventory: true,
        },
        {
          title: "M / Black",
          prices: regions.map((region) => ({
            currency_code: region.currency_code,
            amount: 5000,
          })),
          options: [
            {
              value: "M",
            },
            {
              value: "Black",
            },
          ],
          inventory_quantity: 100,
          manage_inventory: true,
        },
        {
          title: "L / Black",
          prices: regions.map((region) => ({
            currency_code: region.currency_code,
            amount: 5000,
          })),
          options: [
            {
              value: "L",
            },
            {
              value: "Black",
            },
          ],
          inventory_quantity: 100,
          manage_inventory: true,
        },
        {
          title: "XL / Black",
          prices: regions.map((region) => ({
            currency_code: region.currency_code,
            amount: 5000,
          })),
          options: [
            {
              value: "XL",
            },
            {
              value: "Black",
            },
          ],
          inventory_quantity: 100,
          manage_inventory: true,
        },
      ],
    },
    {
      title: "BARK Streetwear Cap",
      status: ProductStatus.PUBLISHED,
      collection_id,
      discountable: true,
      subtitle: null,
      description: "Trendy streetwear cap to complement your urban look. Adjustable and comfortable.",
      handle: "streetwear-cap",
      is_giftcard: false,
      weight: 200,
      images: [
        "https://example.com/images/streetwear-cap.png"
      ],
      options: [],
      variants: [
        {
          title: "One Size",
          prices: regions.map((region) => ({
            currency_code: region.currency_code,
            amount: 2500,
          })),
          options: [],
          inventory_quantity: 100,
          manage_inventory: true,
        },
      ],
    },
  ];
}
