import { Region } from "@medusajs/medusa";
import type Medusa from "@medusajs/medusa-js";

export default async function prepareShippingOptions(client: Medusa, region: Region) {
  try {
    let { shipping_options } = await client.admin.shippingOptions.list({
      region_id: region.id,
    });

    if (!shipping_options.length) {
      // Create a default shipping option if none exist
      const newShippingOption = await client.admin.shippingOptions.create({
        name: "PostFake Standard",
        region_id: region.id,
        provider_id: "manual",
        data: {
          id: "manual-fulfillment",
        },
        price_type: "flat_rate",
        amount: 1000, // Amount in the smallest currency unit (e.g., cents)
      });

      shipping_options = [newShippingOption.shipping_option];
    }

    return shipping_options;
  } catch (error) {
    console.error('Failed to prepare shipping options:', error);
    throw error; // Re-throw error after logging it
  }
}
