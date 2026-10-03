import { NextResponse } from 'next/server'
export const runtime = 'edge'
export async function GET() {
  return NextResponse.json({ status: 'ok', app: 'aurora', time: new Date().toISOString() })
}
