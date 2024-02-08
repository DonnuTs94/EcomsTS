enum Role {
  ADMINISTRATOR = "administrator",
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
}

enum PermissionAssignment {
  ADMINISTRATOR = "administrator",
  REGULAR_USER = "user",
}

export { Role, Permission, PermissionAssignment }
