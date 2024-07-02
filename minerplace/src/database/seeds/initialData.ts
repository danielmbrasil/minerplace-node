import { Knex } from 'knex';
import { BaseModel } from '../models/BaseModel.js';
import { LineItemModel } from '../models/LineItemModel.js';
import { CartModel } from '../models/CartModel.js';
import { ProductModel } from '../models/ProductModel.js';
import { CategoryModel } from '../models/CategoryModel.js';
import { DiscountCodeModel } from '../models/DiscountCodeModel.js';

export async function seed(knex: Knex): Promise<void> {
  BaseModel.knex(knex);

  try {
    await LineItemModel.query().delete();
    await CartModel.query().delete();
    await ProductModel.query().delete();
    await CategoryModel.query().delete();
    await DiscountCodeModel.query().delete();

    const beveragesCategory = await CategoryModel.query().insert({ name: 'Beverages' });
    const snacksCategory = await CategoryModel.query().insert({ name: 'Snacks' });
    const bakeryCategory = await CategoryModel.query().insert({ name: 'Bakery' });
    const personalCareCategory = await CategoryModel.query().insert({ name: 'Personal Care' });

    await ProductModel.query().insertGraph([
      { categoryId: beveragesCategory.id, name: 'Tea', description: 'A soothing beverage.', sku: 'TEA', price: 4.99, currency: 'USD', inventory: 5 },
      { categoryId: beveragesCategory.id, name: 'Coffee', description: 'A strong and bold beverage.', sku: 'COFFEE', price: 5.99, currency: 'USD', inventory: 10 },
      { categoryId: beveragesCategory.id, name: 'Lemonade', description: 'A refreshing citrus drink.', sku: 'LEMON', price: 3.50, currency: 'USD', inventory: 7 },
      { categoryId: beveragesCategory.id, name: 'Smoothie', description: 'A healthy fruit drink.', sku: 'SMOOTH', price: 6.75, currency: 'USD', inventory: 3 },
      { categoryId: beveragesCategory.id, name: 'Soda', description: 'A fizzy and sweet drink.', sku: 'SODA', price: 2.99, currency: 'USD', inventory: 12 },
      { categoryId: beveragesCategory.id, name: 'Hot Chocolate', description: 'A warm and sweet drink.', sku: 'HOTCHOC', price: 4.50, currency: 'USD', inventory: 8 },
      { categoryId: beveragesCategory.id, name: 'Iced Tea', description: 'A cool and refreshing drink.', sku: 'ICETEA', price: 3.99, currency: 'USD', inventory: 4 },
      { categoryId: beveragesCategory.id, name: 'Milkshake', description: 'A creamy and thick drink.', sku: 'MILKSHAKE', price: 5.50, currency: 'USD', inventory: 6 },
      { categoryId: beveragesCategory.id, name: 'Water', description: 'A pure and essential drink.', sku: 'WATER', price: 1.00, currency: 'USD', inventory: 15 },
      { categoryId: beveragesCategory.id, name: 'Orange Juice', description: 'A fresh and tangy drink.', sku: 'OJ', price: 4.25, currency: 'USD', inventory: 9 }
    ]);

    await ProductModel.query().insertGraph([
      { categoryId: snacksCategory.id, name: 'Chips', description: 'Crispy and salty snack.', sku: 'CHIPS', price: 2.99, currency: 'USD', inventory: 11 },
      { categoryId: snacksCategory.id, name: 'Chocolate Bar', description: 'Sweet and rich chocolate.', sku: 'CHOCBAR', price: 1.99, currency: 'USD', inventory: 7 },
      { categoryId: snacksCategory.id, name: 'Pretzels', description: 'Crunchy and salty pretzels.', sku: 'PRETZEL', price: 3.49, currency: 'USD', inventory: 5 },
      { categoryId: snacksCategory.id, name: 'Granola Bar', description: 'Healthy and nutritious snack.', sku: 'GRANOLA', price: 1.49, currency: 'USD', inventory: 8 },
      { categoryId: snacksCategory.id, name: 'Popcorn', description: 'Light and airy snack.', sku: 'POPCORN', price: 2.25, currency: 'USD', inventory: 6 },
      { categoryId: snacksCategory.id, name: 'Gummy Bears', description: 'Chewy and fruity candies.', sku: 'GUMMY', price: 2.75, currency: 'USD', inventory: 4 },
      { categoryId: snacksCategory.id, name: 'Trail Mix', description: 'A mix of nuts and dried fruits.', sku: 'TRAIL', price: 4.99, currency: 'USD', inventory: 3 },
      { categoryId: snacksCategory.id, name: 'Cookies', description: 'Sweet and crunchy cookies.', sku: 'COOKIE', price: 3.99, currency: 'USD', inventory: 9 },
      { categoryId: snacksCategory.id, name: 'Beef Jerky', description: 'Savory and chewy meat snack.', sku: 'JERKY', price: 5.99, currency: 'USD', inventory: 2 },
      { categoryId: snacksCategory.id, name: 'Fruit Snacks', description: 'Sweet and fruity snacks.', sku: 'FRUITSNACK', price: 2.49, currency: 'USD', inventory: 10 }
    ]);

    await ProductModel.query().insertGraph([
      { categoryId: bakeryCategory.id, name: 'Bread', description: 'Freshly baked bread.', sku: 'BREAD', price: 3.00, currency: 'USD', inventory: 14 },
      { categoryId: bakeryCategory.id, name: 'Croissant', description: 'Buttery and flaky croissant.', sku: 'CROISSANT', price: 2.50, currency: 'USD', inventory: 12 },
      { categoryId: bakeryCategory.id, name: 'Muffin', description: 'Soft and sweet muffin.', sku: 'MUFFIN', price: 1.75, currency: 'USD', inventory: 9 },
      { categoryId: bakeryCategory.id, name: 'Bagel', description: 'Chewy and delicious bagel.', sku: 'BAGEL', price: 2.00, currency: 'USD', inventory: 8 },
      { categoryId: bakeryCategory.id, name: 'Cake', description: 'Decadent and moist cake.', sku: 'CAKE', price: 15.00, currency: 'USD', inventory: 5 },
      { categoryId: bakeryCategory.id, name: 'Cookie', description: 'Sweet and crunchy cookie.', sku: 'COOKIE', price: 1.50, currency: 'USD', inventory: 7 },
      { categoryId: bakeryCategory.id, name: 'Doughnut', description: 'Sweet and fluffy doughnut.', sku: 'DOUGHNUT', price: 1.25, currency: 'USD', inventory: 11 },
      { categoryId: bakeryCategory.id, name: 'Brownie', description: 'Rich and chocolaty brownie.', sku: 'BROWNIE', price: 2.25, currency: 'USD', inventory: 10 },
      { categoryId: bakeryCategory.id, name: 'Puff Pastry', description: 'Light and flaky puff pastry.', sku: 'PUFFPASTRY', price: 3.75, currency: 'USD', inventory: 6 },
      { categoryId: bakeryCategory.id, name: 'Scone', description: 'Soft and crumbly scone.', sku: 'SCONE', price: 2.50, currency: 'USD', inventory: 4 }
    ]);

    const products = await ProductModel.query().insertGraph([
      { categoryId: personalCareCategory.id, name: 'Shampoo', description: 'Cleans and nourishes hair.', sku: 'SHAMPOO', price: 6.99, currency: 'USD', inventory: 7 },
      { categoryId: personalCareCategory.id, name: 'Conditioner', description: 'Smoothens and softens hair.', sku: 'CONDITIONER', price: 6.99, currency: 'USD', inventory: 6 },
      { categoryId: personalCareCategory.id, name: 'Toothpaste', description: 'Whitens and strengthens teeth.', sku: 'TOOTHPASTE', price: 3.49, currency: 'USD', inventory: 8 },
      { categoryId: personalCareCategory.id, name: 'Body Lotion', description: 'Moisturizes and hydrates skin.', sku: 'LOTION', price: 7.99, currency: 'USD', inventory: 10 },
      { categoryId: personalCareCategory.id, name: 'Soap', description: 'Cleanses and refreshes skin.', sku: 'SOAP', price: 1.99, currency: 'USD', inventory: 12 },
      { categoryId: personalCareCategory.id, name: 'Deodorant', description: 'Keeps you fresh all day.', sku: 'DEODORANT', price: 4.99, currency: 'USD', inventory: 4 },
      { categoryId: personalCareCategory.id, name: 'Face Wash', description: 'Cleanses and rejuvenates skin.', sku: 'FACEWASH', price: 5.49, currency: 'USD', inventory: 5 },
      { categoryId: personalCareCategory.id, name: 'Hand Sanitizer', description: 'Kills 99.9% of germs.', sku: 'SANITIZER', price: 2.99, currency: 'USD', inventory: 9 },
      { categoryId: personalCareCategory.id, name: 'Shaving Cream', description: 'Smooth shaving experience.', sku: 'SHAVECRM', price: 3.99, currency: 'USD', inventory: 2 },
      { categoryId: personalCareCategory.id, name: 'Sunscreen', description: 'Protects skin from UV rays.', sku: 'SUNSCREEN', price: 8.99, currency: 'USD', inventory: 3 }
    ]);

    const cart = await CartModel.query().insert({ customerEmail: "test@mail.com" });
    const lineItem1 = await LineItemModel.query().insert({ cartId: cart.id, productId: products[0].id, quantity: 3, unitPrice: products[0].price, totalPrice: 3 * products[0].price });
    const lineItem2 = await LineItemModel.query().insert({ cartId: cart.id, productId: products[1].id, quantity: 4, unitPrice: products[1].price, totalPrice: 4 * products[1].price });

    await ProductModel.query().patch({
      reserved: (products[0]?.reserved || 0) + 3,
    }).where({ id: products[0].id });

    await ProductModel.query().patch({
      reserved: (products[1]?.reserved || 0) + 4,
    }).where({ id: products[1].id });

    const totalPrice = [lineItem1, lineItem2].reduce((partialSum: number, lineItem: LineItemModel) => partialSum + lineItem.totalPrice, 0);
    await CartModel.query().findById(cart.id).patch({ totalPrice });

    [1, 2, 3, 4, 5].forEach(async (i) => {
      await DiscountCodeModel.query().insert({
        code: `CODE${i}`,
        amount: i * 5,
        discountType: ['fixed', 'percentage'][Math.floor((Math.random()*2))],
        expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30).toISOString(),
        usageLimit: i * 4,
      });
    });
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    await knex.destroy();
  }
}
