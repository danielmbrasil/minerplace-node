import {
  it,
  expect,
  describe,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from "@jest/globals";
import request from "supertest";
import { makeServer } from "../server.js";
import { CategoryModel } from "../../database/models/CategoryModel.js";
import { makeDatabase } from "../../database/database.js";

const database = makeDatabase();
const fastify = makeServer();

beforeAll(async () => {
  await fastify.ready();
  await database.connect();
});

beforeEach(async () => {
  await CategoryModel.query().insertGraph([
    {
      id: 1,
      name: "Beverages",
    },
    {
      name: "Snacks",
    }
  ]);
});

afterEach(async () => {
  await CategoryModel.query().delete();
});

afterAll(async () => {
  await database.disconnect();
  await fastify.close();
});

describe("index", () => {
  it("should response the categories", async () => {
    const response = await request(fastify.server).get("/categories");

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toEqual(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Beverages",
        }),
        expect.objectContaining({
          name: "Snacks",
        }),
      ]),
    );
  });
});

describe("show", () => {
  it("should response the category", async () => {
    const response = await request(fastify.server).get("/categories/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: "Beverages",
      }),
    );
  });

  describe("when the category does not exist", () => {
    it("it should response 404", async () => {
      const response = await request(fastify.server).get("/categories/999999");

      expect(response.statusCode).toBe(404);
    });
  });
});
