import plugin from 'fastify-plugin';
import * as CategoriesController from './controllers/categoriesController.js';
import * as ProductsController from './controllers/productsController.js';
import * as CartsController from './controllers/cartsController.js';

const router = plugin(async (server, _opts) => {
  server.get('/categories', CategoriesController.index);
  server.get('/categories/:id', CategoriesController.show);

  server.get('/products', ProductsController.index);
  server.get('/products/:id', ProductsController.show);

  server.get('/carts/:id', CartsController.show);
  server.post('/carts', CartsController.create);
  server.patch('/carts/:id', CartsController.update);
});

export { router };
