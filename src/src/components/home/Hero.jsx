import ImageWithFallback from "@/components/common/ImageWithFallback";
import { cn } from "@/lib/utils"

const dummyHeroItems = [
    {
        id: 1,
        title: "Hero Item 1",
        image: { uri: "https://picsum.photos/500/200" },
    },
    {
        id: 2,
        title: "Hero Item 2",
        image: { uri: "https://picsum.photos/500/200" },
    },
    {
        id: 3,
        title: "Hero Item 3",
        image: { uri: "https://picsum.photos/500/200" },
    },
    {
        id: 4,
        title: "Hero Item 4",
        image: { uri: "https://picsum.photos/500/200" },
    },
    {
        id: 5,
        title: "Hero Item 5",
        image: { uri: "https://picsum.photos/500/200" },
    },
]
function Hero() {
    
    return (
        <section className="w-full h-50 flex flex-col">
            <main className="grow flex gap-3 py-3 scroll-horizontal">
                {
                    dummyHeroItems.map((item) => (
                        <div key={item.id} className="grow shrink-0 h-full w-screen snap-center flex justify-center">
                            <ImageWithFallback 
                                className="h-full max-w-[98%] bg-card rounded-lg object-cover"
                                src={item.image.uri}
                            />
                        </div>
                    ))
                }
            </main>
            <div>
                <div className="flex gap-3 justify-center">
                    {
                        dummyHeroItems.map((item) => (
                            <div key={item.id} 
                                className={cn("h-2 bg-primary-800 rounded-full my-1", item.id === 2 ? "w-5" : "w-2")} 
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Hero