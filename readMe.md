# API Documentation

# Setting up the Project

## Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/DonnuTs94/EcomsTS.git
```

Navigate to the clone project directory

```bash
cd <project_directory>
```

Install the required dependencies by running:

```bash
npm install
```

Generate database after fill the .env

```bash
npx prisma migrate dev
```

Seed the database with initial data

```bash
npm run seed
```

Start the development server

```bash
npm run dev
```

### Payment gateway setup

1. **Create Repository:**

   - Go to [GitHub](https://github.com) and log in.
   - Click on the "New" button to create a new repository.
   - Enter the repository name, description, and other optional settings.
   - Click on the "Create repository" button.

2. **Clone Repository:**
   - Copy the repository URL from the repository page.
   - Open your terminal or command prompt.
   - Navigate to the directory where you want to clone the repository.
   - Run the following command:
     ```
     git clone <https://github.com/harrymahardhika/dummy-payment-gateway>
     ```
   - Replace `<https://github.com/harrymahardhika/dummy-payment-gateway>` with the URL you copied from the repository page.
   - Press Enter to clone the repository to your local machine.

### Set Up the Project

1. **Install Dependencies:**

   - Navigate to the project directory in your terminal.
   - Run the following command to install dependencies:
     ```
     npm install
     ```
   - This command will install all the required dependencies listed in the `package.json` file.

2. **Start the Server:**

   - After installing dependencies, you can start the server by running:
     ```
     npm start
     ```
   - This command will start the server, and it will be accessible at the specified port (default port is usually 3000).

3. **Testing:**
   - Once the server is running, you can test the endpoints using tools like Postman or by making HTTP requests directly.

### Additional Notes

- Make sure to check the `README.md` file in the cloned repository for any specific instructions provided by the project's creator.
- You may need to configure environment variables or make other adjustments according to your requirements.

### Admin Collection:

- **Admin User:**
  - **Email:** admin@example.com
  - **Password:** Password123!

### Seller Collection:

- **Seller 1:**
  - **Email:** seller1@example.com
  - **Password:** Password123!
- **Seller 2:**
  - **Email:** seller2@example.com
  - **Password:** Password123!
- **Seller 3:**
  - **Email:** seller3@example.com
  - **Password:** Password123!

### Seller Collection:

- **User 1:**
  - **Email:** user1@example.com
  - **Password:** Password123!
- **User 2:**
  - **Email:** user2@example.com
  - **Password:** Password123!
- **User 3:**
  - **Email:** user3@example.com
  - **Password:** Password123!
- **User 4:**
  - **Email:** user4@example.com
  - **Password:** Password123!
- **User 5:**
  - **Email:** user5@example.com
  - **Password:** Password123!

## User Registration

### Register a User

- **Method:** POST
- **Endpoint:** `/user/register`
- **Description:** Register a new user.

## Admin Registration

### Register an Admin

- **Method:** POST
- **Endpoint:** `/admin/register`
- **Description:** Register a new admin user.

## Seller Registration

### Register a Seller

- **Method:** POST
- **Endpoint:** `/seller/register`
- **Description:** Register a new seller user.

## Seller Orders

### Get Seller Orders

- **Method:** GET
- **Endpoint:** `/seller/orders`
- **Description:** Get orders for a seller.

## Authentication

### Authenticate User

- **Method:** POST
- **Endpoint:** `/auth/`
- **Description:** Authenticate user credentials.

## Category

### Get All Categories

- **Method:** GET
- **Endpoint:** `/category/`
- **Description:** Get all categories.

### Create Category

- **Method:** POST
- **Endpoint:** `/category/`
- **Description:** Create a new category.

### Update Category

- **Method:** PUT
- **Endpoint:** `/category/`
- **Description:** Update an existing category.

## Product

### Create Product

- **Method:** POST
- **Endpoint:** `/product/`
- **Description:** Create a new product.

### Get All Products

- **Method:** GET
- **Endpoint:** `/product/`
- **Description:** Get all products.

### Get Product by ID

- **Method:** GET
- **Endpoint:** `/product/:id`
- **Description:** Get a product by its ID.

### Update Product

- **Method:** PUT
- **Endpoint:** `/product/:id`
- **Description:** Update a product.

### Hard Delete Product

- **Method:** DELETE
- **Endpoint:** `/product/hard-delete/:id`
- **Description:** Permanently delete a product.

### Delete Product

- **Method:** DELETE
- **Endpoint:** `/product/:id`
- **Description:** Soft delete a product.

### Upload Product Image

- **Method:** POST
- **Endpoint:** `/product/:id/image`
- **Description:** Upload an image for a product.

### Delete Product Image

- **Method:** DELETE
- **Endpoint:** `/product/:id/image`
- **Description:** Delete an image associated with a product.

## Cart

### Create Cart

- **Method:** POST
- **Endpoint:** `/cart/`
- **Description:** Create a new cart.

### Get All Carts

- **Method:** GET
- **Endpoint:** `/cart/`
- **Description:** Get all carts.

### Update Cart

- **Method:** PUT
- **Endpoint:** `/cart/`
- **Description:** Update an existing cart.

### Delete Cart

- **Method:** DELETE
- **Endpoint:** `/cart/`
- **Description:** Delete a cart.

## Order

### Create Order

- **Method:** POST
- **Endpoint:** `/order/`
- **Description:** Create a new order.

### Process Payment for an Order

- **Method:** POST
- **Endpoint:** `/order/:id/payment`
- **Description:** Initiates the payment process for a particular order identified by its ID.

### Get All Orders

- **Method:** GET
- **Endpoint:** `/order/`
- **Description:** Get all orders.

### Get Order by ID

- **Method:** GET
- **Endpoint:** `/order/:id`
- **Description:** Get an order by its ID.
