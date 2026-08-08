import { getServerSession, type Session } from "next-auth";
import { authOptions } from "@/lib/auth";

export class AuthError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * Ensures the current request has an authenticated session.
 * Use at the start of Server Actions that require a logged-in user.
 */
export async function requireAuth(): Promise<Session> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new AuthError("Unauthorized");
  }

  return session;
}

/**
 * Ensures the current request has an authenticated ADMIN session.
 * Use at the start of admin-only Server Actions.
 */
export async function requireAdmin(): Promise<Session> {
  const session = await requireAuth();
  const role = (session.user as { role?: string }).role;

  if (role !== "ADMIN") {
    throw new AuthError("Forbidden");
  }

  return session;
}

/**
 * Higher-order wrapper that injects the authenticated session
 * as the first argument of a Server Action.
 */
export function withAuth<TArgs extends unknown[], TResult>(
  action: (session: Session, ...args: TArgs) => Promise<TResult>
) {
  return async (...args: TArgs): Promise<TResult> => {
    const session = await requireAuth();
    return action(session, ...args);
  };
}

/**
 * Higher-order wrapper that injects an authenticated ADMIN session
 * as the first argument of a Server Action.
 */
export function withAdmin<TArgs extends unknown[], TResult>(
  action: (session: Session, ...args: TArgs) => Promise<TResult>
) {
  return async (...args: TArgs): Promise<TResult> => {
    const session = await requireAdmin();
    return action(session, ...args);
  };
}
