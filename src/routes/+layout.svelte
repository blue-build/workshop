<script>
    import "../app.pcss";
    import "@fontsource-variable/rubik";
    import "@fontsource/ibm-plex-mono";
    // @ts-ignore
    // import { PUBLIC_ADAPTER } from "$env/static/public";
</script>

<div class="dark min-h-screen bg-background text-foreground">
    <header class="border-b border-muted px-8 py-4">
        <h1 class="text-xl">BlueBuild Workshop</h1>
    </header>

    <main class="p-4">
        <slot />
    </main>
</div>
