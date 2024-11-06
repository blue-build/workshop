FROM registry.fedoraproject.org/fedora-toolbox:latest

RUN dnf upgrade -y && \
    dnf install -y \
        nodejs \
        pnpm \
        rust \
        cargo \
        webkit2gtk4.0-devel \
        openssl-devel \
        curl \
        wget \
        file \
        libappindicator-gtk3-devel \
        librsvg2-devel && \
    dnf group install -y "development-tools"
