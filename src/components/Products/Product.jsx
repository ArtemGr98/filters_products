import styled from "styled-components";

const ProductBlock = styled.div`
  width: 30%;
  padding: 1.5%;
  img {
    width: 100%;
  }
`

const Product = ({productData}) => {
    return (
        <ProductBlock>
            <img src={productData.thumbnail} alt="productImg"/>
            <div>{productData.title}</div>
            <div>{productData.price}</div>
        </ProductBlock>
    );
};

export default Product;