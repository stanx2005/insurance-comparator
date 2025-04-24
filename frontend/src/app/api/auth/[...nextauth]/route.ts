import NextAuth, { DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { JWT } from 'next-auth/jwt'
import { Session } from 'next-auth'

declare module 'next-auth' {
  interface User {
    role?: string
  }
  
  interface Session {
    user: {
      role?: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
  }
}

const checkEnvironmentVariables = () => {
  const requiredVars = ['NEXTAUTH_SECRET', 'ADMIN_EMAIL', 'ADMIN_PASSWORD']
  const missingVars = requiredVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars)
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
  }
}

checkEnvironmentVariables()

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          console.log('Starting authorization process')
          
          if (!credentials?.email || !credentials?.password) {
            console.error('Missing credentials in request')
            return null
          }

          const adminEmail = process.env.ADMIN_EMAIL
          const adminPassword = process.env.ADMIN_PASSWORD

          if (!adminEmail || !adminPassword) {
            console.error('Admin credentials not configured in environment')
            return null
          }

          console.log('Checking email match:', {
            provided: credentials.email,
            expected: adminEmail
          })

          if (credentials.email !== adminEmail) {
            console.error('Email mismatch')
            return null
          }

          console.log('Comparing passwords')
          const isValid = await compare(credentials.password, adminPassword)
          console.log('Password validation result:', isValid)
          
          if (!isValid) {
            console.error('Invalid password')
            return null
          }

          console.log('Authentication successful')
          return {
            id: '1',
            email: credentials.email,
            name: 'Admin',
            role: 'admin'
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback:', { url, baseUrl })
      // Always redirect to dashboard after successful login
      if (url.startsWith('/admin/login')) {
        return `${baseUrl}/admin/dashboard`
      }
      // If the url is a relative URL, prefix it with the base URL
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      } else if (new URL(url).origin === baseUrl) {
        return url
      }
      return baseUrl
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug mode
})

export { handler as GET, handler as POST } 