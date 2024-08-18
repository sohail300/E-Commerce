import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      email?: string;
    } & DefaultSession["user"];
  }

  interface User {
    _id?: string;
    email?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    email?: string;
  }
}
