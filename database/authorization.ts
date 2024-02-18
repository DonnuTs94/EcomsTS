export const Role: Record<string, string> = {
  ADMIN: "admin",
  SELLER: "seller",
  REGULAR_USER: "user",
}

export const Permission: Record<string, string> = {
  BROWSE_PRODUCTS: "browse_products",
  READ_PRODUCT: "read_product",
  EDIT_PRODUCT: "edit_product",
  ADD_PRODUCT: "add_product",
  DELETE_PRODUCT: "delete_product",

  BROWSE_CATEGORIES: "browse_categories",
  READ_CATEGORY: "read_category",
  EDIT_CATEGORY: "edit_category",
  ADD_CATEGORY: "add_category",
  DELETE_CATEGORY: "delete_category",

  BROWSE_CARTS: "browse_carts",
  EDIT_CART: "edit_cart",
  ADD_CART: "add_cart",
  DELETE_CART: "delete_cart",

  BROWSE_ORDERS: "browse_orders",
  READ_ORDER: "read_order",
  ADD_ORDER: "add_order",
  EDIT_ORDER: "edit_order",

  ADD_PAYMENT: "add_payment",
}

export const PermissionAssignment: Record<string, string[]> = {
  [Role.ADMIN]: [
    Permission.EDIT_CATEGORY,
    Permission.ADD_CATEGORY,
    Permission.DELETE_CATEGORY,
  ],

  [Role.SELLER]: [
    Permission.BROWSE_PRODUCTS,
    Permission.READ_PRODUCT,
    Permission.EDIT_PRODUCT,
    Permission.ADD_PRODUCT,
    Permission.DELETE_PRODUCT,

    Permission.BROWSE_CATEGORIES,
    Permission.READ_CATEGORY,

    Permission.BROWSE_ORDERS,
    Permission.EDIT_ORDER,
  ],

  [Role.REGULAR_USER]: [
    Permission.BROWSE_PRODUCTS,
    Permission.READ_PRODUCT,

    Permission.BROWSE_CATEGORIES,
    Permission.READ_CATEGORY,

    Permission.BROWSE_CARTS,
    Permission.EDIT_CART,
    Permission.ADD_CART,
    Permission.DELETE_CART,

    Permission.BROWSE_ORDERS,
    Permission.READ_ORDER,
    Permission.ADD_ORDER,

    Permission.ADD_PAYMENT,
  ],
}
