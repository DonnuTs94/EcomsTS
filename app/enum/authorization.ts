enum Role {
  ADMIN = "admin",
  SELLER = "seller",
  REGULAR_USER = "user",
}

enum Permission {
  BROWSE_PRODUCTS = "browse_products",
  READ_PRODUCT = "read_product",
  EDIT_PRODUCT = "edit_product",
  ADD_PRODUCT = "add_product",
  DELETE_PRODUCT = "delete_product",

  BROWSE_CATEGORIES = "browse_categories",
  READ_CATEGORY = "read_category",
  EDIT_CATEGORY = "edit_category",
  ADD_CATEGORY = "add_category",
  DELETE_CATEGORY = "delete_category",

  BROWSE_CARTS = "browse_carts",
  EDIT_CART = "edit_cart",
  ADD_CART = "add_cart",
  DELETE_CART = "delete_cart",

  BROWSE_ORDERS = "browse_orders",
  READ_ORDER = "read_order",
  ADD_ORDER = "add_order",
}

enum PermissionAssignment {
  ADMIN = "admin",
  SELLER = "seller",
  REGULAR_USER = "user",
}

export { Role, Permission, PermissionAssignment }
