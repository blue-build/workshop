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

export type NvidiaDriverType = "proprietary" | "open" | "none";

export type KernelType = "base" | "bazzite";

export type CodecsSupport = "free" | "nonfree";

export type Stability = "stable" | "beta" | "experimental";

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
