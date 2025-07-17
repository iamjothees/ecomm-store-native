import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { show } from '@/services/categoryService';
import ScreenContext from "@/contexts/ScreenContext";

function Category() {
    const { setScreen } = useContext(ScreenContext);
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    

    

    useEffect(() => {
        show({ slug }).then(category => setCategory(category));
    }, [slug]);

    useEffect(() => { 
        if (category === null) return
        setScreen({ screenTitle: category.name }); 
    }, [category]);

    return (
        <div>Category</div>
    )
}

export default Category