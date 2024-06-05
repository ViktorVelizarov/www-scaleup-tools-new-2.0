// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import prisma from "../../../../lib/prisma";

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       const dbUser = await prisma.users.findFirst({
//          where: {
//            email: user.email,
//          },
//       });
//       if (dbUser) {
//         return dbUser;
//       } else {
//         return false;
//       }
//     },
//     async jwt({ token, profile }) {
//       if (profile && profile.email) {
//        const dbUser = await prisma.users.findFirst({
//          where: {
//            email: profile.email,
//          },
//        });
//        if (dbUser) {
//          token.role = dbUser.role;
//        }
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.role = token.role;
//       return session;
//     },
//   },
// });