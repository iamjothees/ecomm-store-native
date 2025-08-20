import { useEffect } from "react";
import Explore from "@/features/products/components/Explore"
import useScreenContext from "@/contexts/ScreenContext";


function recentlyViewed() {
    const { defaultScreen, setScreen } = useScreenContext();

    useEffect(() => {
        setScreen(() => ({ ...defaultScreen, screenTitle: "Recently Viewed Products", loading: true }));
    }, []);

    return (
        <section className="flex-1 flex flex-col gap-3 pt-18 px-4">
            <Explore config={{ apiEndpoint: "/recently-viewed-products", title: "Recently Viewed Products" }} />
        </section>
    )
}

export default recentlyViewed