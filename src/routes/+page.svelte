<script lang="ts">
    import { Button } from "$lib/ui/components/ui/button";
    import { json } from "@sveltejs/kit";
    import { LucidePlus } from "lucide-svelte";
    export let data;
</script>

<div class="min-w-screen font-m flex min-h-screen flex-col gap-4">
    <h2
        class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
        My repositories
    </h2>
    {#if !data.githubUser}
        <Button href="/api/login" size="lg" variant="default" class="mx-auto max-w-xl">
            Log in with GitHub</Button
        >
    {:else}
        <Button href="/new" size="lg" variant="default" class="mx-auto max-w-xl">
            New custom image repository <LucidePlus class="h-65w-6 m-1" />
        </Button>
    {/if}
</div>
