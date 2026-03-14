import { tv } from "tailwind-variants";

export const walletCardList = tv({
  slots: {
    container: "w-full",
    inner:     "flex gap-4",
  }
});

export const styles = walletCardList();