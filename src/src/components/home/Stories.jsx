import HorizontalScrollSection from "@/components/common/HorizontalScrollSection";

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
                <video key={story.id} src={story.video.uri} controls className="snap-center" />
            )) )}
            renderHeader={() => ( <h1 className="text-lg font-semibold text-primary-950">Stories</h1> )}
            styles={{ main: "h-[300px] align-end",  }}
        />
    )
}

export default Stories