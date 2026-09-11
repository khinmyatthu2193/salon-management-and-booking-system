export const Role = {
  OWNER: "OWNER",
  MANAGER: "MANAGER",
  STAFF: "STAFF",
} as const;

export type RoleType = (typeof Role)[keyof typeof Role];
