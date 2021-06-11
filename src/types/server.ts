export type Video = {
   id: number
   videoId: string
   title: string
}

export type User = {
   name: string
   email: string
   videos: Video[]
}

export type WebSocketMessage = {
   status: "recieved" | "ready" | "error"
   value: string
}
