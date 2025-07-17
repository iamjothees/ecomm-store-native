import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function usePagination() {
    const [page, setPage] = useState({
        perPage: 10,
        current: null,
        loading: false,
        error: false,
        endReached: false
    });

    const { ref, inView } = useInView({ threshold: 0.6, });

    const initiatePage = () => setPage({ ...page, current: 1, endReached: false, loading: false});
    const moveNextPage = () => {
        if (page.current === null) return;
        if (page.error) return;
        if (page.endReached) return;
        if (page.loading) return;

        setPage({ ...page, current: page.current + 1});
    };

    const resetPage = () => setPage({ ...page, current: null, endReached: false, loading: false});
    const handlePageEndReached = () => setPage({ ...page, current: page.current - 1, endReached: true, loading: false});
    const handlePageError = () => setPage({ ...page, error: true, loading: false});
    const handlePageLoading = () => setPage({ ...page, loading: true});
    const handlePageLoaded = () => setPage({ ...page, loading: false});



    useEffect(() => {
        if (!inView) return;
        if (page.loading || page.endReached) return;

        setPage({ ...page, current: page.current + 1 });
    }, [inView]);

    return { page, initiatePage, moveNextPage, resetPage, handlePageEndReached, handlePageError, handlePageLoading, handlePageLoaded, nextPageTrigger: ref };
}

export default usePagination