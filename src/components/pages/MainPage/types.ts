export type YouTubeResponseData = {
   etag: string
   items: {
      kind: "youtube#searchResult"
      etag: string
      id: {
         kind: string
         videoId: string
         channelId: string
         playlistId: string
      }
      snippet: {
         publishedAt: Date
         channelId: string
         title: string
         description: string
         thumbnails: {
            (key: "default" | "high" | "medium"): {
               url: string
               width: number | undefined
               height: number | undefined
            }
         }
      }
   }[]
   kind: "youtube#searchListResponse"
   nexPageToken: string
   regionCode: string
   pageInfo: {
      resultsPerPage: number
      totalResults: number
   }
}
