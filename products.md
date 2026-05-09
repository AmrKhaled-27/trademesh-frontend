# Trademesh Marketplace API Documentation (Products)

This document covers all the necessary product endpoints for the Frontend Agent to integrate with the Trademesh Marketplace backend.

All endpoints prefix: `http://localhost:3000`

## Products (`/api/products`)

### 1. Create a Product

- **URL**: `/api/products`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "Wireless Keyboard",
    "description": "Compact wireless keyboard with backlight",
    "mainImage": "https://cdn.example.com/products/keyboard.jpg",
    "images": ["https://cdn.example.com/products/kb1.jpg"],
    "brand": "Logitech",
    "price": 49.99
  }
  ```
- **Success Response (201)**:
  ```json
  {
    "message": "Product created successfully",
    "product": {
      "id": 1,
      "name": "Wireless Keyboard",
      "price": 49.99,
      "status": "for_sale"
    }
  }
  ```

### 2. List Active Products

List available active products with optional filters.

- **URL**: `/api/products?search=Keyboard&brand=Logitech`
- **Method**: `GET`
- **Success Response (200)**:
  ```json
  {
    "products": [
      {
        "id": 1,
        "name": "Wireless Keyboard",
        "description": "Compact wireless keyboard",
        "mainImage": "https://cdn.example.com/products/keyboard.jpg",
        "price": 49.99,
        "brand": "Logitech",
        "status": "for_sale"
      }
    ]
  }
  ```

### 3. Get User Products (Tokens required)

Gets products by the current authenticated user.

- **URL**: `/api/products/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response (200)**:
  ```json
  {
    "products": [
      {
        "id": 1,
        "name": "Wireless Keyboard",
        "status": "sold",
        "price": 49.99,
        "ownerId": 12,
        "buyerId": 10
      }
    ]
  }
  ```

### 4. Get Product By ID

- **URL**: `/api/products/{id}`
- **Method**: `GET`
- **Success Response (200)**:
  ```json
  {
    "product": {
      "id": 1,
      "name": "Wireless Keyboard",
      "description": "...",
      "price": 49.99,
      "status": "for_sale"
    }
  }
  ```

### 5. Update Product

- **URL**: `/api/products/{id}`
- **Method**: `PATCH`
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "price": 59.99,
    "description": "Updated product description"
  }
  ```
- **Success Response (200)**:
  ```json
  {
    "message": "Product updated successfully",
    "product": {
      "id": 1,
      "price": 59.99
    }
  }
  ```

### 6. Delete Product

- **URL**: `/api/products/{id}`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response (200)**:
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```
