export type Transaction = {
  id: number;
  company: string;
  category: string;
  type: string;
  date: string;
  amount: string;
  status: "completed" | "incomplete";
  logo: string;
};

export const transactions: Transaction[] = [
  {
    id: 1,
    company: "Figma",
    category: "Application",
    type: "Subscription",
    date: "July 11.07.2023",
    amount: "$624.00.90",
    status: "completed",
    logo: "/icons/figma.svg",
  },
  {
    id: 2,
    company: "Spotify",
    category: "Entertainment",
    type: "Receive",
    date: "July 12.07.2023",
    amount: "$624.00.90",
    status: "incomplete",
    logo: "/icons/spotify.svg",
  },
];
