import { JSONSchema, ModelObject, RelationMappings } from 'objection';
import { BaseModel } from './BaseModel.js';
import { CartSchema } from './CartModel.js';
import { ProductModel, ProductSchema } from './ProductModel.js';

class LineItemModel extends BaseModel {
  static tableName = 'line_items';

  id!: number;
  quantity!: number;
  unitPrice!: number;
  totalPrice!: number;

  productId!: number;
  product!: ProductSchema;

  cartId!: string;
  cart!: CartSchema;

  static get relationMappings(): RelationMappings {
    return {
      product: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ProductModel,
        join: {
          from: 'line_items.productId',
          to: 'products.id',
        },
      },
    };
  }

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['quantity', 'unitPrice', 'totalPrice', 'productId', 'cartId'],
    properties: {
      id: { type: 'integer' },
      quantity: { type: 'integer', minimum: 0 },
      unitPrice: { type: 'number' },
      totalPrice: { type: 'number' },
      productId: { type: 'integer' },
      cartId: { type: 'string' },
    },
  };
}

export { LineItemModel };

export type LineItemSchema = ModelObject<LineItemModel>;
