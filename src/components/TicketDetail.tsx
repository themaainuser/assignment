
import type { Ticket, Checkpoint } from "@/types"
import { Checkpoints } from "./Checkpoints"
import { ReplyBox } from "./ReplyBox"
import { Button } from "@/components/ui/button"
import {
    MoreHorizontal,
    Share,
    Star,
    ArrowLeft
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface TicketDetailProps {
    ticket?: Ticket
    checkpoints: Checkpoint[]
    onCheckpointToggle: (id: string) => void
    onBack?: () => void
}

export function TicketDetail({ ticket, checkpoints, onCheckpointToggle, onBack }: TicketDetailProps) {


    if (!ticket) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-400">
                Select a ticket to view details
            </div>
        )
    }


    return (
        <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
            {/* Header */}
            <header className="bg-white border-b px-4 py-3 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-3">
                    {/* Back Button for Mobile */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={onBack}
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </Button>

                    <div>
                        <h1 className="text-lg md:text-xl font-bold text-slate-800 line-clamp-1">{ticket.title}</h1>
                        <span className="text-xs md:text-sm text-slate-400 font-mono">#{ticket.id}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Star className="w-5 h-5 text-gray-400" /></Button>
                    <Button variant="ghost" size="icon"><Share className="w-5 h-5 text-gray-400" /></Button>
                    <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5 text-gray-400" /></Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">To Do</Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">

                <div className="flex-1 overflow-y-auto bg-slate-50">

                    <ReplyBox />

                    <div className="p-6 space-y-6">
                        <div className="bg-white rounded-lg border p-4 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-3">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h4 className="font-semibold text-sm">Allie Harmon</h4>
                                        <p className="text-xs text-gray-500">reported this issue</p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">Nov 14, 2022</span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Ex beatae aliquid mollitia. Enim doloremque molestiae voluptatem recusandae.
                                Maxime beatae nostrum ut. Deserunt totam aut nihil quo beatae.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Right Sidebar (Properties) */}
                <div className="w-80 bg-white border-l p-4 overflow-y-auto hidden xl:block">
                    <div className="space-y-6">

                        {/* Properties Section */}
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Priority</label>
                                <div className="flex items-center gap-2 p-2 border rounded-md bg-white">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                    <span className="text-sm">{ticket.priority}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Assigned To</label>
                                <div className="flex items-center gap-2 p-2 border rounded-md bg-white">
                                    <Avatar className="w-6 h-6">
                                        <AvatarFallback>AH</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">{ticket.assignee || 'Unassigned'}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Ticket Type</label>
                                <div className="flex items-center gap-2 p-2 border rounded-md bg-white">
                                    <div className="w-4 h-4 bg-purple-100 text-purple-600 rounded flex items-center justify-center">?</div>
                                    <span className="text-sm">Task</span>
                                </div>
                            </div>
                        </div>

                        <Separator />
                        <Checkpoints items={checkpoints} onToggle={onCheckpointToggle} />

                    </div>
                </div>
            </div>
        </div>
    )
}
