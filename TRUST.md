# Trusting BlueBuild Workshop

## GitHub login

It is unfortunate that the GitHub API does not allow for enough granular control over the permissions for a tool like this to not require the `repo` permission, giving it read/write access to all your repositories. However, the Workshop is designed to not make changes to repositories that are not _initiated by the user_, and technically works like any GitHub client. The OAuth log in system follows GitHub recommendations and best practices. You can audit the code of the whole project [here](https://github.com/blue-build/workshop).

## Cosign keys

Sigstore's Cosign is used to sign all custom images built with BlueBuild. It is an important step, as it allows for end users to verify the authenticity of a custom image. It is also required for things such as secure boot on atomic Fedora systems.

The Workshop provides a way to automatically generate cosign keys in the repository setup wizard. The keys are first generated inside your own web browser with WASM using [this project](https://github.com/blue-build/wasm-cosign-keygen), then sent through HTTPS to our serverless backend (run on Cloudflare Pages), which makes the final API requests to GitHub. **There is technically nothing insecure about this process**, it is very similar to you yourself sending the keys to GitHub through their web UI or CLI. The only difference is the added trust in BlueBuild.

If you do not wish to trust BlueBuild's Workshop with this duty, you should do it manually, [which we also provide a guide for](https://blue-build.org/how-to/cosign/).
