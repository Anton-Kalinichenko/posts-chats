import {useMemo} from 'react';
import {getPageCount} from '../utils/pages';

export const usePagination = (itemCount, itemsPerPage) => {
    const totalPages = getPageCount(itemCount, itemsPerPage);
    const pagesArray = useMemo(() => {
        let pages = [];

        for (let i = 0; i < totalPages; i++) {
            pages.push(i + 1);
        }

        return pages;
    }, [itemCount]);

    return pagesArray;
}
