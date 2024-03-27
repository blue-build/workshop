FROM registry.fedoraproject.org/fedora-toolbox:latest

RUN sudo dnf check-update -y && \
    sudo dnf install -y \
        webkit2gtk4.0-devel \
        openssl-devel \
        curl \
        wget \
        file \
        libappindicator-gtk3-devel \
        librsvg2-devel && \
    sudo dnf group install -y "C Development Tools and Libraries"