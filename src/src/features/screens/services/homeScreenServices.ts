interface HeroItem {
    id: number;
    title: string;
    image: { uri: string };
}

export const getHeroItems = async (): Promise<HeroItem[]> => {
    const dummyHeroItems : HeroItem[] = [
        {
            id: 1,
            title: "Hero Item 1",
            image: { uri: "https://picsum.photos/500/200?random=1" },
        },
        {
            id: 2,
            title: "Hero Item 2",
            image: { uri: "https://picsum.photos/500/200?random=2" },
        },
        {
            id: 3,
            title: "Hero Item 3",
            image: { uri: "https://picsum.photos/500/200?random=3" },
        },
        {
            id: 4,
            title: "Hero Item 4",
            image: { uri: "https://picsum.photos/500/200?random=4" },
        },
        {
            id: 5,
            title: "Hero Item 5",
            image: { uri: "https://picsum.photos/500/200?random=5" },
        },
    ];
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dummyHeroItems);
        }, 1000);
    })
}

interface StoryItem {
    id: number;
    title: string;
    video: { uri: string };
}

export const getStories = async (): Promise<StoryItem[]> => {
    const dummyStories : StoryItem[] = [
        {
            id: 1,
            title: "The best products",
            video: { uri: "https://videos.pexels.com/video-files/4434242/4434242-uhd_1440_2560_24fps.mp4" },
        },
        {
            id: 2,
            title: "The best products",
            video: { uri: "https://videos.pexels.com/video-files/3959544/3959544-uhd_1440_2732_25fps.mp4" },
        },
        {
            id: 3,
            title: "The best products",
            video: { uri: "https://videos.pexels.com/video-files/2785536/2785536-uhd_1440_2560_25fps.mp4" },
        },
        {
            id: 4,
            title: "The best products",
            video: { uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
        },
    ];

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dummyStories);
        }, 4000);
    })
}