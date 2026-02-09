import { useState, useRef, type KeyboardEvent } from "react"
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

// Mock Users Data
interface User {
    id: string
    name: string
    email: string
    avatar?: string
}

const MOCK_USERS: User[] = [
    { id: "1", name: "Alice Westervelt", email: "awestervelt@email.com", avatar: "https://github.com/shadcn.png" },
    { id: "2", name: "Bob Smith", email: "bob.smith@example.com" },
    { id: "3", name: "Charlie Brown", email: "charlie@peanuts.com" },
    { id: "4", name: "Diana Prince", email: "diana@themyscira.com" },
    { id: "5", name: "Evan Wright", email: "evan.wright@news.com" },
]

export function ReplyBox() {
    const [value, setValue] = useState("")
    const [showMentions, setShowMentions] = useState(false)
    const [mentionQuery, setMentionQuery] = useState("")
    const [mentionIndex, setMentionIndex] = useState(0)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const filteredUsers = MOCK_USERS.filter(user =>
        user.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(mentionQuery.toLowerCase())
    )

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value
        setValue(newValue)

        const cursorIndex = e.target.selectionStart
        const textBeforeCursor = newValue.substring(0, cursorIndex)
        const lastAt = textBeforeCursor.lastIndexOf("@")

        if (lastAt !== -1) {
            const query = textBeforeCursor.substring(lastAt + 1)
            if (!query.includes("\n") && query.length < 20) {
                setMentionQuery(query)
                setShowMentions(true)
                setMentionIndex(0)
                if (textareaRef.current) {

                }
                return
            }
        }
        setShowMentions(false)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (showMentions) {
            if (e.key === "ArrowDown") {
                e.preventDefault()
                setMentionIndex(prev => (prev + 1) % filteredUsers.length)
            } else if (e.key === "ArrowUp") {
                e.preventDefault()
                setMentionIndex(prev => (prev - 1 + filteredUsers.length) % filteredUsers.length)
            } else if (e.key === "Enter" || e.key === "Tab") {
                e.preventDefault()
                if (filteredUsers.length > 0) {
                    selectUser(filteredUsers[mentionIndex])
                }
            } else if (e.key === "Escape") {
                setShowMentions(false)
            }
        }
    }

    const selectUser = (user: User) => {
        const cursorIndex = textareaRef.current?.selectionStart || 0
        const textBeforeCursor = value.substring(0, cursorIndex)
        const lastAt = textBeforeCursor.lastIndexOf("@")

        const newValue =
            value.substring(0, lastAt) +
            `@${user.name} ` +
            value.substring(cursorIndex)

        setValue(newValue)
        setShowMentions(false)
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus()
                // Cursor position: before @ + name + space
                const newCursorPos = lastAt + user.name.length + 2
                textareaRef.current.setSelectionRange(newCursorPos, newCursorPos)
            }
        }, 0)
    }

    return (
        <div className="bg-white border rounded-lg shadow-sm m-6 mb-0 relative">
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
                    ref={textareaRef}
                    value={value}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    className="w-full h-full resize-none outline-none text-sm text-gray-700 placeholder:text-gray-400 min-h-[80px]"
                    placeholder="Add a reply..."
                />

                {/* Mentions Dropdown */}
                {showMentions && filteredUsers.length > 0 && (
                    <div className="absolute left-4 top-16 z-20 w-64 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
                        {filteredUsers.map((user, index) => (
                            <button
                                key={user.id}
                                onClick={() => selectUser(user)}
                                className={`w-full text-left px-3 py-2 flex items-center gap-2 text-sm hover:bg-blue-50 transition-colors ${index === mentionIndex ? "bg-blue-50" : ""
                                    }`}
                            >
                                <Avatar className="w-6 h-6">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="font-medium text-slate-800">{user.name}</span>
                                    <span className="text-xs text-slate-500">{user.email}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
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
