import { cn } from "@/lib/utils"
import { ChevronRight, ChevronRightCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

function HorizontalScrollSection( { renderMain, renderHeader=null, renderFooter=null, styles={}, hideIndicator=false } ) {
    const scrollContainerRef = useRef(null);
    const scrollIdentifierEl = useRef(null);
    const observer = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);

    // initialize observer
    useEffect(() => {
        if ( hideIndicator !== false ) return;
        const container = scrollContainerRef.current;
        const target = scrollIdentifierEl.current;

        if (!container || !target) return;

        // Only show indicator if scrollable
        if (container.scrollWidth <= container.clientWidth) {
            setIsScrolled(true);
            return;
        }

        observer.current = new IntersectionObserver(
            (entries) => entries.forEach(entry => {
                if (entry.isIntersecting === false) {
                    setIsScrolled(true)
                }
            }),
            { root: container, threshold: 0.1 }
        );

        observer.current.observe(target);

        return () => {
            if(observer.current) {
                observer.current.disconnect();
            }
        }
    }, []);

    // unobserve when scrolled
    useEffect(() => {
        if (isScrolled && observer.current) {
            observer.current.disconnect();
        }
     }, [ isScrolled ]);


    return (
        <section className={cn("w-full py-2", styles.container)}>
            {
                renderHeader &&
                <header className={cn("flex justify-between items-center mb-2 px-3", styles.header)}>
                    {renderHeader()}
                </header>
            }

            <main ref={scrollContainerRef} className={cn("relative flex scroll-horizontal gap-3 px-3 pb-2", styles.main)}>
                <div ref={scrollIdentifierEl} className="absolute left-0 h-full w-0.5 opacity-0"></div>
                {renderMain()}
                {
                    hideIndicator === false && isScrolled === false &&
                    <ChevronRight
                        size={30} 
                        className={cn(
                            `
                                z-10 absolute top-1/2 -translate-y-1/2 right-3 animate-bounce
                                h-8 aspect-square rounded-full pointer-events-none
                                bg-gray-200/50 border border-black
                            `,
                            styles.indicator
                        )}
                    />
                }
            </main>
            {
                renderFooter &&
                <footer className={cn("flex justify-between items-center px-3", styles.footer)}>
                    {renderFooter()}
                </footer>
            }
        </section>
    )
}

export default HorizontalScrollSection