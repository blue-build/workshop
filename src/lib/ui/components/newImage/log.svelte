<script lang="ts">
    import * as Collapsible from "$lib/ui/components/ui/collapsible";
    import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
    import { Button } from "$lib/ui/components/ui/button";
    import { LucideArrowDown, LucideCopy } from "lucide-svelte";
    import { toast } from "svelte-sonner";

    let logElement: HTMLPreElement;
    let scrollIntoView = true;

    export let log: Array<string>;

    setInterval(testLog, 100);
    function testLog() {
        if (scrollIntoView && logElement) logElement.lastChild?.scrollIntoView();
    }
</script>

<Collapsible.Root class="relative w-full space-y-2">
    <Collapsible.Trigger asChild let:builder>
        <Button
            builders={[builder]}
            variant="default"
            size="lg"
            class="relative z-10 w-full justify-start p-0"
        >
            <div class="flex items-center justify-between space-x-4 px-4">
                Open log <ChevronsUpDown class="mx-2 h-4 w-4" />
            </div>
        </Button>
    </Collapsible.Trigger>
    <Collapsible.Content class="absolute w-full px-2">
        <div
            bind:this={logElement}
            on:wheel={(e) => {
                scrollIntoView = false;
            }}
            class="flex max-h-[24rem] min-h-32 w-full -translate-y-4 flex-col overflow-auto border-2 bg-popover p-2 pt-4 font-mono text-sm"
        >
            {#each log as logLine}
                <pre class="text-wrap">{logLine}</pre>
            {/each}
        </div>
        {#if scrollIntoView === false}
            <Button
                on:click={() => (scrollIntoView = true)}
                size="icon"
                variant="secondary"
                class="absolute bottom-6 right-4 h-8 w-8"
            >
                <LucideArrowDown class="h-5 w-5" />
            </Button>
        {/if}
        <Button
            on:click={() => {
                navigator.clipboard.writeText(log.join("\n"));
                toast("Copied to clipboard");
            }}
            size="icon"
            variant="ghost"
            class="absolute right-4 top-0 h-8 w-8"
        >
            <LucideCopy class="h-5 w-5" />
        </Button>
    </Collapsible.Content>
</Collapsible.Root>
