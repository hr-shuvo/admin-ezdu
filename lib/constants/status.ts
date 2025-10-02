const entityStatus = {
    Active: 0,
    Inactive: -1,
    Deleted: -404,
} as const;

type EntityStatus = typeof entityStatus[keyof typeof entityStatus];

export const StatusMap: Record<EntityStatus, { text: string; color: string }> = {
    [0]: {text: "Active", color: "bg-green-500/40"},
    [-1]: {text: "Inactive", color: "bg-yellow-500/40"},
    [-404]: {text: "Deleted", color: "bg-red-500/40"},
};