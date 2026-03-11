import { tv } from "tailwind-variants"

export const WelcomeSection = tv({
    slots:{
         container: 'flex flex-col justify-center h-[88px]',
          title:
    'text-[32px] font-semibold leading-[1.2] text-white',
  subtitle:
    'mt-2 text-[13px] font-normal text-white/70',

    }
});

export const styles = WelcomeSection();