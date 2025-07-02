import { cn } from "@/lib/utils"
import { ChevronDownCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react"

function VerticalScrollSection( { renderMain, styles={}, showIndicator=false } ) {
    const scrollIdentifierEl = useRef(null);
    const observer = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);

    // initialize observer
    useEffect(() => { 
        if (showIndicator === false) return;
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
        <section className={cn("h-full px-2", styles.container)}>
            <main className={cn("h-full relative flex flex-col overflow-y-scroll gap-3 py-3", styles.main)}>
                <div ref={scrollIdentifierEl} className="absolute top-0 w-full h-0.5 opacity-0"></div>
                {renderMain()}
                {
                    showIndicator !== false && isScrolled === false &&
                    <ChevronDownCircle size={30} 
                        className={cn(
                            `
                                z-10 absolute left-1/2 -translate-x-1/2 bottom-3 animate-bounce
                                h-8 aspect-square rounded-full pointer-events-none
                                bg-primary-200/80 text-primary-800
                            `,
                            styles.indicator
                        )}
                    />
                }
            </main>
        </section>
    )
}

export default VerticalScrollSection