<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "$lib/ui/utils.js";
    import { tv } from "tailwind-variants";

    type $$Props = HTMLAttributes<HTMLDivElement> | { variant: "normal" | "elevated" };

    

    interface Props {
        class?: $$Props["class"];
        variant?: "normal" | "elevated";
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let { class: className = undefined, variant = "normal", children, ...rest }: Props = $props();

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

<div class={cn(headerVariants({ variant, className }), className)} {...rest}>
    {@render children?.()}
</div>
