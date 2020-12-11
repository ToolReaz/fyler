const server = require("../src/main");
let linkId;

const redirectionLinkMockup = {
  type: "redirection",
  url: "https://google.com/",
};

describe("Link module tests", () => {
  describe("Server test", () => {
    afterAll(async () => {
      await server.close();
    });

    test("Create redirection link: POST /l", async (done) => {
      const response = await server.inject({
        method: "POST",
        url: "/l",
        body: redirectionLinkMockup,
      });

      linkId = response.payload;

      expect(response.statusCode).toBe(200);
      expect(response.payload).toBeDefined();

      done();
    });

    test("Redirection link: GET /l/:id", async (done) => {
      const response = await server.inject({
        method: "GET",
        url: "/l/" + linkId,
      });

      expect(response.statusCode).toBe(300);

      done();
    });

    test("Image link: GET /l/:id", async (done) => {
      const response = await server.inject({
        method: "GET",
        url: "/l/" + linkId,
      });

      expect(response.statusCode).toBe(200);
      expect(response.payload).toBe("Hello World !");

      done();
    });
  });
});
