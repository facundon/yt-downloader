export const ytWatchUrl = "https://youtube.com/watch?v="
export const wsBackendUrl = `ws${
   process.env.NODE_ENV === "production" ? "s" : ""
}://${process.env.REACT_APP_BACKEND_API?.replace(/^https?:\/\//g, "")}`

export const wsTimeout = 1000
declare global {
   interface Window {
      fbAsyncInit: () => void
   }
}
