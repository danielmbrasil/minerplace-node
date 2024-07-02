import {
  it,
  expect,
  describe,
  beforeEach,
  afterEach,
  afterAll,
  beforeAll,
} from "@jest/globals";
import request from "supertest";
import { makeServer } from "../server.js";
import { ProductModel } from "../../database/models/ProductModel.js";
import { CategoryModel } from "../../database/models/CategoryModel.js";
import { makeDatabase } from "../../database/database.js";

const database = makeDatabase();
const fastify = makeServer();

beforeAll(async () => {
  await fastify.ready();
  await database.connect();
});

beforeEach(async () => {
  const category = await CategoryModel.query().insert({ name: 'Beverages' });
  await ProductModel.query().insertGraph([
    { id: 1, categoryId: category.id, name: 'Tea', sku: 'TEA', price: 4.99, currency: 'USD', inventory: 5, sold: 2 },
    { categoryId: category.id, name: 'Coffee', sku: 'COFFEE', price: 5.99, currency: 'USD', inventory: 10, sold: 100 },
  ]);
});

afterEach(async () => {
  await ProductModel.query().delete();
  await CategoryModel.query().delete();
});

afterAll(async () => {
  await database.disconnect();
  await fastify.close();
});

describe("index", () => {
  it("should response the products", async () => {
    const response = await request(fastify.server).get("/products");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toEqual(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Tea",
        }),
        expect.objectContaining({
          name: "Coffee",
        }),
      ]),
    );
  });

  describe("when filtering by sku", () => {
    it("should response the products quering by sku", async () => {
      const response = await request(fastify.server).get("/products").query({ sku: "COFFEE" });

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toEqual(1);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Coffee",
          }),
        ]),
      );
    });
  });

  describe("when filtering by top sold", () => {
    it("should response the products ordering by top sold", async () => {
      const response = await request(fastify.server).get("/products").query({ topSold: true, limit: 1 });

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toEqual(1);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: "Coffee",
          }),
        ]),
      );
    });
  });
});

describe("show", () => {
  it("should response the product", async () => {
    const response = await request(fastify.server).get("/products/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: "Tea",
      }),
    );
  });

  describe("when the product does not exist", () => {
    it("it should response 404", async () => {
      const response = await request(fastify.server).get("/products/999999");

      expect(response.statusCode).toBe(404);
    });
  });
});
