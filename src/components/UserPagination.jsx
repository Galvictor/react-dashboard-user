import React from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

export default function UserPagination({currentPage, totalPages, totalItems, onPageChange}) {
    const renderPaginationItems = () => {
        const items = [];

        items.push(
            <PaginationItem key="prev" disabled={currentPage === 1}>
                <PaginationLink previous onClick={() => onPageChange(currentPage - 1)}/>
            </PaginationItem>
        );

        for (let i = 1; i <= totalPages; i++) {
            items.push(
                <PaginationItem key={i} active={currentPage === i}>
                    <PaginationLink onClick={() => onPageChange(i)}>{i}</PaginationLink>
                </PaginationItem>
            );
        }

        items.push(
            <PaginationItem key="next" disabled={currentPage === totalPages}>
                <PaginationLink next onClick={() => onPageChange(currentPage + 1)}/>
            </PaginationItem>
        );

        return items;
    };

    return (
        <div>
            <div className="mb-2 text-muted">
                Total de itens: {totalItems} {/* Exibe o total de itens */}
            </div>
            <Pagination>{renderPaginationItems()}</Pagination>
        </div>
    );
}