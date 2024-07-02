import { handler } from '../../_lib/http/handler.js';
import { CartModel } from '../../database/models/CartModel.js';
import { LineItemModel } from '../../database/models/LineItemModel.js';
import { ProductModel } from '../../database/models/ProductModel.js';

type Body = {
  userId: number;
  customerEmail: string;
  lineItems: Array<LineItem>;
}

type LineItem = {
  productId: number;
  quantity: number;
}

const show = handler<{ Params: { id: string } }>(async (request, reply) => {
  const cart = await CartModel.query().findById(request.params.id).withGraphJoined('lineItems.product');

  if (cart) {
    reply.send(cart);
  } else {
    reply.status(404).send();
  }
});

const create = handler<{ Body: Body }>(async (request, reply) => {
  try {
    const cart = await CartModel.query().insert({ customerEmail: request.body.customerEmail });

    const lineItems = await Promise.all(request.body.lineItems.map(async (lineItemParams: LineItem) => {
      const product = lineItemParams.productId && await ProductModel.query().findById(lineItemParams.productId);
      if (!product) throw new Error('Product not found');

      const lineItem = await LineItemModel.query().insert({
        quantity: lineItemParams.quantity,
        unitPrice: product.price,
        totalPrice: product.price * lineItemParams.quantity,
        productId: lineItemParams.productId,
        cartId: cart.id,
      });

      await ProductModel.query().patch({
        reserved: (product.reserved || 0) + lineItemParams.quantity,
      }).where({ id: lineItemParams.productId });

      return lineItem;
    }));

    const totalPrice = lineItems.reduce((partialSum: number, lineItem: LineItemModel) => partialSum + lineItem.totalPrice, 0);
    await CartModel.query().findById(cart.id).patch({ totalPrice });

    const newCart = await CartModel.query().findById(cart.id).withGraphJoined('lineItems.product');

    reply.status(201).send(newCart);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
});

const update = handler<{ Params: { id: string }, Body: Body }>(async (request, reply) => {
  try {
    const cart = await CartModel.query().findById(request.params.id);
    if (!cart) return reply.status(404).send();

    await Promise.all(request.body.lineItems.map(async (lineItemParams: LineItem) => {
      if (lineItemParams.productId) {
        const lineItem = await LineItemModel.query().findOne({ cartId: request.params.id, productId: lineItemParams.productId });
        const product = await ProductModel.query().findById(lineItemParams.productId);
        if (!product) throw new Error('Product not found');

        if (lineItem) {
          if (lineItemParams.quantity === 0) {
            await ProductModel.query().patch({
              reserved: (product.reserved || 0) - lineItem.quantity,
            }).where({ id: lineItemParams.productId });

            await LineItemModel.query().delete().where({ cartId: request.params.id, productId: lineItemParams.productId });
          } else {
            await LineItemModel.query().patch({
              quantity: lineItemParams.quantity,
              unitPrice: product.price,
              totalPrice: product.price * lineItemParams.quantity,
            }).where({ cartId: request.params.id, productId: lineItemParams.productId });

            await ProductModel.query().patch({
              reserved: (product.reserved || 0) - (lineItem.quantity - lineItemParams.quantity),
            }).where({ id: lineItemParams.productId });

            return await LineItemModel.query().findOne({ cartId: request.params.id, productId: lineItemParams.productId });
          }
        } else {
          const lineItem = await LineItemModel.query().insert({
            quantity: lineItemParams.quantity,
            unitPrice: product.price,
            totalPrice: product.price * lineItemParams.quantity,
            productId: lineItemParams.productId,
            cartId: request.params.id,
          });

          await ProductModel.query().patch({
            reserved: (product.reserved || 0) + lineItemParams.quantity,
          }).where({ id: lineItemParams.productId });

          return lineItem;
        }
      }
    }));

    const lineItems = await LineItemModel.query().where({ cartId: request.params.id });
    const totalPrice = lineItems.reduce((partialSum: number, lineItem: LineItemModel) => partialSum + lineItem.totalPrice, 0);
    await CartModel.query().findById(request.params.id).patch({ customerEmail: request.body.customerEmail, totalPrice });

    const newCart = await CartModel.query().findById(cart.id).withGraphJoined('lineItems.product');

    reply.send(newCart);
  } catch (error: any) {
    reply.status(400).send({ error: error.message });
  }
});

export { show, create, update };
