_default:
    just pnpm dev

pnpm *command:
    podman run -it \
    -w /host -v $PWD:/host --security-opt label=disable \
    --network host --env DISPLAY \
    --pull newer localhost/workshop-dev \
    pnpm {{command}}