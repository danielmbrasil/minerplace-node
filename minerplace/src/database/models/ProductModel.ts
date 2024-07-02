import { JSONSchema, ModelObject, RelationMappings } from 'objection';
import { BaseModel } from './BaseModel.js';
import { CategorySchema } from './CategoryModel.js';
import { LineItemModel } from './LineItemModel.js';

class ProductModel extends BaseModel {
  static tableName = 'products';

  id!: number;
  name!: string;
  description?: string;
  sku!: string;
  price!: number;
  currency!: string;
  inventory!: number;
  reserved?: number;
  sold?: number;

  categoryId!: number;
  category!: CategorySchema;

  lineItems?: LineItemModel[];

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['name', 'sku', 'price', 'currency', 'inventory', 'categoryId'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      description: { type: 'string' },
      sku: { type: 'string' },
      price: { type: 'number' },
      currency: { type: 'string' },
      inventory: { type: 'integer' },
      reserved: { type: 'integer' },
      sold: { type: 'integer' },
      categoryId: { type: 'integer' },
    },
  };
}

export { ProductModel };

export type ProductSchema = ModelObject<ProductModel>;
