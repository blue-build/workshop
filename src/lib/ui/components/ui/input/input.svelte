<script lang="ts">
    import { createBubbler } from 'svelte/legacy';

    const bubble = createBubbler();
    import type { HTMLInputAttributes } from "svelte/elements";
    import type { InputEvents } from "./index.js";
    import { cn } from "$lib/ui/utils.js";

    type $$Props = HTMLInputAttributes;
    type $$Events = InputEvents;

    interface Props {
        class?: $$Props["class"];
        value?: $$Props["value"];
        [key: string]: any
    }

    let { class: className = undefined, value = $bindable(undefined), ...rest }: Props = $props();
    
</script>

<input
    class={cn(
        "flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
    )}
    bind:value
    onblur={bubble('blur')}
    onchange={bubble('change')}
    onclick={bubble('click')}
    onfocus={bubble('focus')}
    onfocusin={bubble('focusin')}
    onfocusout={bubble('focusout')}
    onkeydown={bubble('keydown')}
    onkeypress={bubble('keypress')}
    onkeyup={bubble('keyup')}
    onmouseover={bubble('mouseover')}
    onmouseenter={bubble('mouseenter')}
    onmouseleave={bubble('mouseleave')}
    onpaste={bubble('paste')}
    oninput={bubble('input')}
    {...rest}
/>
