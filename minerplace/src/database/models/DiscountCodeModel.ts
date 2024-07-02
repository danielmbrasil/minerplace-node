import { JSONSchema, ModelObject, RelationMappings } from 'objection';
import { BaseModel } from './BaseModel.js';

class DiscountCodeModel extends BaseModel {
  static tableName = 'discount_codes';

  id!: number;
  code!: string;
  amount!: number;
  discountType!: string;
  expiresAt?: string;
  usageLimit?: number;
  timesUsed?: number;

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['code', 'amount', 'discountType'],
    properties: {
      id: { type: 'integer' },
      code: { type: 'string' },
      amount: { type: 'number' },
      discountType: { type: 'string' },
      expiresAt: { type: 'string', format: 'date-time' },
      usageLimit: { type: 'integer' },
      timesUsed: { type: 'integer' },
    },
  };
}

export { DiscountCodeModel };

export type DiscountCodeSchema = ModelObject<DiscountCodeModel>;
