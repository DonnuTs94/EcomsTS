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

**Clone Repository:**

- Copy the repository URL from the repository page.
- Open your terminal or command prompt.
- Navigate to the directory where you want to clone the repository.
- Run the following command:

  ```
  git clone https://github.com/harrymahardhika/dummy-payment-gateway
  ```

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

### Additional Notes

- Make sure to check the `README.md` file in the cloned repository for any specific instructions provided by the project's creator.
- You may need to configure environment variables or make other adjustments according to your requirements.

## Payment Scheduler Documentation

### Overview

The Payment Scheduler module provides functionality for managing order payments by scheduling tasks to check and update payment statuses. It employs the `node-schedule` library for task scheduling and integrates with Prisma ORM for database operations.

### Functions

#### Payment Check

- **Description:** Schedules a task to check the payment status of an order and updates it if the payment is not received within one minute.
- **Operation:**

  - Checks the status of the order.
  - If the status is "waitingForPayment" after one minute, updates the order status to "canceled" and returns the ordered product quantities to their original quantities.

#### Update Payment To Success

- **Description:** Schedules a task to update the payment status of an order to "Success" after 20 seconds.
- **Parameters:**
  - `date`: Date - The timestamp representing the scheduled update time.
  - `orderId`: number - The unique identifier of the order to be updated.
- **Operation:**

  - Creates a job scheduled for 20 seconds from the provided `date`.
  - Upon execution, updates the payment status of the order identified by `orderId` to "Success".

## Postman Collection

### Overview

The Postman Collection file `Ecoms.postman_collection.json` contains a collection of API requests that correspond to the routes and endpoints defined in the application.

### Usage

1. Download the Postman Collection file `Ecoms.postman_collection.json`.
2. Import the collection into your Postman application.
3. Explore and execute the included requests to interact with the API endpoints.
4. Use the collection as a reference for understanding and testing the functionality of the application's API.

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

## User

### User Update

- **Method** Put
- **Endpoint** `/user/update`
- **Description** Update user data.

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
