# This file covers all the currently available endpoins from our application

## Carts

### Create - POST `/carts`

#### Request Body

```json
{
  "customerEmail": "user@email.com",
  "lineItems": [
    {
      "productId": 1,
      "quantity": 3
    }
  ]
}
```

#### Response

```json
{
  "id": "2206c809-d746-4a0d-8527-4ff48329c29f",
  "totalPrice": "14.97",
  "customerEmail": null,
  "lineItems": [
    {
      "quantity": 3,
      "unitPrice": "4.99",
      "totalPrice": "14.97",
      "product": {
        "id": 1,
        "name": "Tea",
        "description": "A soothing beverage.",
        "sku": "TEA",
        "price": "4.99",
        "currency": "USD",
        "inventory": 5,
        "reserved": 3,
        "sold": 0
      }
    }
  ]
}
```

### Update - PUT `/carts/:id`

For cart updates, each line item will either be created or updated.

To remove a lineItem from the cart, its quantity should be equal to zero.

The customer email can be omitted when updating the cart.

#### Request Body

```json
{
  "lineItems": [
    {
      "productId": 1, // will be created if this product is not in the cart, or updated if it is already there
      "quantity": 3 // if zero, the item will be deleted from the cart.
    }
  ]
}
```

#### Response

```json
{
  "id": "2206c809-d746-4a0d-8527-4ff48329c29f",
  "totalPrice": "14.97",
  "customerEmail": null,
  "lineItems": [
    {
      "quantity": 3,
      "unitPrice": "4.99",
      "totalPrice": "14.97",
      "product": {
        "id": 1,
        "name": "Tea",
        "description": "A soothing beverage.",
        "sku": "TEA",
        "price": "4.99",
        "currency": "USD",
        "inventory": 5,
        "reserved": 3,
        "sold": 0
      }
    }
  ]
}
```

### Show - GET `/carts/:id`

#### Response

```json
{
  "id": "3852611c-bd4f-4945-8148-0f6234f4628e",
  "totalPrice": "48.93",
  "customerEmail": null,
  "lineItems": [
    {
      "quantity": 3,
      "unitPrice": "6.99",
      "totalPrice": "20.97",
      "product": {
        "id": 31,
        "name": "Shampoo",
        "description": "Cleans and nourishes hair.",
        "sku": "SHAMPOO",
        "price": "6.99",
        "currency": "USD",
        "inventory": 7,
        "reserved": 3,
        "sold": 0
      }
    },
    {
      "quantity": 4,
      "unitPrice": "6.99",
      "totalPrice": "27.96",
      "product": {
        "id": 32,
        "name": "Conditioner",
        "description": "Smoothens and softens hair.",
        "sku": "CONDITIONER",
        "price": "6.99",
        "currency": "USD",
        "inventory": 6,
        "reserved": 4,
        "sold": 0
      }
    }
  ]
}
```

## Categories

### Index - GET `/categories`

#### Response

```json
[
  {
    "id": 1,
    "name": "Beverages",
    "products": [
      {
        "id": 1,
        "name": "Tea",
        "description": "A soothing beverage.",
        "sku": "TEA",
        "price": "4.99",
        "currency": "USD",
        "inventory": 5,
        "reserved": 0,
        "sold": 0
      },
      {
        "id": 2,
        "name": "Coffee",
        "description": "A strong and bold beverage.",
        "sku": "COFFEE",
        "price": "5.99",
        "currency": "USD",
        "inventory": 10,
        "reserved": 0,
        "sold": 0
      }
    ]
  },
  {
    "id": 2,
    "name": "Snacks",
    "products": [
      {
        "id": 11,
        "name": "Chips",
        "description": "Crispy and salty snack.",
        "sku": "CHIPS",
        "price": "2.99",
        "currency": "USD",
        "inventory": 11,
        "reserved": 0,
        "sold": 0
      },
      {
        "id": 12,
        "name": "Chocolate Bar",
        "description": "Sweet and rich chocolate.",
        "sku": "CHOCBAR",
        "price": "1.99",
        "currency": "USD",
        "inventory": 7,
        "reserved": 0,
        "sold": 0
      }
    ]
  }
]
```

### Show - GET `/categories/:id`

#### Response

```json
{
  "id": 1,
  "name": "Beverages",
  "products": [
    {
      "id": 1,
      "name": "Tea",
      "description": "A soothing beverage.",
      "sku": "TEA",
      "price": "4.99",
      "currency": "USD",
      "inventory": 5,
      "reserved": 0,
      "sold": 0
    },
    {
      "id": 2,
      "name": "Coffee",
      "description": "A strong and bold beverage.",
      "sku": "COFFEE",
      "price": "5.99",
      "currency": "USD",
      "inventory": 10,
      "reserved": 0,
      "sold": 0
    }
  ]
}
```

## Products

### Index - GET `/products`

#### Accepted Params

- `sku` : if passed, it will search for a product that maches the string passed to the param.
- `topSold` : If passed, it will retrieve the top 10 most sold products
- `limit` : If passed and equal to an integer, it will limit the amount of results for the `topSold` query.

`sku` and `topSold` cannot be used together.
`limit` can only be used with `topSold`.

#### Response

```json
[
  {
    "id": 1,
    "name": "Tea",
    "description": "A soothing beverage.",
    "sku": "TEA",
    "price": "4.99",
    "currency": "USD",
    "inventory": 5,
    "reserved": 0,
    "sold": 0,
    "categoryId": 1
  },
  {
    "id": 2,
    "name": "Coffee",
    "description": "A strong and bold beverage.",
    "sku": "COFFEE",
    "price": "5.99",
    "currency": "USD",
    "inventory": 10,
    "reserved": 0,
    "sold": 0,
    "categoryId": 1
  }
]
```

### Show - GET `/products/:id`

#### Response

```json
{
  "id": 1,
  "name": "Tea",
  "description": "A soothing beverage.",
  "sku": "TEA",
  "price": "4.99",
  "currency": "USD",
  "inventory": 5,
  "reserved": 0,
  "sold": 0,
  "categoryId": 1
}
```
