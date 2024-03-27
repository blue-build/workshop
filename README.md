# Tauri + Svelte + Typescript

This template should help get you started developing with Tauri, Svelte and TypeScript in Vite.

## Development

### Set up environment

Use the Nix Flake for easy setup.

```sh
nix develop

# use this command if in a non-posix-compliant shell
bash -c "SHELL=bash nix develop"
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
