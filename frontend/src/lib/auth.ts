import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from './prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) {
          throw new Error('Invalid credentials')
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) {
          throw new Error('Invalid credentials')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  }
} 