<script>
    import "../app.pcss";
    import "@fontsource-variable/rubik";
    import "@fontsource/ibm-plex-mono";
    import { Toaster } from "$lib/ui/components/ui/sonner";
    import { ModeWatcher } from "mode-watcher";
    import { toggleMode } from "mode-watcher";
    import { LucideSun, LucideMoon, LucideUserRound, LucideExternalLink } from "lucide-svelte";
    import Button from "$lib/ui/components/ui/button/button.svelte";
    import * as Avatar from "$lib/ui/components/ui/avatar";
    import * as DropdownMenu from "$lib/ui/components/ui/dropdown-menu";
    // @ts-ignore
    // import { PUBLIC_ADAPTER } from "$env/static/public";

    export let data;
</script>

<Toaster />
<ModeWatcher disableTransitions={false} />

<div class="min-h-screen bg-background text-foreground">
    <header class="flex flex-row border-b border-muted px-8 py-4">
        <h1 class="place-self-center text-xl"><a href="/">BlueBuild Workshop</a></h1>
        <div class="ml-auto flex flex-row gap-2">
            <Button
                on:click={toggleMode}
                size="icon"
                variant="ghost"
                class="relative overflow-hidden"
            >
                <LucideSun
                    class="absolute h-6 w-6 translate-y-0 transition-transform dark:-translate-y-10"
                />
                <LucideMoon
                    class="absolute h-6 w-6 translate-y-10 transition-transform dark:translate-y-0"
                />
            </Button>
            {#if data.githubUser}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <Avatar.Root>
                            <Avatar.Image
                                src={data.githubUser.avatar_url}
                                alt={data.githubUser.login}
                            />
                            <Avatar.Fallback>CN</Avatar.Fallback>
                        </Avatar.Root>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Group>
                            <DropdownMenu.Label>{data.githubUser.login}</DropdownMenu.Label>
                            <DropdownMenu.Separator class="bg-border" />
                            <DropdownMenu.Item>
                                <a
                                    href={`https://github.com/${data.githubUser.login}`}
                                    class="flex items-center gap-1"
                                >
                                    github.com/{data.githubUser.login}
                                    <LucideExternalLink class="inline-block max-w-4" />
                                </a>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <button on:click={() => alert("unimplemented, just clear cookies")}>
                                    Log out
                                </button>
                            </DropdownMenu.Item>
                        </DropdownMenu.Group>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            {:else}
                <Avatar.Root>
                    <Avatar.Fallback>
                        <LucideUserRound />
                    </Avatar.Fallback>
                </Avatar.Root>
            {/if}
        </div>
    </header>

    <main class="p-4">
        <slot />
    </main>
</div>
