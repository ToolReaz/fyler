"use-strict";

const server = require("../src/main");

describe("Server test", () => {
  afterAll(async () => {
    await server.close();
  });

  test("Respond on route GET /", async (done) => {
    const response = await server.inject({
      method: "GET",
      url: "/",
    });

    expect(response.statusCode).toBe(200);
    expect(response.payload).toBe("Hello World !");

    done();
  });
});
