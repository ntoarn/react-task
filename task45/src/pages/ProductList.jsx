import React, {useEffect, useState} from 'react';
const url = "https://dummyjson.com/products"
const ProductList = () => {
    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(12)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const totalPage = Math.ceil(total / limit)
    const number = [...Array(totalPage).keys()]
    const fetchApi = async () => {
        try {
            const response = await fetch(`${url}?limit=${limit}&skip=${(page - 1) * limit}`)
            const data = await response.json()
            setProducts(data.products)
            setTotal(data.total)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (limit) {
            fetchApi()
        }
    }, [limit,page]);
    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    const handleNext = () => {
        if (page < totalPage){
            setPage(page + 1)
        }
    }
    const [search, setSearch] = useState('')
    const [sortPrice, setSortPrice] = useState('')

    const handleSelectOption = (e) => {
        setLimit(e.target.value)
    }
  return (
    <>
        <div className={"container"}>
        <div className="row">
            <div className="col-md-4">
                <input onChange={(e) => setSearch(e.target.value)} type="search" id="form1"
                       className="form-control mt-3" placeholder={"Tìm kiếm"}/>
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="col-md-4">
                <select onChange={(e) => setSortPrice(e.target.value)} className="form-select mb-3 mt-3"
                        aria-label="Default select example">
                    <option>Chọn giá</option>
                    <option value="desc">Cao → Thấp</option>
                    <option value="asc">Thấp → Cao</option>
                </select>
            </div>
            <div className={"row"}>
                {products.sort((a,b) => {
                    if (sortPrice === "desc"){
                        return b.price - a.price
                    }
                    if (sortPrice === "asc"){
                        return a.price - b.price
                    }
                    return 0
                }).filter((item) => {
                return item.title.toLowerCase().includes(search.toLowerCase())
                }).map((item) => (
                    <div key={item.id} className={"col-12 col-md-6 col-lg-4 col-xl-3 mb-3"}>
                        <div className="card">
                            <img src={item.thumbnail} className="card-img-top" alt="..." width={"100%"}/>
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.price}</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="row align-items-center justify-content-between">
                    <div className="col-auto">
                        <nav aria-label="Pagination">
                            <ul className="pagination mb-0">
                                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={handlePrev} aria-label="Previous">
                                        &laquo;
                                    </button>
                                </li>

                                {number.map((item) => (
                                    <li
                                        key={item}
                                        className={`page-item ${page === item + 1 ? 'active' : ''}`}
                                    >
                                        <button className="page-link" onClick={() => setPage(item + 1)}>
                                            {item + 1}
                                        </button>
                                    </li>
                                ))}

                                <li className={`page-item ${page === number.length ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={handleNext} aria-label="Next">
                                        &raquo;
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="col-auto">
                        <select
                            className="form-select form-select-sm"
                            value={limit}
                            onChange={(e) => {
                                setLimit(parseInt(e.target.value) );
                                setPage(1);
                            }}
                        >
                            <option value="" disabled>
                                Chọn số sản phẩm/trang
                            </option>
                            <option value="12">12</option>
                            <option value="24">24</option>
                            <option value="36">36</option>
                            <option value="48">48</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </>
  );
};

export default ProductList;
