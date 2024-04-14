<script>
    import "../app.pcss";
    import "@fontsource-variable/rubik";
    import "@fontsource/ibm-plex-mono";
    import { Toaster } from "$lib/ui/components/ui/sonner";
    // @ts-ignore
    // import { PUBLIC_ADAPTER } from "$env/static/public";

    export let data;
</script>

<div class="min-h-screen bg-background text-foreground">
    <header class="flex flex-row border-b border-muted px-8 py-4">
        <h1 class="text-xl">BlueBuild Workshop</h1>
        <div class="ml-auto">
            {#if data.githubUser.login}
                Logged in as {data.githubUser.login}.
            {:else}
                Not logged in.
            {/if}
        </div>
    </header>

    <Toaster />

    <main class="p-4">
        <slot />
    </main>
</div>
