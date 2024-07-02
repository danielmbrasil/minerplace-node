import Fastify from "fastify";
import cors from "@fastify/cors";
import { v4 as uuid } from "uuid";

const { ADDRESS = "localhost", PORT = "3000" } = process.env;

const fastify = Fastify();

fastify.register(cors);

fastify.post("/process-payment/:orderId", async (req, res) => {
  const paymentResult = await processPayment(req?.params?.orderId);

  if (paymentResult.success) {
    res.status(201).send({
      status: 201,
      message: "Payment processed succesfully",
      order_id: paymentResult.orderId,
      transaction_id: paymentResult.transactionId,
    });
  } else {
    res.status(paymentResult.errorCode).send({
      status: paymentResult.errorCode,
      message: `Payment rejected: ${paymentResult.errorMessage}`,
    });
  }
});

fastify.listen({ host: ADDRESS, port: parseInt(PORT, 10) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

async function processPayment(orderId) {
  await randomDelay();

  if (shouldFail()) {
    return {
      success: false,
      errorCode: 503,
      errorMessage: "Service unavailable",
    };
  }

  if (shouldProcessPayment() && Boolean(orderId)) {
    return {
      success: true,
      orderId: orderId,
      transactionId: uuid(),
    };
  }

  if (Boolean(orderId)) {
    return {
      success: false,
      errorCode: 402,
      errorMessage: "Insufficient funds",
    };
  }

  return {
    success: false,
    errorCode: 400,
    errorMessage: "Bad request",
  };
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = () => wait(500 + Math.random() * 1000);

const shouldFail = () => {
  if (Math.random() > 0.9) {
    return true;
  }

  return false;
};

const shouldProcessPayment = () => {
  if (Math.random() > 0.3) {
    return true;
  }

  return false;
};
