import ImageWithFallback from "@/components/common/ImageWithFallback";
import { getHeroItems } from "@/features/screens/services/homeScreenServices";
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

function Hero() {
    const [items, setItems] = useState(undefined);
    const [api, setApi] = useState(null)
    const [current, setCurrent] = useState(0)

    const plugin = React.useRef(
        Autoplay({ delay: 3500, stopOnInteraction: true })
    )

    useEffect(() => {
        getHeroItems()
            .then((data) => setItems(data))
    }, []);

    useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])


    if (items === undefined) return <HeroSkeleton />;

    if (items.length === 0) return null;

    const scrollTo = (index) => {
        api && api.scrollTo(index);
    }

    return (
        <section className="w-full h-50 flex flex-col">
            <Carousel
                setApi={setApi}
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {
                        items.map((item) => (
                            <CarouselItem key={item.id} className="grow shrink-0 h-full w-screen snap-center flex justify-center">
                                <ImageWithFallback
                                    className="h-full max-w-[98%] bg-card rounded-lg object-cover"
                                    src={item.image.uri}
                                />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
            <footer>
                <div className="flex gap-3 justify-center">
                    {
                        items.map((item, index) => (
                            <div key={item.id}
                                onClick={() => scrollTo(index)}
                                className={cn("h-2 bg-primary-800 rounded-full my-1 cursor-pointer", current === index ? "w-5" : "w-2")}
                            />
                        ))
                    }
                </div>
            </footer>
        </section>
    )
}

export default Hero

const HeroSkeleton = () => {
    return (
        <section className="w-full h-50 flex flex-col">
            <main className="grow flex gap-3 py-3 scroll-horizontal">
                <div className="grow shrink-0 h-full w-screen snap-center flex justify-center">
                    <Skeleton className="h-full max-w-[98%] bg-card rounded-lg object-cover w-full mx-2 bg-primary-300" />
                </div>
            </main>
            <footer>
                <div className="flex gap-3 justify-center">
                    <div className="h-2 bg-primary-800 rounded-full my-1 w-5" />
                    <div className="h-2 bg-primary-800 rounded-full my-1 w-2" />
                    <div className="h-2 bg-primary-800 rounded-full my-1 w-2" />
                </div>
            </footer>
        </section>
    )
}

export { HeroSkeleton }