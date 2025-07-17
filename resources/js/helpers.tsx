import { User } from "./types";

export function can(user: any, permission: string) {
  const roles = user?.roles ?? [];
  const permissions = user?.permissions ?? [];
  return roles.includes(permission) || permissions.includes(permission);
}

export function hasRole(user: User, role: string): boolean {
  return user.roles.includes(role);
}
