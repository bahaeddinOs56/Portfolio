import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is a basic example. In a real application, you should use proper authentication.
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Admin" }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

