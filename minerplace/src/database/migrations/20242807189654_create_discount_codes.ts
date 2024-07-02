import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('discount_codes', (t) => {
    t.increments('id');
    t.string('code').notNullable();
    t.unique('code');
    t.float('amount').notNullable();
    t.string('discountType').notNullable().defaultTo('fixed');
    t.dateTime('expiresAt');
    t.integer('usageLimit');
    t.integer('timesUsed').notNullable().defaultTo(0);

    t.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('discount_codes');
}
