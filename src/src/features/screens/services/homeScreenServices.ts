import { testHomeScreenContents } from "@/tests/data";

interface HeroItem {
    id: number;
    title: string;
    image: { uri: string };
}

export const getHeroItems = async (): Promise<HeroItem[]> => {
    const heroItems : HeroItem[] = testHomeScreenContents.heroItems;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(heroItems);
        }, 1000);
    })
}

interface StoryItem {
    id: number;
    title: string;
    video: { uri: string };
}

export const getStories = async (): Promise<StoryItem[]> => {
    const stories : StoryItem[] = testHomeScreenContents.storyItems;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(stories);
        }, 4000);
    })
}