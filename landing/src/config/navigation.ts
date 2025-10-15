import { SidebarNavItem } from "@/components/sidebar-navigation";

export const sidebarItems: SidebarNavItem[] = [
  {
    id: "overview",
    title: "Overview",
    description: "Aim, motivation, and research vision.",
    href: "/",
  },
  {
    id: "latest-updates",
    title: "Latest updates",
    description: "Milestones, breakthroughs, and setbacks.",
    href: "/latest-updates",
  },
  {
    id: "reading-materials",
    title: "Reading materials",
    description: "Papers, notes, and working artifacts.",
    href: "/reading-materials",
  },
  {
    id: "about-me",
    title: "About me",
    description: "Background, collaborators, and tools.",
    href: "/about-me",
    children: [
      {
        id: "about-profile",
        title: "Profile & collaborators",
        href: "/about-me#about-profile",
      },
      {
        id: "about-collaborators",
        title: "Collaborators",
        href: "/about-me#about-collaborators",
      },
    ],
  },
  {
    id: "how-you-can-help",
    title: "How you can help",
    description: "Support requests and collaboration pathways.",
    href: "/how-you-can-help",
  },
];
