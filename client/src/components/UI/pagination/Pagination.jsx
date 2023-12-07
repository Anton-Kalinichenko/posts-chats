import React from 'react';
import SimpleLink from '../link/SimpleLink';
import cl from './Pagination.module.css';
import {usePagination} from '../../../hooks/usePagination';

const Pagination = ({itemsCount, itemsPerPage, currentPage, selectPage}) => {
    const pagesArray = usePagination(itemsCount, itemsPerPage);

    return (
        <div className={cl.paginationWrapper}>
            {pagesArray.map(page =>
                <SimpleLink
                    key={page}
                    args={page}
                    active={page === currentPage ? true : false}
                    moveTo={selectPage}
                >
                    {page}
                </SimpleLink>
            )}
        </div>
    );
}

export default Pagination;
