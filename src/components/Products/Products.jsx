import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProductsAsync} from "../../redux/productsSlice";
import Product from "./Product";
import Pagination from "./Pagination";
import styled from "styled-components";
import Filters from "./Filters/Filters";
import Loader from "../common/Loader/Loader";
import ErrorBlock from "../common/ErrorBlock/ErrorBlock";

const ProductWrapper = styled.div`
  display: flex;
  justify-content: ${({result}) => result === 0 ? 'center' : 'flex-start'};
  flex-wrap: wrap;
  padding-top: 50px;
`

const Products = () => {
    const dispatch = useDispatch()

    const {filters, status, error} = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getProductsAsync())
    }, [dispatch, filters])

    const {data} = useSelector(state => state.products.productsData)

    if (error) return <ErrorBlock error={error} />

    return (
        <div>
            {status === 'pending' && <Loader/>}
            <Filters/>
            {data.length ? <>
                <ProductWrapper>
                    {data.map(product => <Product productData={product} key={product.id}/>)}
                </ProductWrapper>
                <Pagination/>
            </> : <ProductWrapper result={data.length}><h2>No products</h2></ProductWrapper>}
        </div>
    );
};

export default Products;