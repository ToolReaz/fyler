import Providers from "next-auth/providers";
import { compareSync } from "bcryptjs";
import dbConnect from "../../../db/connection";
import NextAuth from "next-auth";

const options = {
  providers: [
    Providers.Credentials({
      name: "Fyler account",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      session: { jwt: true },
      jwt: {
        secret: "foo",
      },

      pages: {
        signIn: "/login",
      },

      authorize: async (credentials) => {
        const { username, password } = credentials;

        // Check empty credentials
        if (!username || !password) return Promise.resolve(null);

        // Get DB connectino instance
        const db = await dbConnect();

        try {
          // Find user
          const query = await db.models.User.findOne({
            where: { username },
          });

          const user = query.dataValues;

          if (user && !compareSync(password, user.password)) {
            return Promise.resolve(null);
          }

          delete user.password;

          return Promise.resolve(user);
        } catch (e) {
          console.warn(
            "Someone tried to login with not existing username: " + username
          );
          return Promise.resolve(null);
        }
      },
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
