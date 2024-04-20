<script lang="ts">
    import * as Card from "$lib/ui/components/ui/card";
    import { Button } from "$lib/ui/components/ui/button";
    import { Input } from "$lib/ui/components/ui/input";
    import { Label } from "$lib/ui/components/ui/label";
    import { Progress } from "$lib/ui/components/ui/progress";
    import Log from "$lib/ui/components/newImage/log.svelte";
    import { readLogStream } from "$lib/ts/misc/logStream.js";

    type SetupStep = "start" | "inprogress" | "cosign" | "done" | "failed";
    let setupStep = "start" as SetupStep;
    let log: Array<string> = [];
    export let data;

    let repoName = "";

    async function createRepo() {
        setupStep = "inprogress";
        const res = await fetch("/api/github/createRepo", {
            method: "POST",
            body: JSON.stringify({
                name: repoName,
                login: data.githubUser.login
            }),
            headers: {
                "content-type": "application/json",
                Accept: "text/event-stream"
            }
        });
        readLogStream(res, (value) => {
            log = [...log, value];
            if (value.includes("DONE!")) {
                setupStep = "cosign";
            }
        });
    }

    async function setupCosign() {
        setupStep = "inprogress";

        log = [...log, "Generating cosign keys..."];
        const keys = await generateCosignKeys();
        log = [...log, "Generated cosign keys, sending to serverless backend..."];

        const res = await fetch("/api/github/setupCosign", {
            method: "POST",
            body: JSON.stringify({
                name: repoName,
                login: data.githubUser.login,
                cosignPrivateKey: keys.cosignPrivateKey,
                cosignPublicKey: keys.cosignPublicKey
            }),
            headers: {
                "content-type": "application/json",
                Accept: "text/event-stream"
            }
        });
        readLogStream(res, (value) => {
            log = [...log, value];
            if (value.includes("DONE!")) {
                setupStep = "done";
            }
        });
    }

    async function generateCosignKeys(): Promise<{
        cosignPublicKey: string;
        cosignPrivateKey: string;
    }> {
        // @ts-ignore
        const go = new Go();

        const obj = await WebAssembly.instantiateStreaming(fetch("/cosign.wasm"), go.importObject);
        const wasm = obj.instance;
        go.run(wasm);

        // The keys are set as global variables
        const returnObject = {
            // @ts-ignore
            cosignPublicKey: window.cosignPublicKey,
            // @ts-ignore
            cosignPrivateKey: window.cosignPrivateKey
        };

        // Clear the keys from global variables for shallow security reasons
        // @ts-ignore
        window.cosignPublicKey = undefined;
        // @ts-ignore
        window.cosignPrivateKey = undefined;

        return returnObject;
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
                    Set up a new repository
                {:else if setupStep === "inprogress"}
                    Setting up your repository...
                {:else if setupStep === "cosign"}
                    Set up container signing
                {:else if setupStep === "failed"}
                    Set up failed
                {:else}
                    Done!
                {/if}
            </Card.Title>
        </Card.Header>
        <Card.Content class="mx-auto flex max-w-lg flex-col items-start justify-stretch gap-6">
            {#if setupStep === "start"}
                <Label for="reponame">
                    Please enter a name for your new custom image repository:
                </Label>
                <Input
                    id="reponame"
                    name="reponame"
                    type="text"
                    placeholder="weird-os"
                    class="font-mono"
                    required
                    on:change={(e) => (repoName = e.target?.value)}
                ></Input>
                <Button on:click={createRepo} size="lg" variant="default" class="mt-6">
                    Create repository
                </Button>
            {:else if setupStep === "inprogress"}
                <Progress value={log.length} max={25} class="mb-6" />
            {:else if setupStep === "cosign"}
                <h3 class="text-lg">How do you want to set up container signing?</h3>
                <p class="text-sm">
                    Container signing is used to verify the authenticity of the custom image. It is
                    important not to expose the cosign keys to third parties. BlueBuild can set
                    these up automatically for you. The keys will be generated in your browser and
                    transmitted over HTTPS to GitHub. If you do not trust BlueBuild to do this, you
                    can skip it for now and do it manually instead. <a
                        href="https://github.com/blue-build/workshop/blob/main/TRUST.md"
                    >
                        Read more about trust...
                    </a>
                </p>

                <div class="mt-6 flex w-full flex-row flex-wrap justify-between">
                    <Button
                        on:click={() => {
                            setupStep = "done";
                        }}
                        size="lg"
                        variant="ghost"
                    >
                        Skip
                    </Button>
                    <Button on:click={setupCosign} size="lg" variant="default">
                        Set keys cosign automatically
                    </Button>
                </div>
            {:else}
                Done!
                <Button
                    href="https://github.com/{data.githubUser.login}/{repoName}"
                    size="lg"
                    variant="default"
                    class="mt-6"
                >
                    Open your repository ({data.githubUser.login}/{repoName})
                </Button>
            {/if}
            {#if setupStep !== "start"}
                <Log {log} />
            {/if}
        </Card.Content>
    </Card.Root>
</div>
