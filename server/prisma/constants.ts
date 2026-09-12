export const Role = {
  OWNER: "owner",
  MANAGER: "manager",
  STAFF: "staff",
} as const;

export type RoleType = (typeof Role)[keyof typeof Role];
