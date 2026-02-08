import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Bold,
    Italic,
    Underline,
    Image as ImageIcon,
    Paperclip,
    Send,
    X,
    FileText,
    MessageSquarePlus,
    Forward
} from "lucide-react"

export function ReplyBox() {
    return (
        <div className="bg-white border rounded-lg shadow-sm m-6 mb-0">
            <div className="flex border-b">
                <button className="px-4 py-2.5 text-sm font-semibold text-gray-800 border-b-2 border-blue-600">
                    Public Reply
                </button>
                <button className="px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Private Comment
                </button>
            </div>

            {/* Recipients */}
            <div className="p-3 flex items-center gap-2 border-b bg-gray-50/50">
                <span className="text-sm text-gray-500 font-medium">To:</span>
                <div className="flex items-center gap-2 bg-white border rounded-full pl-1 pr-2 py-0.5 shadow-sm">
                    <Avatar className="w-5 h-5">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>AW</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-slate-700">Allison Westervolt &lt;awestervelt@email.com&gt;</span>
                    <button className="ml-1 text-gray-400 hover:text-gray-600">
                        <X className="w-3 h-3" />
                    </button>
                </div>
                <div className="ml-auto text-sm text-gray-500 font-medium">Cc</div>
            </div>

            {/* Editor Area */}
            <div className="p-4 min-h-[120px] relative">
                <textarea
                    className="w-full h-full resize-none outline-none text-sm text-gray-700 placeholder:text-gray-400 min-h-[80px]"
                    placeholder="Add a reply..."
                />
            </div>

            {/* Toolbar */}
            <div className="px-3 py-2 flex items-center justify-between border-t bg-gray-50/30">
                <div className="flex items-center gap-1">
                    <ToolbarButton icon={Bold} />
                    <ToolbarButton icon={Italic} />
                    <ToolbarButton icon={Underline} />
                    <ToolbarButton icon={ImageIcon} />
                    <ToolbarButton icon={Paperclip} />
                    <ToolbarButton icon={FileText} />
                    <ToolbarButton icon={MessageSquarePlus} />
                    <ToolbarButton icon={Forward} />
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-600">Add to KB</span>
                        <div className="w-4 h-4 border flex items-center justify-center border-gray-400 cursor-pointer" />
                    </div>
                    <Button size="icon" className="h-8 w-8 bg-slate-100 hover:bg-slate-200 text-slate-600 shadow-none border">
                        <Send className="w-4 h-4 ml-0.5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

function ToolbarButton({ icon: Icon }: { icon: any }) {
    return (
        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
            <Icon className="w-4 h-4" />
        </button>
    )
}
