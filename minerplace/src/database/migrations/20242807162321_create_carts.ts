import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"').createTable('carts', (t) => {
    t.uuid("id", { primaryKey: true }).defaultTo(knex.raw("uuid_generate_v4()"));
    t.string('customerEmail');
    t.float('totalPrice').notNullable().defaultTo(0);

    t.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('carts');
}
