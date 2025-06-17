export type ModuleType = "brand" | "survey" | "product";

export interface StatusStyle {
  label: string;
  textColor: string;
  bgColor: string;
}

export const STATUS_MAP: Record<ModuleType, Record<string, StatusStyle>> = {
  brand: {
    active: {
      label: "Active",
      textColor: "text-blue-700",
      bgColor: "bg-blue-100",
    },
    inactive: {
      label: "Inactive",
      textColor: "text-gray-700",
      bgColor: "bg-gray-200",
    },
    closed: {
      label: "Closed",
      textColor: "text-red-700",
      bgColor: "bg-red-100",
    },
    suspended: {
      label: "Suspended",
      textColor: "text-orange-700",
      bgColor: "bg-orange-100",
    },
    pending_approval: {
      label: "Pending Approval",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-100",
    },
  },

  survey: {
    draft: {
      label: "Draft",
      textColor: "text-gray-700",
      bgColor: "bg-gray-100",
    },
    running: {
      label: "Running",
      textColor: "text-green-700",
      bgColor: "bg-green-100",
    },
    completed: {
      label: "Completed",
      textColor: "text-indigo-700",
      bgColor: "bg-indigo-100",
    },
    paused: {
      label: "Paused",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-100",
    },
    cancelled: {
      label: "Cancelled",
      textColor: "text-red-700",
      bgColor: "bg-red-100",
    },
    scheduled: {
      label: "Scheduled",
      textColor: "text-blue-700",
      bgColor: "bg-blue-100",
    },
  },

  product: {
    "in-stock": {
      label: "In Stock",
      textColor: "text-emerald-700",
      bgColor: "bg-emerald-100",
    },
    "low-stock": {
      label: "Low Stock",
      textColor: "text-yellow-700",
      bgColor: "bg-yellow-100",
    },
    "out-of-stock": {
      label: "Out of Stock",
      textColor: "text-orange-700",
      bgColor: "bg-orange-100",
    },
    discontinued: {
      label: "Discontinued",
      textColor: "text-red-700",
      bgColor: "bg-red-100",
    },
    upcoming: {
      label: "Upcoming",
      textColor: "text-blue-700",
      bgColor: "bg-blue-100",
    },
    hidden: {
      label: "Hidden",
      textColor: "text-gray-600",
      bgColor: "bg-gray-100",
    },
  },
};
