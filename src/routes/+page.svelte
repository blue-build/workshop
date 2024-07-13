<script lang="ts">
    import { Button } from "$lib/ui/components/ui/button";
    import * as Card from "$lib/ui/components/ui/card";
    import { LucidePlus } from "lucide-svelte";
    export let data;
</script>

<div class="min-w-screen font-m flex min-h-screen flex-col gap-4">
    {#if !data.githubUser}
        <Button href="/api/login" size="lg" variant="default" class="mx-auto max-w-xl">
            Log in with GitHub to continue
        </Button>
    {:else}
        <h2
            class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
        >
            My repositories <Button
                href="/new"
                size="lg"
                variant="default"
                class="mx-8 max-w-xl text-lg font-medium"
            >
                New custom image repository <LucidePlus class="h-65w-6 m-1" />
            </Button>
        </h2>

        {#if data.bluebuildRepos}
            <p class="text-muted-foreground">
                Found {data.bluebuildRepos.length} repositories with the
                <span class="font-mono">bluebuild-image</span> GitHub topic.
            </p>
            <div class="grid grid-cols-4">
                {#each data.bluebuildRepos as repo}
                    <Card.Root
                        title="This is placeholder content that will receive functionality in the future."
                        class="cursor-pointer"
                    >
                        <Card.Header class="border-b bg-secondary pb-4">
                            {repo.full_name}
                        </Card.Header>
                        <Card.Content class="pt-4">
                            <Button variant="link" href={repo.html_url}>
                                {repo.html_url}
                            </Button>
                        </Card.Content>
                    </Card.Root>
                {/each}
            </div>
        {/if}
    {/if}
</div>
