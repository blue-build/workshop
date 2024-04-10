<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "$lib/ui/utils.js";
    import { tv } from "tailwind-variants";

    type $$Props = HTMLAttributes<HTMLDivElement> | { variant: "normal" | "elevated" };

    let className: $$Props["class"] = undefined;
    export { className as class };

    export let variant: "normal" | "elevated" = "normal";

    const headerVariants = tv({
        base: "flex flex-col space-y-1.5",
        variants: {
            variant: {
                normal: "px-6 pt-4 pb-9",
                elevated: "bg-card border-2 p-5 -translate-x-8 -translate-y-10 shadow-subtle"
            }
        },
        defaultVariants: {
            variant: "normal"
        }
    });
</script>

<div class={cn(headerVariants({ variant, className }), className)} {...$$restProps}>
    <slot />
</div>
