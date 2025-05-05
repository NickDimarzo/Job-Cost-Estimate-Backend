import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }
        return { id: user.id, email: user.email, name: user.name, role: user.role }; 
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/SignIn",
  },
  session: {
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
