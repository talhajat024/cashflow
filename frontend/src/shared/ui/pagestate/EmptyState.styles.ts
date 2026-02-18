import { tv } from "tailwind-variants";

export const wrapper=tv ({
    base :`
    flex
    flex-col
    items-center
    justify-center
    text-center
    py-16
    px-6
    rounded-xl
    border
    border-gray-200
    bg-white`

});

export const title=tv({
    base :`
    text-lg
    font-semibold
    text-gray-900
    `
});

export const description=tv({
    base :`
    mt-2
    text-sm
    text-gray-500`
}); 


export const actionButton=tv({
    base:`
     mt-6
    inline-flex
    items-center
    justify-center
    rounded-lg
    bg-blue-600
    px-4
    py-2
    text-sm
    font-medium
    text-white
    transition
    hover:bg-blue-700`
});


