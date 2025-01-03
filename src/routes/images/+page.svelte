<script lang="ts">
    import { imageCategories } from "$data/images";
    import * as Card from "$lib/ui/components/ui/card";
    import { Button } from "$lib/ui/components/ui/button";
    import * as Select from "$lib/ui/components/ui/select";
    import * as Alert from "$lib/ui/components/ui/alert";
    import { LucideCopy, LucideExternalLink, LucideFolderGit2 } from "lucide-svelte";
    import type { Selected } from "bits-ui";
    import { toast } from "svelte-sonner";

    // TODO add sorting (by popularity)

    let desktopFilter: Selected<unknown> | undefined = $state();
    let nvidiaFilter: Selected<unknown> | undefined = $state();

    const filteredCategories = $derived.by(() =>
        imageCategories
            .map((category) => {
                return {
                    ...category,
                    images: category.images.filter(
                        (image) =>
                            (image.properties.desktop == desktopFilter?.value ||
                                desktopFilter == undefined ||
                                desktopFilter?.value == undefined) &&
                            (image.properties.nvidia == nvidiaFilter?.value ||
                                nvidiaFilter == undefined ||
                                nvidiaFilter?.value == undefined)
                    )
                };
            })
            .filter((category) => category.images.length > 0)
    );
</script>

<h2 class="text-3xl font-semibold">Image list</h2>
<div class="prose max-w-5xl p-4">
    <p>
        This is an interactive list of bootable container images based on rpm-ostree or bootc. Feel
        free to use this to pick an image to build on or to install directly.
    </p>
    <p>
        This list is an experimental project, which may be integrated better into the BlueBuild
        Workshop in the future. All the data on this page is contained <a
            href="https://github.com/blue-build/workshop/blob/main/src/data/images.ts"
            class="underline"
        >
            in this file
        </a>. Contributions and complaints are welcome.
    </p>
    <Alert.Root class="mb-3 mt-6">
        <Alert.Title>Important notes</Alert.Title>
        <Alert.Description class="text-md">
            Always consult the image maintainer's documentation before using these images. We cannot
            guarantee that the information on this page is up-to-date or complete. The projects
            listed here will probably have their own image tagging systems, preferred installation
            steps, and recommended images. This page is to be used only as a reference.
        </Alert.Description>
    </Alert.Root>
</div>

<div>
    <h3 class="text-xl">Filters</h3>
    <div class="flex flex-row gap-4 p-4">
        <Select.Root bind:selected={desktopFilter}>
            <Select.Trigger class="w-fit min-w-32 px-4">
                <Select.Value placeholder="Desktop" />
            </Select.Trigger>
            <Select.Content>
                <Select.Item value={undefined}>Any Desktop</Select.Item>
                <Select.Item value="gnome">GNOME</Select.Item>
                <Select.Item value="kde">KDE Plasma</Select.Item>
                <Select.Item value="budgie">Budgie</Select.Item>
                <Select.Item value="lxqt">LXQt</Select.Item>
                <Select.Item value="xfce">XFCE</Select.Item>
                <Select.Item value="sway">Sway</Select.Item>
                <Select.Item value="wayfire">Wayfire</Select.Item>
                <Select.Item value="river">River</Select.Item>
                <Select.Item value="hyprland">Hyprland</Select.Item>
                <Select.Item value="none">No GUI</Select.Item>
            </Select.Content>
        </Select.Root>
        <Select.Root bind:selected={nvidiaFilter}>
            <Select.Trigger class="w-fit min-w-32 px-4">
                <Select.Value placeholder="Nvidia" />
            </Select.Trigger>
            <Select.Content>
                <Select.Item value={undefined}>Any Nvidia drivers</Select.Item>
                <Select.Item value="none">No Nvidia drivers</Select.Item>
                <Select.Item value="open">Open Nvidia kernel modules</Select.Item>
                <Select.Item value="proprietary">Proprietary Nvidia kernel modules</Select.Item>
            </Select.Content>
        </Select.Root>
    </div>
</div>

<div class="flex flex-col gap-6 p-4">
    {#if filteredCategories.length == 0}
        <div class="flex flex-col gap-4 p-4">
            <div class="flex flex-row items-center gap-4">
                <div class="h-fit w-fit rounded-full bg-secondary p-2">
                    <LucideFolderGit2 class="h-5 w-5" />
                </div>
                <div class="flex flex-col">
                    <h3 class="text-2xl">No images found</h3>
                    <p>Try changing the filters.</p>
                </div>
            </div>
        </div>
    {/if}
    {#each filteredCategories as category}
        <section class="flex flex-col gap-5 p-4 outline-dashed outline-secondary">
            <header class="flex flex-col gap-1">
                <div class="flex flex-row items-center gap-3">
                    <h3 class="text-2xl">{category.category}</h3>
                    <div
                        class={"rounded-full px-3 " +
                            (category.stability == "stable"
                                ? "bg-green-200 dark:bg-green-900"
                                : "bg-yellow-200 dark:bg-yellow-900")}
                    >
                        {category.stability}
                    </div>
                </div>
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
                {#if category.website}
                    <a
                        href={category.website}
                        target="_blank"
                        class="flex flex-row gap-2 text-sm hover:underline focus:underline"
                    >
                        <LucideExternalLink class="h-5 w-5" />
                        {category.website}
                    </a>
                {/if}
            </header>

            <div class="prose max-w-7xl">
                {#each category.description as paragraph}
                    <p>{paragraph}</p>
                {/each}
            </div>
            <div class="flex flex-row gap-4 overflow-x-scroll">
                {#each category.images as image}
                    <Card.Root class="min-w-min">
                        <Card.Header
                            class="flex flex-row items-center gap-2 border-b bg-secondary pb-4"
                        >
                            {image.name}
                            {#if image.properties.stability !== undefined}
                                <div
                                    class={"h-fit rounded-full px-3 text-sm " +
                                        (image.properties.stability == "stable"
                                            ? "bg-green-200 dark:bg-green-900"
                                            : "bg-yellow-200 dark:bg-yellow-900")}
                                >
                                    {image.properties.stability}
                                </div>
                            {/if}
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
                                <Button
                                    title="Copy to clipboard"
                                    variant="ghost"
                                    onclick={() => {
                                        navigator.clipboard.writeText(image.url);
                                        toast.success("Copied to clipboard", {
                                            description: image.url
                                        });
                                    }}
                                >
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
