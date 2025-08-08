import HorizontalScrollSection from "@/components/common/HorizontalScrollSection";
import { Play } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { getStories } from "@/features/screens/services/homeScreenServices";

function Stories() {
    const [stories, setStories] = useState(undefined);

    useEffect(() => {
        getStories()
            .then((data) => setStories(data));
    }, []);

    if (stories === undefined) return <StoriesSkeleton />;

    if (stories.length === 0) return null;

    return (
        <HorizontalScrollSection 
            renderMain={() => ( stories.map((story) => ( 
                // <video key={story.id} src={story.video.uri} controls className="snap-center" />
                <div key={story.id} className="shrink-0 snap-center w-[180px] bg-primary-300 flex justify-center items-center">
                    <Play className="text-primary-950 w-12 h-12 rounded-full border border-primary-950 p-2.5" />
                </div>
            )) )}
            renderHeader={() => ( <h1 className="text-lg font-semibold text-primary-950">Stories</h1> )}
            styles={{ main: "h-[300px] align-end",  }}
        />
    )
}

export default Stories

const StoriesSkeleton = () => {
    return (
        <HorizontalScrollSection 
            renderMain={() => ( [...Array(4).keys()].map((_, index) => ( 
                <Skeleton key={index} className="shrink-0 snap-center w-[180px] bg-primary-300 flex justify-center items-center">
                    <Play className="text-primary-950 w-12 h-12 rounded-full border border-primary-950 p-2.5" />
                </Skeleton>
            )) )}
            renderHeader={() => ( <h1 className="text-lg font-semibold text-primary-950">Stories</h1> )}
            styles={{ main: "h-[300px] align-end",  }}
        />
    )

}