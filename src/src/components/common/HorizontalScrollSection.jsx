import { cn } from "@/lib/utils"
import { ChevronRightCircle } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

function HorizontalScrollSection( { renderMain, renderHeader=null, renderFooter=null, styles={}, hideIndicator=false } ) {
    const scrollIdentifierEl = useRef(null);
    const observer = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);

    // initialize observer
    useEffect(() => { 
        if ( hideIndicator !== false ) return;
        if (!scrollIdentifierEl.current) return;

        observer.current = new IntersectionObserver(
            (entries) => entries.forEach(entry => entry.isIntersecting === false && setIsScrolled(true)), 
            { threshold: 0.1 }
        );

        observer.current.observe(scrollIdentifierEl.current);
    }, []);

    // unobserve when scrolled
    useEffect(() => { if (isScrolled) observer.current.unobserve(scrollIdentifierEl.current); }, [ isScrolled ]);


    return (
        <section className={cn("w-full py-2", styles.container)}>
            {
                renderHeader &&
                <header className={cn("flex justify-between items-center mb-2 px-3", styles.header)}>
                    {renderHeader()}
                </header>
            }

            <main className={cn("relative flex scroll-horizontal gap-3 px-3 pb-2", styles.main)}>
                <div ref={scrollIdentifierEl} className="absolute left-0 h-full w-0.5 opacity-0"></div>
                {renderMain()}
                {
                    hideIndicator === false && isScrolled === false &&
                    <ChevronRightCircle 
                        size={30} 
                        className={cn(
                            `
                                z-10 absolute top-1/2 -translate-y-1/2 right-3 animate-bounce
                                h-8 aspect-square rounded-full pointer-events-none
                                bg-primary-200/80 text-primary-800
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