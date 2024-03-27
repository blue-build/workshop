FROM registry.fedoraproject.org/fedora-toolbox:latest

RUN sudo dnf check-update && \
    sudo dnf install \
        webkit2gtk4.0-devel \
        openssl-devel \
        curl \
        wget \
        file \
        libappindicator-gtk3-devel \
        librsvg2-devel && \
    sudo dnf group install "C Development Tools and Libraries"