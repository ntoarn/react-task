import React, {useEffect, useState} from 'react';
import ProductItem from "./ProductItem.jsx";
const url = "https://dummyjson.com/products"
const fetchApi = async (limit, page, signal) => {
    console.log(signal)
    try {
        const response = await fetch(`${url}?limit=${limit}&skip=${(page - 1) * limit}`, {signal})
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error);
    }
}
const ProductList = () => {
    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(12)
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const totalPage = Math.ceil(total / limit)
    const number = [...Array(totalPage).keys()]

    useEffect(() => {
        let controller = new AbortController()
        const signal = controller.signal
        const fetchData = async () => {
            try {
                const res = await fetchApi(limit, page, signal)
                console.log(res)
                setProducts(res.products)
                setTotal(res.total)
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
        return () => {
            controller.abort()
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
    const [sortPrice, setSortPrice] = useState('all')

    const filterSort = (() => {
        let filtered = products.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
        );

        if (sortPrice === "asc") {
            return [...filtered].sort((a, b) => a.price - b.price);
        }
        if (sortPrice === "desc") {
            return [...filtered].sort((a, b) => b.price - a.price);
        }
        return filtered;
    })();
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
                            <option value="all">Chọn giá</option>
                            <option value="desc">Cao → Thấp</option>
                            <option value="asc">Thấp → Cao</option>
                        </select>
                    </div>
                    <div className={"row"}>
                        {filterSort.map((item) => (
                            <ProductItem key={item.id} products={item}/>
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