export type ImageCategory = {
    category: string;
    description: Array<string>;
    repo: string;
    images: Array<Image>;
    stability: "stable" | "beta" | "experimental";
};

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

export type Image = {
    name: string;
    url: string;
    properties: {
        desktop: KnownDesktop;
        nvidia: NvidiaDriverType;
        stability?: "stable" | "experimental";
    };
};
