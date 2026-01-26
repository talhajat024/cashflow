export type SpendingItem = {
  key: string;
  label: string;
  value: number; // percentage
  color: string;
};

export const spendingData: SpendingItem[] = [
  {
    key: "workspace",
    label: "Workspace",
    value: 46,
    color: "#2563EB",
  },
  {
    key: "salary",
    label: "Employee Salary",
    value: 52,
    color: "#16A34A",
  },
  {
    key: "shopping",
    label: "Shopping",
    value: 24,
    color: "#22D3EE",
  },
];
