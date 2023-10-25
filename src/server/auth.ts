import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { getSession, useSession } from "next-auth/react";
import { Session } from "inspector";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    /*async signIn({user, account, profile, email, credentials}){
      const isAllowedToSignIn = true
      if(isAllowedToSignIn){
        return true
      }
      else{
        return false
      }
    },*/
    
    session({session, user}) {
      strategy: "jwt"
      if(session.user) {
        session.user.id = user.id
      }
      return session;
    },
    /*session: ({ session, user }) => ({
      strategy: "jwt",
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
      
    }),*/
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      name: "discord",
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      name: "google",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username"},
        password: { label: "Password", type: "password"}
      },
      
      //Auth can differentiate between correct and incorrect inputs, but does not allow user to actually login
      //May have to connect to database to pull session data, do this with sqlite before implementation in main database
      async authorize(credentials, req) {
        //default user need to connect to databasae
        const user = {id: "1", name: "CoopDaScoop", email: "n/a", password: "Coopy"}

        if (user.name == credentials?.username && user.password == credentials?.password) {
          return user
        } else{
          return null
        }

      }

    })
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh__expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
