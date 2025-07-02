import HorizontalScrollSection from "@/components/common/HorizontalScrollSection";
import { Play } from "lucide-react";

const dummyStories = [
    {
        id: 1,
        title: "The best products",
        video: { uri: "https://videos.pexels.com/video-files/4620563/4620563-uhd_1440_2732_25fps.mp4" },
    },
    {
        id: 2,
        title: "The best products",
        video: { uri: "https://videos.pexels.com/video-files/4620568/4620568-uhd_2732_1440_25fps.mp4" },
    },
    {
        id: 3,
        title: "The best products",
        video: { uri: "https://videos.pexels.com/video-files/4620563/4620563-uhd_1440_2732_25fps.mp4" },
    },
];

function Stories() {
    return (
        <HorizontalScrollSection 
            renderMain={() => ( dummyStories.map((story) => ( 
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