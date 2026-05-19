import { NextRequest, NextResponse } from "next/server"
import { redis } from "./lib/redis"
import { nanoid } from "nanoid"
import { PATH_HEADERS_KEY} from "intl-t/next"
import { withI18nProxy } from "./i18n/navigation"

export const proxy = withI18nProxy(async (req, _ev, response) => {
  const pathname = response.headers.get(PATH_HEADERS_KEY)!

  const roomMatch = pathname.match(/^\/room\/([^/]+)$/)
  if (!roomMatch) return response

  const roomId = roomMatch[1]

  const meta = await redis.hgetall<{ connected: string[]; createdAt: number }>(
    `meta:${roomId}`
  )

  if (!meta) {
    return NextResponse.redirect(new URL("/?error=room_not_found", req.url))
  }

  const existingToken = req.cookies.get("x-auth-token")?.value

  // USER IS ALLOWED TO JOIN ROOM
  if (existingToken && meta.connected.includes(existingToken)) {
    return response
  }

  // USER IS NOT ALLOWED TO JOIN
  if (meta.connected.length >= 2) {
    return NextResponse.redirect(new URL("/?error=room_full", req.url))
  }

  const token = nanoid()

  response.cookies.set("x-auth-token", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })

  await redis.hset(`meta:${roomId}`, {
    connected: [...meta.connected, token],
  })

  return response
})

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
}
