import type { Ticket, Checkpoint } from "@/types"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface TicketListProps {
    tickets: Ticket[]
    selectedId?: string
    onSelect: (id: string) => void
}

export const MOCK_TICKETS: Ticket[] = [
    { id: "APPS-216", title: "Soluta quam velit", status: "To Do", priority: "High", date: "Jun 2", tags: ["Bug"] },
    { id: "OPS-102", title: "Laudantium neque veritatis", status: "In Progress", priority: "Medium", date: "Jun 2", tags: ["Feature"] },
    { id: "APPS-217", title: "Molestiae saepe illum", status: "To Do", priority: "Low", date: "Jun 1", tags: ["Task"] },
    { id: "APPS-218", title: "Dignissimos maiores porro", status: "To Do", priority: "Medium", date: "May 31", tags: ["Bug"] },
    { id: "APPS-219", title: "Nihil porro repudiandae", status: "Done", priority: "Low", date: "May 31", tags: ["Task"] },
];

export const MOCK_CHECKPOINTS: Checkpoint[] = [
    { id: "1", title: "Research the issue", completed: true },
    { id: "2", title: "Propose a solution", completed: false },
    { id: "3", title: "Implement the fix", completed: false },
    { id: "4", title: "Verify in staging", completed: false },
];

export function TicketList({ tickets, selectedId, onSelect }: TicketListProps) {
    return (
        <div className="flex flex-col h-full bg-white border-r">
            <div className="p-4 border-b space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-lg">My Tickets</h2>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        {tickets.length}
                    </span>
                </div>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search tickets"
                        className="pl-9 bg-gray-50 border-gray-200"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {tickets.map((ticket) => (
                    <div
                        key={ticket.id}
                        onClick={() => onSelect(ticket.id)}
                        className={`
              p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors
              ${selectedId === ticket.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}
            `}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-xs text-gray-500 font-medium">{ticket.id}</span>
                            <span className="text-xs text-gray-400">{ticket.date}</span>
                        </div>
                        <h3 className={`font-medium text-sm mb-2 ${selectedId === ticket.id ? 'text-blue-900' : 'text-gray-900'}`}>
                            {ticket.title}
                        </h3>
                        <div className="flex items-center gap-2">
                            <Badge status={ticket.status} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Badge({ status }: { status: string }) {
    const styles = {
        'To Do': 'bg-gray-100 text-gray-600',
        'In Progress': 'bg-blue-100 text-blue-600',
        'Done': 'bg-green-100 text-green-600'
    }
    return (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[status as keyof typeof styles] || 'bg-gray-100'}`}>
            {status}
        </span>
    )
}
