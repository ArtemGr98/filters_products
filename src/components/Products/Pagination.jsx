import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {memo} from "react";
import {setFilters} from "../../redux/productsSlice";

const PaginationWrapper = styled.div`
    padding: 60px 0;
`
const PaginationItem = styled.span`
  margin-right: 10px;
  cursor: pointer;
  padding: 2px;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: ${props => (props.children === props.currentPage) ? "#016FD0" : "#000000" };
`

const Pagination = () => {
    const dispatch = useDispatch()
    const {currentPage} = useSelector(state => state.products.filters)
    const {last_page: totalPages} = useSelector(state => state.products.productsData)

    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }
    const curP = currentPage
    let curPF = ((curP - 4) < 0) ? 0 : curP - 4
    if (totalPages - 4 <= curP && totalPages - 4 > 8) {
        curPF = totalPages - 8
    }
    const curPL = ((curP - 4) < 0) ? curP + 4 - (curP - 4) : curP + 4
    const slicedPages = pages.slice(curPF, curPL)

    const [searchParams, setSearchParams] = useSearchParams()
    const onChangePage = (page) => {
        dispatch(setFilters({currentPage: page}))
        searchParams.set('page', page)
        setSearchParams(searchParams)
    }

    return <PaginationWrapper>
        {
            (curP > 4) && <span>
                <PaginationItem
                    key={1}
                    currentPage={currentPage}
                    onClick={() => onChangePage(1)}>1</PaginationItem>
            </span>
        }
        {(curP > 5) &&
            <PaginationItem> ... </PaginationItem>
        }
        {slicedPages.map(page => <PaginationItem
            key={page}
            currentPage={currentPage}
            onClick={() => onChangePage(page)}>{page}</PaginationItem>)
        }
        {(curP < totalPages - 5) &&
            <PaginationItem> ... </PaginationItem>
        }
        {(curP < totalPages - 4) && <span>
            <PaginationItem
                key={totalPages}
                currentPage={curP}
                onClick={() => onChangePage(totalPages)}>{totalPages}</PaginationItem>
            </span>
        }
    </PaginationWrapper>
}

export default memo(Pagination)