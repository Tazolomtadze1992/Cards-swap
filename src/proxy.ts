import { timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const realm = "Digital Child Safety prototype";

function matches(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  return valueBuffer.length === expectedBuffer.length && timingSafeEqual(valueBuffer, expectedBuffer);
}

function requestCredentials(message = "Authentication required") {
  return new NextResponse(message, {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": `Basic realm="${realm}", charset="UTF-8"`,
    },
  });
}

export function proxy(request: NextRequest) {
  const expectedPassword = process.env.PROTOTYPE_PASSWORD;

  if (!expectedPassword) {
    if (process.env.NODE_ENV === "development") return NextResponse.next();
    return requestCredentials("Prototype access has not been configured");
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) return requestCredentials();

  try {
    const decoded = Buffer.from(authorization.slice(6), "base64").toString("utf8");
    const separator = decoded.indexOf(":");
    const suppliedUsername = separator === -1 ? decoded : decoded.slice(0, separator);
    const suppliedPassword = separator === -1 ? "" : decoded.slice(separator + 1);
    const expectedUsername = process.env.PROTOTYPE_USERNAME ?? "developer";

    if (matches(suppliedUsername, expectedUsername) && matches(suppliedPassword, expectedPassword)) {
      return NextResponse.next();
    }
  } catch {
    // A malformed authorization header receives the same challenge as bad credentials.
  }

  return requestCredentials();
}

export const config = {
  matcher: [
    "/prototypes/homepage/:path*",
    "/prototypes/faq/:path*",
    "/prototypes/glossary/:path*",
    "/prototypes/resources/:path*",
    "/prototypes/articles/:path*",
  ],
};
