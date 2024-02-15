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

### Get All Orders

- **Method:** GET
- **Endpoint:** `/order/`
- **Description:** Get all orders.

### Get Order by ID

- **Method:** GET
- **Endpoint:** `/order/:id`
- **Description:** Get an order by its ID.

```

```
