import { JSONSchema, ModelObject, RelationMappings } from 'objection';
import { BaseModel } from './BaseModel.js';
import { ProductModel } from './ProductModel.js';

class CategoryModel extends BaseModel {
  static tableName = 'categories';

  id!: number;
  name!: string;

  static get relationMappings(): RelationMappings {
    return {
      products: {
        relation: BaseModel.HasManyRelation,
        modelClass: ProductModel,
        join: {
          from: 'categories.id',
          to: 'products.categoryId',
        },
      },
    };
  }

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
    },
  };
}

export { CategoryModel };

export type CategorySchema = ModelObject<CategoryModel>;
