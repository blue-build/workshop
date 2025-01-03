import { generateMatrix } from "$lib/images/helpers";
import type {
    CodecsSupport,
    ImageCategory,
    KernelType,
    KnownDesktop,
    NvidiaDriverType
} from "$lib/images/types";

// TODO add tag support?
// TODO add nonfree codec property?

export const imageCategories: Array<ImageCategory> = [
    {
        category: "Bazzite",
        description: [
            "The next generation of Linux gaming",
            "Bazzite is a cloud native image built upon Fedora Atomic Desktops that brings the best of Linux gaming to all of your devices - including your favorite handheld."
        ],
        repo: "https://github.com/ublue-os/bazzite/",
        website: "https://bazzite.gg/",
        stability: "stable",
        images: generateMatrix({
            baseName: ["bazzite", "bazzite-deck"],
            desktop: ["kde", "gnome"],
            flavor: ["main", "asus"],
            nvidia: ["none", "open", "proprietary"]
        })
            .filter(({ baseName, nvidia }) => !(baseName == "bazzite-deck" && nvidia != "none"))
            .map(({ baseName, desktop, flavor, nvidia }) => {
                const desktopSuffix = desktop == "gnome" ? "-gnome" : "";
                const nvidiaSuffix =
                    nvidia == "open" ? "-nvidia-open" : nvidia == "proprietary" ? "-nvidia" : "";
                const base =
                    baseName == "bazzite-deck"
                        ? flavor == "asus"
                            ? "bazzite-ally"
                            : "bazzite-deck"
                        : flavor == "main"
                          ? "bazzite"
                          : "bazzite-" + flavor;

                const name = base + desktopSuffix + nvidiaSuffix;
                return {
                    name,
                    url: "ghcr.io/ublue-os/" + name,
                    properties: {
                        desktop: desktop as KnownDesktop,
                        nvidia: (name.includes("nvidia-open")
                            ? "open"
                            : name.includes("nvidia")
                              ? "proprietary"
                              : "none") as NvidiaDriverType,
                        kernel: "bazzite" as KernelType,
                        codecs: "nonfree" as CodecsSupport
                    }
                };
            })
            .sort((a, b) => a.name.length - b.name.length)
    },
    {
        category: "Bluefin",
        description: [
            "The next generation Linux workstation, designed for reliability, performance, and sustainability.",
            "A custom image of Fedora Silverblue, offering a familiar(ish) Ubuntu-style desktop.",
            "For end users it provides a system as reliable as a Chromebook with near-zero maintenance while providing developers with a powerful cloud-native development mode. Built with next generation tech, for people who need their machines to get work done."
        ],
        repo: "https://github.com/ublue-os/bluefin/",
        website: "https://projectbluefin.io/",
        stability: "stable",
        images: generateMatrix({
            nvidia: [false, true],
            dx: [false, true],
            hardware: ["", "hwe"]
        })
            .map(({ nvidia, dx, hardware }) => {
                const name =
                    "bluefin" +
                    (dx ? "-dx" : "") +
                    (hardware !== "" ? "-" + hardware : "") +
                    (nvidia ? "-nvidia" : "");
                return {
                    name,
                    url: "ghcr.io/ublue-os/" + name,
                    properties: {
                        desktop: "gnome" as KnownDesktop,
                        nvidia: (nvidia ? "proprietary" : "none") as NvidiaDriverType,
                        kernel: (hardware == "hwe" ? "bazzite" : "base") as KernelType,
                        codecs: "nonfree" as CodecsSupport
                    }
                };
            })
            .sort((a, b) => a.name.length - b.name.length)
    },
    {
        category: "Aurora",
        description: [
            "Hello stargazer, a new experience awaits.",
            "Powered by the awesomeness of KDE and Universal Blue, crafted for you.",
            "Get onboard. Aurora is the ultimate desktop OS for your developer workstation or the perfect maintenance-free OS for everyone."
        ],
        repo: "https://github.com/ublue-os/aurora/",
        website: "https://getaurora.dev/",
        stability: "stable",
        images: generateMatrix({
            nvidia: [false, true],
            dx: [false, true],
            hardware: ["", "hwe"]
        })
            .map(({ nvidia, dx, hardware }) => {
                const name =
                    "aurora" +
                    (dx ? "-dx" : "") +
                    (hardware !== "" ? "-" + hardware : "") +
                    (nvidia ? "-nvidia" : "");
                return {
                    name,
                    url: "ghcr.io/ublue-os/" + name,
                    properties: {
                        desktop: "kde" as KnownDesktop,
                        nvidia: (nvidia ? "proprietary" : "none") as NvidiaDriverType,
                        kernel: (hardware == "hwe" ? "bazzite" : "base") as KernelType,
                        codecs: "nonfree" as CodecsSupport
                    }
                };
            })
            .sort((a, b) => a.name.length - b.name.length)
    },
    {
        category: "Universal Blue Main Images",
        description: [
            "OCI base images of Fedora with batteries included.",
            "A common main image for all other uBlue images, with minimal (but important) adjustments to Fedora."
        ],
        repo: "https://github.com/ublue-os/main",
        website: "https://universal-blue.org/",
        stability: "stable",
        images: generateMatrix({
            base: ["silverblue", "kinoite", "sericea", "onyx", "base", "lazurite", "vauxite"],
            nvidia: [false, true]
        }).map(({ base, nvidia }) => {
            const name = base + (nvidia ? "-nvidia" : "-main");
            return {
                name,
                url: "ghcr.io/ublue-os/" + name,
                properties: {
                    desktop: fedoraCodewordToKnownDesktop(base as string),
                    nvidia: (nvidia ? "proprietary" : "none") as NvidiaDriverType,
                    kernel: "base",
                    codecs: "nonfree"
                }
            };
        })
    },
    {
        category: "wayblue",
        description: ["Fedora Atomic images for wayland compositors."],
        repo: "https://github.com/wayblueorg/wayblue",
        stability: "beta",
        images: generateMatrix({
            compositor: ["wayfire", "hyprland", "sway", "river", "qtile"],
            nvidia: ["none", "open", "proprietary"],
            gdm: [false, true]
        }).map(({ compositor, nvidia, gdm }) => {
            const name =
                compositor +
                (nvidia == "open" ? "-nvidia-open" : nvidia == "proprietary" ? "-nvidia" : "") +
                (gdm ? "-gdm" : "");
            return {
                name,
                url: "ghcr.io/wayblueorg/" + name,
                properties: {
                    desktop: compositor as KnownDesktop,
                    nvidia: nvidia as NvidiaDriverType,
                    kernel: "base",
                    codecs: "nonfree",
                    stability: (compositor as string) == "qtile" ? "experimental" : undefined
                }
            };
        })
    },
    {
        category: "secureblue",
        description: ["Hardened Fedora Atomic and Fedora CoreOS images."],
        repo: "https://github.com/secureblue/secureblue",
        stability: "stable",
        images: generateMatrix({
            base: [
                "silverblue",
                "kinoite",
                "sericea",
                "wayblue-wayfire",
                "wayblue-sway",
                "wayblue-river",
                "wayblue-hyprland",
                "cosmic",
                "securecore",
                "securecore-zfs"
            ],
            nvidia: ["none", "open", "proprietary"]
        }).map(({ base, nvidia }) => {
            const name =
                base +
                (nvidia == "open"
                    ? "-nvidia-open"
                    : nvidia == "proprietary"
                      ? "-nvidia"
                      : "-main") +
                "-hardened";
            const desktop = (
                fedoraCodewordToKnownDesktop(base as string) != "none"
                    ? fedoraCodewordToKnownDesktop(base as string)
                    : (base as string).startsWith("wayblue")
                      ? (base as string).replace("wayblue-", "")
                      : (base as string).startsWith("securecore")
                        ? "none"
                        : base == "cosmic"
                          ? "cosmic"
                          : ""
            ) as KnownDesktop;
            return {
                name,
                url: "ghcr.io/secureblue/" + name,
                properties: {
                    desktop,
                    nvidia: nvidia as NvidiaDriverType,
                    kernel: "base",
                    codecs: "nonfree",
                    stability: (base as string).startsWith("wayblue") ? "beta" : undefined
                }
            };
        })
    },
    {
        category: "fedora-ostree-desktops",
        description: [
            "Experimental Ostree Native Container images for rpm-ostree based Fedora desktop variants",
            "Unofficial atomic Fedora OCI images built on Fedora infrastructure based on the official variants."
        ],
        repo: "https://gitlab.com/fedora/ostree/ci-test",
        stability: "experimental",
        images: [
            "silverblue",
            "kinoite",
            "sericea",
            "onyx",
            "base",
            "lazurite",
            "vauxite",
            "cosmic-atomic"
        ].map((base) => {
            return {
                name: base,
                url: "quay.io/fedora-ostree-desktops/" + base,
                properties: {
                    desktop:
                        base == "cosmic-atomic"
                            ? "cosmic"
                            : fedoraCodewordToKnownDesktop(base as string),
                    nvidia: "none" as NvidiaDriverType,
                    kernel: "base",
                    codecs: "free"
                }
            };
        })
    },
    {
        category: "fedora-bootc",
        description: ["Official atomic bootable container base image for Fedora."],
        repo: "https://gitlab.com/fedora/bootc/base-images",
        website: "https://docs.fedoraproject.org/en-US/bootc/",
        stability: "stable",
        images: [
            {
                name: "fedora-bootc",
                url: "quay.io/fedora/fedora-bootc",
                properties: {
                    desktop: "none",
                    nvidia: "none",
                    kernel: "base",
                    codecs: "free"
                }
            }
        ]
    },
    {
        category: "centos-bootc",
        description: [
            "Official atomic bootable container base image for CentOS.",
            "Check available tags from the repo."
        ],
        repo: "https://gitlab.com/redhat/centos-stream/containers/bootc",
        website: "https://docs.fedoraproject.org/en-US/bootc/",
        stability: "stable",
        images: [
            {
                name: "centos-bootc",
                url: "quay.io/centos-bootc/centos-bootc",
                properties: {
                    desktop: "none",
                    nvidia: "none",
                    kernel: "base",
                    codecs: "free"
                }
            }
        ]
    },
    {
        category: "HeliumOS",
        description: [
            "An atomic desktop operating system for your devices.",
            "Small project based on centos-bootc."
        ],
        repo: "https://codeberg.org/HeliumOS/bootc/",
        website: "https://www.heliumos.org/",
        stability: "experimental",
        images: [
            {
                name: "bootc",
                url: "oci.heliumos.org/heliumos/bootc",
                properties: {
                    desktop: "kde",
                    nvidia: "none",
                    kernel: "base"
                }
            }
        ]
    },
    {
        category: "centos-workstation",
        description: [
            "Unoffical desktop images based on centos-bootc.",
            "Experimental Universal Blue -style images with a CentOS base, a lot of maintainer and addition overlap with Universal Blue."
        ],
        repo: "https://github.com/centos-workstation/",
        stability: "experimental",
        images: [
            {
                name: "main",
                url: "ghcr.io/centos-workstation/main",
                properties: {
                    desktop: "gnome",
                    nvidia: "none",
                    kernel: "base",
                    codecs: "nonfree"
                }
            },
            {
                name: "achillobator",
                url: "ghcr.io/centos-workstation/achillobator",
                properties: {
                    desktop: "gnome",
                    nvidia: "none",
                    kernel: "base",
                    codecs: "nonfree"
                }
            }
        ]
    }
];

function fedoraCodewordToKnownDesktop(base: string): KnownDesktop {
    switch (base) {
        case "silverblue":
            return "gnome";
        case "kinoite":
            return "kde";
        case "sericea":
            return "sway";
        case "onyx":
            return "budgie";
        case "lazurite":
            return "lxqt";
        case "vauxite":
            return "xfce";
        default:
            return "none";
    }
}
