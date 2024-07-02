import { JSONSchema, ModelObject, RelationMappings } from 'objection';
import { BaseModel } from './BaseModel.js';
import { LineItemModel } from './LineItemModel.js';

class CartModel extends BaseModel {
  static tableName = 'carts';

  id!: string;
  customerEmail?: string;
  totalPrice?: number;

  lineItems?: LineItemModel[];

  static get relationMappings(): RelationMappings {
    return {
      lineItems: {
        relation: BaseModel.HasManyRelation,
        modelClass: LineItemModel,
        join: {
          from: 'carts.id',
          to: 'line_items.cartId',
        },
      },
    };
  }

  static jsonSchema: JSONSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      customerEmail: { type: 'string' },
      totalPrice: { type: 'number' },
    },
  };
}

export { CartModel };

export type CartSchema = ModelObject<CartModel>;
