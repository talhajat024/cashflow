import { tv } from "tailwind-variants";

export const walletCardList = tv({
  slots: {
    container: "w-full overflow-x-auto scrollbar-hide",
    inner:     "flex gap-4 pb-2",
  }
});

export const styles = walletCardList();