"use client"

import * as React from "react"
import {
  Headphones,
  Table,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "My Tickets",
      url: "#",
      isActive: true,
      badge: "9",
    },
    {
      title: "Past Due",
      url: "#",
      badge: "4",
    },
    {
      title: "High Priority",
      url: "#",
      badge: "11",
    },
    {
      title: "Unassigned",
      url: "#",
      badge: "98",
    },
    {
      title: "All Tickets",
      url: "#",
      badge: "2,192",
    },
  ],
  projects: [
    {
      name: "LIVE CHATS",
      url: "#",
      icon: Headphones,
    },
    {
      name: "BOARDS",
      url: "#",
      icon: Table,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
