![BARK Store Logo](https://ucarecdn.com/47528138-2792-4ab7-9fe4-962d17686119/barkshoplogo.png)

#### BARK - An E-commerce Store Using Next.js, Medusa, Solana, and Neon Postgres

## Description

BARK is a modern Web3 e-commerce platform designed for product sales and demonstrations, specifically showcasing the use of Web3 payment gateways. Built with the Medusa.js toolkit, integrated with Neon Postgres as the database solution, and featuring a Next.js-based storefront, BARK is crafted to deliver a scalable, customizable, and efficient online shopping experience. The platform integrates cutting-edge blockchain technology, allowing users to transact using cryptocurrencies through BARK's proprietary Web3 payment gateway.

### Key Components

#### 1. **Backend Server**
   - **Medusa.js:** A flexible and scalable open-source headless commerce engine that powers the BARK e-commerce backend.
   - **Neon Postgres:** A cloud-native Postgres database solution known for its scalability, high performance, and compatibility with modern development workflows.
   - **API Integration:** Medusa's powerful API system allows easy integration with various third-party services, ensuring that BARK can grow and adapt to new requirements.

#### 2. **Store Admin Dashboard**
   - **Admin UI:** The Medusa admin dashboard offers a user-friendly interface for managing all aspects of the store, including inventory, orders, customers, and marketing campaigns.
   - **Customization:** The dashboard is customizable, allowing admins to tailor the management experience to the specific needs of their store.

#### 3. **Storefront**
   - **Next.js:** The storefront is built using Next.js, a React framework that provides a highly optimized, SEO-friendly, and fast-loading frontend experience.
   - **Responsive Design:** The BARK storefront is designed to be fully responsive, ensuring a seamless shopping experience across desktops, tablets, and mobile devices.
   - **Dynamic Content:** Leverages Next.js capabilities to serve dynamic content, such as personalized product recommendations and real-time inventory updates.

### Features

- **Web3 Payment Gateway:** Showcases BARK's proprietary Web3 payment gateway, supporting various cryptocurrencies such as USDC, SOL, and BARK tokens, facilitating secure and decentralized transactions.
- **Seamless Shopping Experience:** BARK offers a streamlined, intuitive shopping experience with fast load times and smooth transitions.
- **Product Management:** Efficiently manage your product catalog, including variations, categories, and inventory, through the Medusa admin.
- **Secure Payments:** Integrated with secure payment gateways to handle transactions safely, including advanced cryptocurrency payments.
- **Scalability:** The combination of Medusa.js and Neon Postgres ensures that BARK can scale to meet increasing demands as our store grows.
- **Customizable:** Both the storefront and backend are highly customizable, allowing for unique branding and feature sets that match our business needs.

### Getting Started

To set up the BARK e-commerce store on your local machine or server, follow the steps below:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/barkprotocol/bark-ecommerce
   cd bark-ecommerce
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up the Database:**
   - Sign up for a Neon Postgres account and create a new database.
   - Configure your database connection in Medusa by updating the environment variables in the `.env` file.

4. **Start the Medusa Server:**
   ```bash
   npm run start:medusa
   ```

5. **Launch the Admin Dashboard:**
   ```bash
   npm run start:admin
   ```

6. **Run the Storefront:**
   ```bash
   npm run start:storefront
   ```

7. **Access Your Store:**
   - Admin Dashboard: `http://localhost:9001`
   - Storefront: `http://localhost:8000`

### Install and Test Storefront Locally

To install and test the BARK storefront on your local machine, follow these steps:

1. **Open a New Terminal Session:**
   Navigate to the `medusa-storefront` directory:
   ```bash
   cd medusa-neon/medusa-storefront
   ```

2. **Install Dependencies:**
   Install the required packages by running:
   ```bash
   npm install
   ```

3. **Copy Environment Variables:**
   Copy the environment variables template to the local environment file:
   ```bash
   cp .env.template .env.local
   ```

4. **Run the Storefront Server:**
   Start the development server by running:
   ```bash
   npm run dev
   ```

   Your Next.js Starter Storefront will start running on port `8000`. Visit [localhost:8000](http://localhost:8000) in your browser to see the storefront.

   ![Storefront Home Page Demo](https://)

   If everything is working correctly, you should see the storefront displaying products from your backend.

### Conclusion

BARK is designed to be a powerful, flexible, and easy-to-use e-commerce platform that not only supports traditional e-commerce but also demonstrates the future of online transactions through Web3 technologies. Whether you're looking to sell products or showcase innovative payment solutions, BARK offers a solid foundation for creating and managing a successful online store.