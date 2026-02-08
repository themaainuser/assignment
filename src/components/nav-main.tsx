import { type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    badge?: string
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <div className="px-2 py-1.5">
        <h2 className="mb-2 px-2 text-xs font-bold tracking-tight text-slate-500 uppercase flex items-center justify-between group-data-[collapsible=icon]:hidden">
          Ticket Views
          {/* Using a simple chevron for effect, though logically it's just a header here */}
          {/* <ChevronDown className="w-3 h-3" /> */}
        </h2>
      </div>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={item.isActive}
                className={`
                  justify-between 
                  ${item.isActive
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-100'}
                `}
              >
                <div className="flex items-center gap-2 font-medium">
                  {item.icon && <item.icon />}
                  <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                </div>
                {item.badge && (
                  <span className={`
                    text-xs px-1.5 py-0.5 rounded-sm font-semibold
                    group-data-[collapsible=icon]:hidden
                    ${item.isActive
                      ? 'bg-blue-800/40 text-white'
                      : 'bg-white text-slate-500 shadow-sm border'}
                  `}>
                    {item.badge}
                  </span>
                )}
              </SidebarMenuButton>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
