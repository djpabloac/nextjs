import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

                if (user) {
                    return user
                } else {
                    return null
                    // You can also Reject this callback with an Error or with a URL:
                    // throw new Error('error message') // Redirect to error page
                    // throw '/path/to/redirect'        // Redirect to a URL
                }
            }
        })
    ],
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        encryption: true,
        secret: process.env.SECRET
    },
    pages: {
        signIn: '/auth/credentials-signin',
      }
})
