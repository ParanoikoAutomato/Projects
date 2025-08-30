export enum UserRoles {
  Admin = "admin",
  Simple = "simple",
}

export enum TaskStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum TaskHistoryActions {
  CREATE = "create",
  UPDATE = "update",
  ACCEPT = "accept",
  COMPLETE = "complete",
  APPROVE = "approve",
  REJECT = "reject",
  COMMENT = "comment",
}

export enum TaskCriticality {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}
