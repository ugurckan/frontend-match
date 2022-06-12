export const BG_COLORS = [
  "#a855f7",
  "#ef4444",
  "#eab308",
  "#6b7280",
  "#3b82f6",
];

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const bgName = (index: number): string => {
  switch (index) {
    case index % 2:
      return "bg-purple-500";
    case index % 3:
      return "bg-red-500";
    case index % 4:
      return "bg-yellow-500";
    case index % 5:
      return "bg-gray-500";
    default:
      return "bg-blue-500";
  }
};
