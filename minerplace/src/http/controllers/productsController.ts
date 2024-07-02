import { handler } from '../../_lib/http/handler.js';
import { ProductModel } from '../../database/models/ProductModel.js';

const index = handler<{ Querystring: { sku: string, topSold: boolean, limit: number } }>(async (request, reply) => {
  let products = [];

  if (request.query.sku) {
    products = await ProductModel.query().where({ sku: request.query.sku });
  } else if (request.query.topSold) {
    products = await ProductModel.query().orderBy('sold', 'desc').limit(request.query.limit || 10);
  } else {
    products = await ProductModel.query();
  }

  reply.send(products);
});

const show = handler<{ Params: { id: number } }>(async (request, reply) => {
  const product = await ProductModel.query().findById(request.params.id);

  if (product) {
    reply.send(product);
  } else {
    reply.status(404).send();
  }
});

export { index, show };
