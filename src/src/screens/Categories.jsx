import VerticalScrollSection from "@/components/common/VerticalScrollSection";
import ImageWithFallback from "@/components/common/ImageWithFallback";

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
  return (
    <>
        <header className="sticky top-0 h-20 bg-red-500"></header>
        <main className="ms-2 ps-24 grow flex flex-col">
            <aside className="absolute left-0 h-full">
                <VerticalScrollSection 
                    renderMain={() => ( 
                        <>
                            <div className="w-20 aspect-square rounded-full bg-blue-500 shadow-md flex items-center justify-center snap-center object-cover"/>
                            {

                                dummyCategories.map((category) => (
                                    // <ImageWithFallback
                                    //   key={category.id}
                                    //   src={category.imageSrc}
                                    //   fallbackSrc={"#"}
                                    //   alt={category.name}
                                    //   className="h-16 aspect-square rounded-full bg-card shadow-md flex items-center justify-center snap-center object-cover"
                                    // />
                                    <div key={category.id} className="w-20 aspect-square rounded-full bg-card shadow-md flex items-center justify-center snap-center object-cover"/>
                                ))
                            }
                            <div className="w-20 aspect-square rounded-full bg-green-500 shadow-md flex items-center justify-center snap-center object-cover"/>

                        </>
                    )}
                    styles={{container: "h-full z-50 bg-primary-200 px-3 pb-20", main: "gap-4"}}
                    showIndicator
                />
            </aside>
            Sub Categories
        </main>
    </>
  )
}

export default Categories