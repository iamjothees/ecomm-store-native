import { useContext, useEffect } from "react";
import ScreenContext from "@/contexts/ScreenContext";

const dummyCategories = [
    {id: 1, name: "Category 1", imageSrc: "https://picsum.photos/200/300"},
    {id: 2, name: "Category 2", imageSrc: "https://picsum.photos/200/300"},
    {id: 3, name: "Category 3", imageSrc: "https://picsum.photos/200/300"},
    {id: 4, name: "Category 4", imageSrc: "https://picsum.photos/200/300"},
    {id: 5, name: "Category 5", imageSrc: "https://picsum.photos/200/300"},
    {id: 6, name: "Category 6", imageSrc: "https://picsum.photos/200/300"},
    {id: 7, name: "Category 7", imageSrc: "https://picsum.photos/200/300"},
    {id: 8, name: "Category 8", imageSrc: "https://picsum.photos/200/300"},
    {id: 9, name: "Category 8", imageSrc: "https://picsum.photos/200/300"},
    {id: 10, name: "Category 8", imageSrc: "https://picsum.photos/200/300"},
    {id: 11, name: "Category 8", imageSrc: "https://picsum.photos/200/300"},
    {id: 12, name: "Category 8", imageSrc: "https://picsum.photos/200/300"},
    {id: 13, name: "Category 8", imageSrc: "https://picsum.photos/200/300"},
    {id: 14, name: "Category 8", imageSrc: "https://picsum.photos/200/300"},
    {id: 15, name: "Category 8", imageSrc: "https://picsum.photos/200/300"},
    {id: 16, name: "Category 8", imageSrc: "https://picsum.photos/200/300"},
];

function Categories() {
    const { setScreen } = useContext(ScreenContext);

    useEffect(() => { setScreen({ screenTitle: "Categories" }); }, []);

    return (
        <>
            <main className="pt-18">
                SearchBar
            </main>
        </>
    )
}

export default Categories