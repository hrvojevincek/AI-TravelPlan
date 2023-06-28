import { NextResponse } from 'next/server'
import client from './GPTClient'

export async function GET(request: any) {
  const response = await client.predict('input')
  return NextResponse.json(response)
}
