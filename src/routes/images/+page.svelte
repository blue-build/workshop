<script lang="ts">
    import { imageCategories } from "$data/images";
    import * as Card from "$lib/ui/components/ui/card";
    import { Button } from "$lib/ui/components/ui/button";
    import * as Select from "$lib/ui/components/ui/select";
    import { Toggle } from "$lib/ui/components/ui/toggle/index.js";
    import * as Alert from "$lib/ui/components/ui/alert";
    import {
        LucideAppWindow,
        LucideCopy,
        LucideExternalLink,
        LucideFileVideo,
        LucideFolderGit2,
        LucideSquare,
        LucideSquareActivity
    } from "lucide-svelte";
    import type { Selected } from "bits-ui";
    import { toast } from "svelte-sonner";
    import { knownDesktopData } from "$lib/images/types";

    // TODO add sorting (by popularity)

    let desktopFilter: Selected<unknown> | undefined = $state();
    let nvidiaFilter: Selected<unknown> | undefined = $state();
    let kernelFilter: Selected<unknown> | undefined = $state();
    let codecsFilter: Selected<unknown> | undefined = $state();

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
                                nvidiaFilter?.value == undefined) &&
                            (image.properties.kernel == kernelFilter?.value ||
                                kernelFilter == undefined ||
                                kernelFilter?.value == undefined) &&
                            (image.properties.codecs == codecsFilter?.value ||
                                codecsFilter == undefined ||
                                codecsFilter?.value == undefined)
                    )
                };
            })
            .filter((category) => category.images.length > 0)
    );

    let showAsTable = $state(false);
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
    <h3 class="text-xl">Settings</h3>
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
        <Select.Root bind:selected={kernelFilter}>
            <Select.Trigger class="w-fit min-w-32 px-4">
                <Select.Value placeholder="Kernel" />
            </Select.Trigger>
            <Select.Content>
                <Select.Item value={undefined}>Any Kernel</Select.Item>
                <Select.Item value="base">Base Kernel</Select.Item>
                <Select.Item value="bazzite">Bazzite Kernel</Select.Item>
            </Select.Content>
        </Select.Root>
        <Select.Root bind:selected={codecsFilter}>
            <Select.Trigger class="w-fit min-w-32 px-4">
                <Select.Value placeholder="Codecs" />
            </Select.Trigger>
            <Select.Content>
                <Select.Item value={undefined}>Any Codecs</Select.Item>
                <Select.Item value="free">Only Free / Libre Codecs</Select.Item>
                <Select.Item value="nonfree">Also Nonfree Codecs</Select.Item>
            </Select.Content>
        </Select.Root>
    </div>
    <div class="px-4">
        <Toggle
            variant="outline"
            aria-label="Toggle show image data as table"
            bind:pressed={showAsTable}
        >
            Show image properties as a table
        </Toggle>
    </div>
    <div class="mt-4 p-1">
        {filteredCategories.flatMap((category) => category.images).length} images found
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
                        <Card.Content class="flex w-full max-w-3xl flex-col gap-4 pb-3 pt-6">
                            <div class="mb-6 flex flex-row flex-wrap gap-4">
                                {#if !showAsTable}
                                    {#each Object.entries(image.properties) as [key, value]}
                                        <div
                                            class="px-4 py-3 text-sm leading-relaxed outline outline-1 outline-secondary-foreground"
                                        >
                                            {#if key == "desktop"}
                                                {#if value != "none"}
                                                    {@const desktopData =
                                                        knownDesktopData[value as string]}

                                                    <LucideAppWindow
                                                        class="my-auto mr-1 inline-block h-5 w-5"
                                                    />
                                                    contains the
                                                    <a
                                                        href={desktopData?.url}
                                                        target="_blank"
                                                        class="underline"
                                                    >
                                                        {desktopData?.name}
                                                    </a>
                                                    {desktopData?.generic}
                                                {:else}
                                                    doesn't contain a graphical environment
                                                {/if}
                                            {:else if key == "nvidia"}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 24 24"
                                                    class="relative bottom-0.5 my-auto mr-2 inline-block h-5 w-5"
                                                >
                                                    <path
                                                        fill="currentColor"
                                                        d="M8.948 8.798v-1.43a7 7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851a3.7 3.7 0 0 1-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6 6 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964a6.5 6.5 0 0 1-1.095-.097v1.325c.3.035.61.062.91.062c3.957 0 6.82-2.023 9.593-4.408c.459.371 2.34 1.263 2.73 1.652c-2.633 2.208-8.772 3.984-12.253 3.984c-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936"
                                                    />
                                                </svg>
                                                {#if value == "open"}
                                                    contains the <a
                                                        href="https://github.com/NVIDIA/open-gpu-kernel-modules"
                                                        target="_blank"
                                                        class="underline"
                                                    >
                                                        open Nvidia kernel modules
                                                    </a>
                                                {:else if value == "proprietary"}
                                                    contains the <em>
                                                        proprietary Nvidia kernel modules
                                                    </em>
                                                {:else}
                                                    doesn't contain Nvidia drivers
                                                {/if}
                                            {:else if key == "kernel"}
                                                <LucideSquareActivity
                                                    class="my-auto mr-1 inline-block h-5 w-5"
                                                />
                                                {#if value == "bazzite"}
                                                    contains the <a
                                                        href="https://github.com/hhd-dev/kernel-bazzite"
                                                        target="_blank"
                                                        class="underline"
                                                    >
                                                        Bazzite kernel
                                                    </a> (with extended hardware compatibility and performance
                                                    optimizations)
                                                {:else}
                                                    contains the base kernel with minimal patches
                                                {/if}
                                            {:else if key == "codecs"}
                                                <LucideFileVideo
                                                    class="my-auto mr-1 inline-block h-5 w-5"
                                                />
                                                {#if value == "nonfree"}
                                                    contains additional <em>nonfree</em> multimedia codecs
                                                {:else}
                                                    contains only the <em>free/libre</em> multimedia
                                                    codecs
                                                {/if}
                                            {:else}
                                                <div>{key}:</div>
                                                <div>{value}</div>
                                            {/if}
                                        </div>
                                    {/each}
                                {:else}
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Property</th>
                                                <th>Value</th>
                                            </tr>
                                            {#each Object.entries(image.properties) as [key, value]}
                                                <tr>
                                                    <td>{key}</td>
                                                    <td>{value}</td>
                                                </tr>
                                            {/each}
                                        </tbody>
                                    </table>
                                {/if}
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
