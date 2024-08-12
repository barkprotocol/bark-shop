const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      serve: false,
      autoRebuild: false,
      backend: process.env.MEDUSA_ADMIN_BACKEND_URL,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
	allowedHosts: 'all'
      },
    },
  },
  {
    resolve: 'medusa-plugin-variant-images',
    options: {
      enableUI: true,
      autoMigrate: true,
      defaultImage: 'https://ucarecdn.com/74392932-2ff5-4237-a1fa-e0fd15725ecc/bark.svg',
    },
  },
  {
    resolve: 'medusa-plugin-category-images',
    options: {
      enableUI: true,
    },
  },
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: process.env.STRIPE_API_KEY,
      webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  },
  {
    resolve: `medusa-payment-paypal`,
    options: {
      sandbox: process.env.PAYPAL_SANDBOX,
      clientId: process.env.PAYPAL_CLIENT_ID,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET,
      authWebhookId: process.env.PAYPAL_AUTH_WEBHOOK_ID,
    },
  },
  {
    resolve: `medusa-payment-solana`,
    options: {
      solanaUrl: process.env.SOLANA_BLOCKCHAIN_URL, // Solana Blockchain URL
      solanaApiKey: process.env.SOLANA_API_KEY, // Solana API key
      usdcApiKey: process.env.USDC_API_KEY, // Circle API key for USDC payments
      solanaPayApi: process.env.SOLANA_PAY_API, // Solana Pay API
    },
  },
  {
    resolve: `medusa-payment-bark`,
    options: {
      barkTokenPublicKey: "2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg", // BARK token public key
      merchantId: process.env.MERCHANT_ID, // Solana wallet address (Merchant ID)
    },
  },
];

const modules = {
  /*eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwt_secret: process.env.JWT_SECRET || "supersecret",
  cookie_secret: process.env.COOKIE_SECRET || "supersecret",
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  // Uncomment the following lines to enable REDIS
  // redis_url: REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};
