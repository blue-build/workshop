<script lang="ts">
    import * as Card from "$lib/ui/components/ui/card";
    import { Button } from "$lib/ui/components/ui/button";
    import Input from "$lib/ui/components/ui/input/input.svelte";
</script>

<div class="min-w-screen">
    <Card.Root class="mx-auto mt-[10%] max-w-xl px-4 py-6">
        <Card.Header>
            <Card.Title>Card Title</Card.Title>
            <Card.Description>Card Description</Card.Description>
        </Card.Header>
        <Card.Content class="flex max-w-lg flex-col items-start justify-stretch gap-6">
            <Input type="text" placeholder="weird-os"></Input>
            <Button href="/signin" size="lg" variant="default">
                Sign in with GitHub to continue...
            </Button>
        </Card.Content>
    </Card.Root>
</div>
