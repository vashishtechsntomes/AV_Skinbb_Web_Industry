import type { Permission } from "@/types/user.type";

export function hasPermission(
  permissions: Permission[],
  page: string,
  action: string,
) {
  return permissions.some(
    (perm) => perm.page === page && perm.action.includes(action),
  );
}
