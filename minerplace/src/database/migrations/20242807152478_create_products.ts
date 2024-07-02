import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('products', (t) => {
    t.increments('id');
    t.string('name').notNullable();
    t.string('description');
    t.string('sku').notNullable();
    t.float('price').notNullable();
    t.string('currency').notNullable();
    t.integer('inventory').notNullable().defaultTo(0);
    t.integer('reserved').notNullable().defaultTo(0);
    t.integer('sold').notNullable().defaultTo(0);
    t.integer('categoryId').unsigned().notNullable().references('id').inTable('categories');

    t.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('products');
}
