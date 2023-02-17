import axios, { AxiosError } from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// 请确保会话到期日期始终低于您的访问令牌到期日期。
export default NextAuth({
  debug: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7days
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials == null) return null;
        try {
          const {
            data: { user, jwt },
          } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
            {
              identifier: credentials.email,
              password: credentials.password,
            }
          );
          return { ...user, jwt };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<{
              error: { message: string };
            }>;
            throw new Error(serverError?.response?.data.error.message);
          }
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      // 首次登入時寫入用戶id和jwt
      if (user) {
        token.id = user.id;
        token.jwt = user.jwt;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      // 將token的用戶id和jwt寫入服務端session
      session.id = token.id;
      session.jwt = token.jwt;
      return Promise.resolve(session);
    },
  },
});
