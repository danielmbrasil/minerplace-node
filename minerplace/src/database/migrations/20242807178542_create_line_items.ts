import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('line_items', (t) => {
    t.increments('id');
    t.integer('quantity').notNullable();
    t.float('unitPrice').notNullable();
    t.float('totalPrice').notNullable();

    t.integer('productId').unsigned().notNullable().references('id').inTable('products');
    t.uuid('cartId').notNullable().references('id').inTable('carts');

    t.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('line_items');
}
