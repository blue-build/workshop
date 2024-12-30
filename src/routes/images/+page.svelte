<script lang="ts">
    import { imageCategories } from "$data/images";
    import * as Card from "$lib/ui/components/ui/card";
    import { Button } from "$lib/ui/components/ui/button";
    import { LucideCopy, LucideFolderGit2 } from "lucide-svelte";

    // TODO add filtering
    // TODO add sorting (by popularity)
    // TODO add introductory text
</script>

<h2 class="text-3xl font-semibold">Image list</h2>

<div class="flex flex-col gap-6 p-4">
    {#each imageCategories as category}
        <section class="flex flex-col gap-5 p-4 outline-dashed outline-secondary">
            <header>
                <h3 class="text-2xl">{category.category}</h3>
                <a
                    href={category.repo}
                    target="_blank"
                    class="flex flex-row gap-2 text-sm hover:underline focus:underline"
                >
                    {#if category.repo.startsWith("https://github.com/")}
                        <img
                            src={"https://github.com/" +
                                new URL(category.repo).pathname.split("/")[1] +
                                ".png"}
                            alt=""
                            class="h-5 w-5"
                        />
                    {:else}
                        <LucideFolderGit2 class="h-5 w-5" />
                    {/if}
                    {category.repo}
                </a>
            </header>

            <div class="prose max-w-7xl">
                {#each category.description as paragraph}
                    <p>{paragraph}</p>
                {/each}
            </div>
            <div class="flex flex-row gap-4 overflow-x-scroll">
                {#each category.images as image}
                    <Card.Root class="min-w-min">
                        <Card.Header class="border-b bg-secondary pb-4">
                            {image.name}
                        </Card.Header>
                        <Card.Content class="flex w-full flex-col gap-4 pt-4">
                            <div class="flex flex-col">
                                {#each Object.entries(image.properties) as [key, value]}
                                    <div class="flex flex-row items-center gap-2">
                                        <div>{key}:</div>
                                        <div>{value}</div>
                                    </div>
                                {/each}
                            </div>
                            <div
                                class="flex flex-row items-center gap-2 border border-foreground pl-3"
                            >
                                <div class="min-w-max font-mono text-sm">
                                    {image.url}
                                </div>
                                <Button title="Copy to clipboard" variant="ghost" p-2 )}>
                                    <LucideCopy class="h-5 w-5" />
                                </Button>
                            </div>
                        </Card.Content>
                    </Card.Root>
                {/each}
            </div>
        </section>
    {/each}
</div>

<style>
    /* TODO add prose plugin */
    .prose {
        line-height: 1.7rem;
        & p {
            margin-block: 0.4rem;
        }
    }
</style>
