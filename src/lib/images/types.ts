// Main types

export type ImageCategory = {
    category: string;
    description: Array<string>;
    repo: string;
    website?: string;
    images: Array<Image>;
    stability: Stability;
};

export type Image = {
    name: string;
    url: string;
    properties: {
        desktop: KnownDesktop;
        nvidia: NvidiaDriverType;
        kernel?: KernelType;
        codecs?: CodecsSupport;
        stability?: Stability;
    };
};

// Utility types

export type KnownDesktop =
    | "gnome"
    | "kde"
    | "cosmic"
    | "budgie"
    | "lxqt"
    | "xfce"
    | "wayfire"
    | "sway"
    | "river"
    | "hyprland"
    | "none";
export const knownDesktopData = {
    gnome: { name: "GNOME", generic: "desktop", url: "https://www.gnome.org/" },
    kde: { name: "KDE Plasma", generic: "desktop", url: "https://kde.org/" },
    cosmic: { name: "Cosmic", generic: "desktop", url: "https://system76.com/cosmic/" },
    budgie: {
        name: "Budgie",
        generic: "desktop",
        url: "https://buddiesofbudgie.org/"
    },
    lxqt: { name: "LXQt", generic: "desktop", url: "https://lxqt.org/" },
    xfce: { name: "XFCE", generic: "desktop", url: "https://xfce.org/" },
    wayfire: {
        name: "Wayfire",
        generic: "compositor",
        url: "https://wayfire.org/"
    },
    sway: { name: "Sway", generic: "compositor", url: "https://swaywm.org/" },
    river: { name: "River", generic: "compositor", url: "https://isaacfreund.com/software/river/" },
    hyprland: { name: "Hyprland", generic: "compositor", url: "https://hyprland.org/" }
};

export type NvidiaDriverType = "proprietary" | "open" | "none";

export type KernelType = "base" | "bazzite";

export type CodecsSupport = "free" | "nonfree";

export type Stability = "stable" | "beta" | "experimental";
