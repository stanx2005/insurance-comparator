import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // For now, return an empty array to prevent build errors
    // In production, you would fetch the RSS feed here
    return NextResponse.json([])
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    return NextResponse.json([])
  }
} 