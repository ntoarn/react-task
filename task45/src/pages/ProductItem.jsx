import React from 'react';

const ProductItem = ({ products }) => {
  return (
      <div  className={"col-12 col-md-6 col-lg-4 col-xl-3 mb-3"}>
          <div className="card">
              <img src={products.thumbnail} className="card-img-top" alt="..." width={"100%"}/>
              <div className="card-body">
                  <h5 className="card-title">{products.title}</h5>
                  <p className="card-text">{products.price}</p>
                  <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
          </div>
      </div>
  );
};

export default ProductItem;
