<script lang="ts">
    import * as Card from "$lib/ui/components/ui/card";
    import { Button } from "$lib/ui/components/ui/button";
    import Input from "$lib/ui/components/ui/input/input.svelte";
    import { Label } from "$lib/ui/components/ui/label";

    type SetupStep = "start" | "inprogress" | "cosign" | "done";
    let setupStep = "start" as SetupStep;

    function generateCosignKeys() {
        // @ts-ignore
        const go = new Go();

        WebAssembly.instantiateStreaming(fetch("/cosign.wasm"), go.importObject).then(
            async (obj) => {
                const wasm = obj.instance;
                go.run(wasm);
                // @ts-ignore
                console.log(cosignPublicKey);
                // @ts-ignore
                console.log(cosignPrivateKey);
            }
        );
    }
</script>

<svelte:head>
    <script src="/wasm_exec.js" defer></script>
    <link rel="prefetch" href="/cosign.wasm" />
</svelte:head>

<div class="min-w-screen font-m">
    <Card.Root class="mx-auto mt-[10%] max-w-xl px-4 py-6">
        <Card.Header variant="elevated">
            <Card.Title class="text-2xl">
                {#if setupStep === "start"}
                    Set up a new image repository
                {:else if setupStep === "inprogress"}
                    Setting up your repository...
                {:else if setupStep === "cosign"}
                    Set up container signing
                {:else}
                    Done!
                {/if}
            </Card.Title>
        </Card.Header>
        <Card.Content class="flex max-w-lg flex-col items-start justify-stretch gap-6">
            <Label for="reponame">Please enter a name for your new custom image repository:</Label>
            <Input id="reponame" type="text" placeholder="weird-os" class="font-mono" required
            ></Input>
            <Button on:click={generateCosignKeys} size="lg" variant="default" class="mt-6">
                Sign in with GitHub to continue...
            </Button>
        </Card.Content>
    </Card.Root>
</div>
