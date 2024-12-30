<script lang="ts">
    import { Button } from "$lib/ui/components/ui/button";
    import * as Card from "$lib/ui/components/ui/card";
    import * as Alert from "$lib/ui/components/ui/alert";

    let { data } = $props();

    let repoData = data.repoData;
    console.log(repoData);
</script>

<div class="min-w-screen font-m">
    <Card.Root class="mx-auto mt-[10%] max-w-xl px-4 py-6">
        <Card.Header variant="elevated">
            <Card.Title class="text-2xl">{repoData?.name}</Card.Title>
        </Card.Header>
        <Card.Content>
            <Alert.Root class="mb-6">
                <Alert.Title>Sorry!</Alert.Title>
                <Alert.Description class="text-md">
                    This feature is a WIP. Features for editing your custom image might be added in
                    the future.
                </Alert.Description>
            </Alert.Root>
            <div class="flex flex-row flex-wrap gap-4">
                <Button href={repoData?.html_url} target="_blank" class="px-6">
                    GitHub README
                </Button>
                <Button
                    href={repoData?.html_url + "/actions/workflows/build.yml"}
                    target="_blank"
                    class="px-6"
                >
                    GitHub Actions
                </Button>
            </div>
        </Card.Content>
    </Card.Root>
</div>
