import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {setFilters} from "../../../redux/productsSlice";
import {useSearchParams} from "react-router-dom";
import {Close, FilterBlock, ShowFilter} from "./FiltersStyled";
import {memo} from "react";

const Filters = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const dataFormQuery = searchParams.get('data_from') || ''
    const dataToQuery = searchParams.get('data_to') || ''
    const priceFormQuery = searchParams.get('price_from') || ''
    const priceToQuery = searchParams.get('price_to') || ''
    const titleQuery = searchParams.get('title') || ''
    const currentPage = +searchParams.get('page') || 1

    const [isShow, setIsShow] = useState(true)

    const [data_from, setDataFrom] = useState(dataFormQuery)
    const [data_to, setDataTo] = useState(dataToQuery)
    const [price_from, setPriceForm] = useState(priceFormQuery)
    const [price_to, setPriceTo] = useState(priceToQuery)
    const [title, setTitle] = useState(titleQuery)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setFilters({data_from, data_to, price_from, price_to, title, currentPage}))
    }, [dispatch])

    const handleSetFilters = (e) => {
        e.preventDefault()
        dispatch(setFilters({data_from, data_to, price_from, price_to, title, currentPage: 1}))
        setSearchParams({page: '1', data_from, data_to, price_from, price_to, title})
    }

    return <>
        {!isShow && <ShowFilter onClick={() => setIsShow(true)}>Show Filter</ShowFilter>}
        <FilterBlock isShow={isShow} onSubmit={handleSetFilters}>
            <Close onClick={() => setIsShow(false)}>x</Close>
            <div>
                <label>data</label>
                <div>
                    <input type="text" name="data_from"
                           placeholder="data_from" value={data_from}
                           onChange={(e) => setDataFrom(e.target.value)}/>
                    <input type="text" name="data_to" placeholder="data_to"
                           value={data_to}
                           onChange={(e) => setDataTo(e.target.value)}/>
                </div>
            </div>
            <div>
                <label>price</label>
                <div>
                    <input type="text" name="price_from" placeholder="price_from"
                           value={price_from}
                           onChange={(e) => setPriceForm(e.target.value)}/>
                    <input type="text" name="price_to" placeholder="price_to"
                           value={price_to}
                           onChange={(e) => setPriceTo(e.target.value)}/>
                </div>
            </div>
            <div>
                <div>title</div>
                <input type="text" name="title" placeholder="title"
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <input type="submit" value="set filter"/>
        </FilterBlock>
    </>
}

export default memo(Filters);