# Tauri + Svelte + Typescript

This template should help get you started developing with Tauri, Svelte and TypeScript in Vite.

## Development

### Set up environment

Using the Nix Flake:

```sh
nix develop

# use this command if in a non-posix-compliant shell
bash -c "SHELL=bash nix develop"
```

Using the dev toolbox container image:
```sh
distrobox create -i ghcr.io/blue-build/workshop-dev -n workshop-dev -p # add --nvidia flag if using nvidia
distrobox enter workshop-dev
```


Install deps

```sh
pnpm install
```

### Run development version

Web browser

```sh
pnpm dev
```

Tauri app

```sh
pnpm tauri dev
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).
