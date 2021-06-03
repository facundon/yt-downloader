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
