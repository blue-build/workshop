<script lang="ts">
    import { Progress as ProgressPrimitive } from "bits-ui";
    import { cn } from "$lib/ui/utils.js";

    type $$Props = ProgressPrimitive.Props | { state: "inprogress" | "failed" };

    let className: $$Props["class"] = undefined;
    export let max: $$Props["max"] = 100;
    export let value: $$Props["value"] = undefined;
    export let state: "inprogress" | "failed" = "inprogress";
    export { className as class };
</script>

<ProgressPrimitive.Root
    class={cn("relative h-8 w-full overflow-hidden border-2 bg-secondary", className)}
    {...$$restProps}
>
    <div
        class={`h-full w-[200%] flex-1 transition-all ${state === "failed" ? "bg-destructive" : "bg-accent"} `}
        style={`${
            state === "inprogress"
                ? // ? `transform: translateX(-${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`
                  `transform: translateX(${-80 + (80 * (value ?? 0)) / (max ?? 1)}%); background: linear-gradient(135deg, hsl(var(--accent)) 30%, transparent 90%)`
                : "background: repeating-linear-gradient(-45deg, transparent, transparent 10%, hsl(var(--destructive)) 10%, hsl(var(--destructive)) 25%)"
        }
		`}
    />
</ProgressPrimitive.Root>
