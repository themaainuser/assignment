export interface Ticket {
    id: string
    title: string
    status: 'To Do' | 'In Progress' | 'Done'
    priority: 'Low' | 'Medium' | 'High'
    assignee?: string
    date: string
    tags: string[]
}

export interface Checkpoint {
    id: string
    title: string
    completed: boolean
}
