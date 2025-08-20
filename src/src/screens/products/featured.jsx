import { useEffect } from "react";
import Explore from "@/features/products/components/Explore"
import useScreenContext from "@/contexts/ScreenContext";


function featured() {
    const { defaultScreen, setScreen } = useScreenContext();

    useEffect(() => {
        setScreen(() => ({ ...defaultScreen, screenTitle: "Featured Products", loading: true }));
    }, []);

    return (
        <section className="flex-1 flex flex-col gap-3 pt-18 px-4">
            <Explore config={{ apiEndpoint: "/featured-products", title: "Featured Products" }} />
        </section>
    )
}

export default featured