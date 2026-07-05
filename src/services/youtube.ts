
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const CHANNEL_IDS = [
    "UCpzSzORldDhA7ZTZNQSgNbA",
    "UC2npA5vRTlXA9mFInIM8gKw",
    "UCeaKRrrpWiQFJJmiuon2WoQ",
    "UCXcd2DfDpIhVc6Q1zHHLWUA",
    "UCH3bOkIzCdFmKX6wk7AOBxw",
    "UCuVuHrghkZeJHQTjesosDJA",
    "UCX58RgTIbu7_kfip8V09MoA",
    "UCzMisd9MGyxpjOR0Tf3vn_A",
    "UCSbyncU597LMwb3HhnAI_4w",
    "UC9V_-gqJsZNOy4v_HqbRz3w",
    "UC0nChSOqQbA6tAi8_K7pD_A",
];

export interface YouTubeVideo {
    id: string;
    title: string;
    channel: string;
    category: string;
    duration: string;
    thumbnail: string;
    url: string;
    language?: string;
}

export async function fetchLatestVideos(): Promise<YouTubeVideo[]> {
    try {
        const requests = CHANNEL_IDS.map((channelId) =>
            fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${API_KEY}`
            ).then((res) => res.json())
        );

        const results = await Promise.all(requests);

        const videos: YouTubeVideo[] = [];

        results.forEach((result) => {
            if (!result.items) return;

            result.items.forEach((item: any) => {
                videos.push({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    channel: item.snippet.channelTitle,
                    category: "Farmers",
                    duration: "Latest",
                    thumbnail:
                        item.snippet.thumbnails?.high?.url ||
                        item.snippet.thumbnails?.medium?.url ||
                        item.snippet.thumbnails?.default?.url,
                    url: `https://www.youtube.com/embed/${item.id.videoId}`,
                });
            });
        });

        return videos.sort(() => Math.random() - 0.5);
    } catch (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
}

export async function searchYouTubeVideos(
    query: string
): Promise<YouTubeVideo[]> {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&q=${encodeURIComponent(
                query + " farming agriculture gardening"
            )}&key=${API_KEY}`
        );

        const data = await response.json();

        if (!data.items) return [];

        return data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            channel: item.snippet.channelTitle,
            category: "Search Result",
            duration: "YouTube",
            thumbnail:
                item.snippet.thumbnails?.high?.url ||
                item.snippet.thumbnails?.medium?.url ||
                item.snippet.thumbnails?.default?.url,
            url: `https://www.youtube.com/embed/${item.id.videoId}`,
        }));
    } catch (error) {
        console.error("YouTube search failed:", error);
        return [];
    }
}

