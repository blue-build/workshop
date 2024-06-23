_default:
    just pnpm dev

pnpm *command:
    podman run -it \
    -w /host -v $PWD:/host --security-opt label=disable \
    --network host --env DISPLAY \
    --pull missing ghcr.io/blue-build/workshop-dev \
    pnpm {{command}}