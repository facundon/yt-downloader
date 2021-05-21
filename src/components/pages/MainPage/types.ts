type YouTubeThumbnailsData = {
   url: string
   width: number
   height: number
}

export type YouTubeItem = {
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
         default: YouTubeThumbnailsData
         medium: YouTubeThumbnailsData
         high: YouTubeThumbnailsData
      }
   }
}

export type YouTubeResponseData = {
   etag: string
   items: YouTubeItem[]
   kind: "youtube#searchListResponse"
   nexPageToken: string
   regionCode: string
   pageInfo: {
      resultsPerPage: number
      totalResults: number
   }
}
