import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Inbox,
  Lightbulb,
  Users,
  FileText,
  Calculator,
  Hexagon,
  BarChart2,
  Settings,
  Search,
  ChevronDown,
  HelpCircle,
  Gift
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { TicketList, MOCK_TICKETS, MOCK_CHECKPOINTS } from "@/components/TicketList"
import { TicketDetail } from "@/components/TicketDetail"
import type { Ticket, Checkpoint } from "@/types"

export default function Page() {
  const [selectedTicketId, setSelectedTicketId] = useState<string | undefined>("OPS-102")
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])


  // Initialize with MOCK data
  useEffect(() => {
    setTickets(MOCK_TICKETS)
    setCheckpoints(MOCK_CHECKPOINTS)
  }, [])

  const selectedTicket = tickets.find(t => t.id === selectedTicketId)

  const handleToggleCheckpoint = (id: string) => {
    setCheckpoints(prev => prev.map(c =>
      c.id === id ? { ...c, completed: !c.completed } : c
    ))
  }

  return (
    <div className="flex bg-[#002f6c] h-screen w-full overflow-hidden font-sans">
      {/* 1. Left Icon Rail (Static Blue) */}
      <aside className="w-[60px] flex-shrink-0 flex flex-col items-center py-4 gap-6 text-blue-200">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-2">
          C
        </div>
        <RailIcon icon={Inbox} active />
        <RailIcon icon={Lightbulb} />
        <RailIcon icon={Users} />
        <RailIcon icon={FileText} />
        <RailIcon icon={Calculator} />
        <div className="mt-auto flex flex-col gap-6">
          <RailIcon icon={Hexagon} />
          <RailIcon icon={BarChart2} />
          <RailIcon icon={Settings} />
        </div>
      </aside>

      {/* 2. Main Area (Header + Workspace) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header (Blue) */}
        <header className="h-14 flex items-center justify-between px-4 shrink-0 text-white">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg tracking-tight">Helpdesk</span>
          </div>

          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-blue-300" />
              <input
                className="w-full bg-[#002352] border-none rounded-md py-2 pl-9 pr-4 text-sm text-blue-100 placeholder:text-blue-300 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                placeholder="Search Capacity..."
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2">
              Create <ChevronDown className="w-3 h-3" />
            </button>
            <HelpCircle className="w-5 h-5 text-blue-200" />
            <Gift className="w-5 h-5 text-blue-200" />
            <Avatar className="w-8 h-8 border-2 border-blue-400">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-blue-900">CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* 3. The "White Card" Workspace */}
        <main className="flex-1 bg-white rounded-tl-2xl overflow-hidden shadow-2xl mr-2 mb-2 relative flex flex-col">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <div className="flex flex-col h-full overflow-hidden">

                {/* Main 2-Pane Content area (Sidebar is pane 1 handled by SidebarProvider) */}
                <div className="flex flex-1 overflow-hidden">

                  <div className={`
                        w-full md:w-80 lg:w-96 border-r bg-white shrink-0 flex flex-col
                        ${selectedTicketId ? 'hidden md:flex' : 'flex'}
                     `}>
                    <TicketList
                      tickets={tickets}
                      selectedId={selectedTicketId}
                      onSelect={setSelectedTicketId}
                    />
                  </div>

                  <div className={`
                        flex-1 flex flex-col min-w-0 bg-slate-50
                        ${!selectedTicketId ? 'hidden md:flex' : 'flex'}
                     `}>
                    {selectedTicket ? (
                      <TicketDetail
                        ticket={selectedTicket}
                        checkpoints={checkpoints}
                        onCheckpointToggle={handleToggleCheckpoint}
                        onBack={() => setSelectedTicketId(undefined)}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        Select a ticket to view details.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </main>
      </div>
    </div>
  )
}

function RailIcon({ icon: Icon, active }: { icon: any, active?: boolean }) {
  return (
    <button className={`p-2 rounded-lg transition-colors ${active ? 'bg-orange-500 text-white shadow-md' : 'hover:bg-blue-800 text-blue-300'}`}>
      <Icon className="w-5 h-5" />
    </button>
  )
}
