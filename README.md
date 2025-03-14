Shopify Featured Products Section
This repository contains the implementation of the Featured Products section for a Shopify store, developed using the Dawn theme. The goal of the section is to display recommended products from a selected collection, excluding products that are already in the cart, with the ability to add new products to the cart without page reloads.

Features
Displays featured products from a customizable collection.
Excludes products already in the cart from being displayed in the featured products section.
Allows products to be added to the cart via an "Add to Cart" button.
Fully integrated into the Dawn theme.
Fully responsive and mobile-first design.
No page reloads for adding products to the cart.
Uses SASS/SCSS for styling and modern JavaScript for functionality.
Prerequisites
Before setting up the project, ensure that you have the following tools installed:

Node.js: Download and install Node.js
Shopify Partner Account: Create an account if you don’t have one.
Test Store: Set up a development store on Shopify.
Setup
To start working with this repository, follow these steps:

1. Clone the repository
   bash
   git clone https://github.com/KelOff/Shopify_test.git
   cd your-repository-folder
2. Install Dependencies
   To install the required dependencies for the project, run the following command depending on your preferred package manager.

Using npm:

bash

npm install
Using yarn:

bash

yarn install
Using pnpm:

bash

pnpm install 3. Start Development Server
To start the local development environment, run:

Using npm:

bash

npm run dev
Using yarn:

bash

yarn dev
Using pnpm:

bash

pnpm run dev
Once the server is running, open your browser and navigate to the URL provided in the terminal (typically http://localhost:3000).

4. Customize the Featured Products Section
   You can customize the collection that the featured products come from by accessing the Shopify Admin and configuring the Featured Products section in the theme customizer. Make sure the section is added to the homepage.

5. Add the Section to the Homepage
   In the Shopify Admin, navigate to Online Store > Themes. Open the Dawn theme editor and:

Add the Featured Products section to the homepage.
Configure it to select a collection from which the products will be pulled.
Features Breakdown
Dynamic Product Display: The featured products are dynamically displayed based on a selected collection, which can be chosen via the Shopify theme customizer.
Exclusion of Cart Items: The products that are already added to the cart will be excluded from the featured products list.
Add to Cart Without Page Reload: When the "Add to Cart" button is clicked, the product is added to the cart dynamically without requiring a page reload.
Pop-up Cart Integration: The built-in Shopify cart pop-up is triggered when a product is added to the cart.
Files Overview
/sections/featured-products.liquid: Contains the liquid code for displaying the featured products.
/assets/styles.scss: The main stylesheet where SASS is used for styling.
/assets/cart.js: JavaScript code for managing cart interactions (adding items without page reload).
/config/settings_schema.json: Configuration file to set up custom theme settings for selecting the featured products collection.
Development Tools
Using SASS/SCSS
This project uses SASS/SCSS for styling, and it's integrated into the project through the standard Shopify theme pipeline.

Component-Based Approach
The project follows a component-based approach similar to the Shopify Dawn theme, ensuring that each section is modular and can be reused or extended as needed.

Task Runner (Gulp or Webpack)
For asset compilation and development, you can use Gulp or Webpack. If you want to set up one of these task runners, follow the instructions below for your preferred option:

Gulp Example:
Install gulp:

bash

npm install --save-dev gulp
Create a gulpfile.js for your build tasks.

Add tasks to compile SCSS to CSS and optimize images.

Webpack Example:
Install webpack:

bash

npm install --save-dev webpack webpack-cli webpack-dev-server
Configure webpack.config.js for asset bundling and optimization.

Deploying the App
Once you've set up your Shopify store and customized the theme, deploy it to production. Follow the steps in the Shopify documentation for deploying themes:

Shopify Theme Deployment
Make sure to test the functionality on both desktop and mobile devices to ensure full compatibility.

Additional Resources
Shopify Developers Documentation
Shopify Liquid Docs
SASS Documentation
Shopify Theme Customizer
Example of Useful Commands
bash

# Install dependencies

npm install

# Run local development server

npm run dev

# Build for production

npm run build
Troubleshooting
If you encounter issues during development, ensure your environment is correctly configured, and check for any errors in the browser's console or terminal output. Common issues may involve missing dependencies or incorrect file paths.
