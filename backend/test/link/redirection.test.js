const server = require("../../src/main");
let linkId;

describe("Link module tests", () => {
  describe("Server test", () => {
    afterAll(async () => {
      await server.stop();
    });

    test("Create redirection link: POST /l", async (done) => {
      const redirectionLinkMockup = {
        type: "redirection",
        target: "https://google.com/",
      };

      const response = await server.inject({
        method: "POST",
        url: "/l",
        body: redirectionLinkMockup,
      });

      linkId = response.payload;

      expect(response.statusCode).toBe(200);
      expect(response.payload.status).toBe("success");
      expect(response.payload.url).toBeDefined();

      done();
    });

    test("Redirection link: GET /l/:id", async (done) => {
      const response = await server.inject({
        method: "GET",
        url: "/l/" + linkId,
      });

      expect(response.statusCode).toBe(200);

      done();
    });
  });
});
