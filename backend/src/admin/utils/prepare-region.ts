import { Store } from "@medusajs/medusa";
import type Medusa from "@medusajs/medusa-js";
import { ExtendedStoreDTO } from "@medusajs/medusa/dist/types/store";

export default async function prepareRegions(client: Medusa) {
  try {
    let { regions } = await client.admin.regions.list();

    if (!regions.length) {
      let store = await client.admin.store.retrieve();

      // Ensure store has a currency set
      if (!store.currencies || store.currencies.length === 0) {
        store = (await client.admin.store.update({
          currencies: ["eur"]
        })).store as ExtendedStoreDTO;
      }

      // Create a sample region if no regions exist
      const sampleRegion = getSampleRegion(store);
      regions = [(await client.admin.regions.create(sampleRegion)).region];
    }

    return regions;
  } catch (error) {
    console.error('Failed to prepare regions:', error);
    throw error; // Re-throw error after logging it
  }
}

function getSampleRegion(store: Store) {
  return {
    name: "EU",
    currency_code: store.currencies[0].code,
    tax_rate: 0,
    payment_providers: ["manual"],
    fulfillment_providers: ["manual"],
    countries: [
      "gb", // Great Britain
      "de", // Germany
      "dk", // Denmark
      "se", // Sweden
      "fr", // France
      "es", // Spain
      "it"  // Italy
    ]
  };
}
