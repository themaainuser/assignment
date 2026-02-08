import type { Checkpoint } from "@/types"
import { Check } from "lucide-react"

interface CheckpointsProps {
    items: Checkpoint[]
    onToggle: (id: string) => void
}

export function Checkpoints({ items, onToggle }: CheckpointsProps) {
    return (
        <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-500 mb-2">Tasks</h3>
            {items.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer group"
                    onClick={() => onToggle(item.id)}
                >
                    <div className={`
            w-5 h-5 rounded-full flex items-center justify-center border
            ${item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 group-hover:border-gray-400'}
          `}>
                        {item.completed && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-sm ${item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        {item.title}
                    </span>
                </div>
            ))}
        </div>
    )
}
