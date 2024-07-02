import { handler } from '../../_lib/http/handler.js';
import { CategoryModel } from '../../database/models/CategoryModel.js';

const index = handler(async (_request, reply) => {
  const categories = await CategoryModel.query().withGraphJoined('products');

  reply.send(categories);
});

const show = handler<{ Params: { id: number } }>(async (request, reply) => {
  const category = await CategoryModel.query().findById(request.params.id).withGraphJoined('products');

  if (category) {
    reply.send(category);
  } else {
    reply.status(404).send();
  }
});

export { index, show };
