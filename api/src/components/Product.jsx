import { useEffect, useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom';

function Product() {
    const [products, setProducts] = useState([])
    const [responseProduct, setResponseProduct] = useState("")
    const [page, setPage] = useState(1)
    const [searchInput, setSearchInput] = useState("")

    const fetchProduct = async () => {
        const response = await fetch(`https://localhost:7265/api/ProductPaginationHome/page/${page}`);
        const product = await response.json();
        setProducts(product.products)
        setResponseProduct(product)
        console.log(product, "0")
    }
    const fetchProduct1 = async () => {
        const response = await fetch(`https://localhost:7265/api/ProductPaginationHome/search/${searchInput}/${page}`);
        const product = await response.json();
        setProducts(product.products)
        setResponseProduct(product)
    }

    useEffect(() => {
        console.log(searchInput)
        if (searchInput == "") {
            fetchProduct()
        } else {
            fetchProduct1()
        }
    }, [page, searchInput])


  

    const deleteProduct = async (id) => {
        await fetch('https://localhost:7265/api/Product/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text()) // or res.json()
            .then(res => console.log(res))
        await fetchProduct()
    }


    const searchData = async (e) => {
        console.log(e)
        if (!e) {
            setSearchInput("")
            fetchProduct()
        }
        else {
            setPage(1)
            setSearchInput(e)
        }
    }
    const paginationNext = () => {
        if (page < responseProduct.pageCount) {
            setPage(page + 1)
        }
    }
    const paginationPrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const changePage = (item) => {
        setPage(item)
    }

    return (
        <div className="col-6">
            <div className='d-flex justify-content-between'>
                <div><h2>Product List</h2></div>
                <div className='d-flex gap-3'>
                    <div>
                        <Link to={"addProduct"}><div className="btn btn-danger">Add Category</div></Link>
                    </div>
                    <div>
                        <input onChange={(e) => searchData(e.target.value)} value={searchInput} placeholder='search' className='form-control' type="text" id='search' />
                    </div>
                </div>
            </div>
            <table className="table table-responsive table-stripped table-hover table-dark ">
                <thead>
                    <tr className='text-center'>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Category Id</th>
                        <th scope="col">Status</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((item, index) => (
                        <tr key={index} className='text-center'>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.stock}</td>
                            <td>{item.categoryId}</td>
                            <td>
                                <div className={item.isStatus ? "btn btn-success" : "btn btn-danger"}>
                                    {item.isStatus ? "Active" : "Passive"}
                                </div>
                            </td>
                            <td><Link className='btn btn-primary' to={"/editProduct/" + item.id}>Güncelle</Link></td>
                            <td><div onClick={() => deleteProduct(item.id)} className='btn btn-danger'>Delete</div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav aria-label="...">
                <ul className="pagination">
                    <li style={{ cursor: "pointer" }} className="page-item">
                        <div onClick={() => paginationPrev()} className="page-link">Previous</div>
                    </li>
                    {page > 2 && <li style={{ cursor: "pointer" }} className="page-item"><a onClick={() => changePage(page - 2)} className="page-link">{page - 2}</a></li>}
                    {page > 1 && <li style={{ cursor: "pointer" }} className="page-item"><a onClick={() => changePage(page - 1)} className="page-link">{page - 1}</a></li>}
                    <li className="page-item active" aria-current="page"><a className="page-link" >{page}</a></li>
                    {page < responseProduct.pageCount && <li style={{ cursor: "pointer" }} className="page-item"><a onClick={() => changePage(page + 1)} className="page-link">{page + 1}</a></li>}
                    {page < responseProduct.pageCount - 1 && <li style={{ cursor: "pointer" }} className="page-item"><a onClick={() => changePage(page + 2)} className="page-link">{page + 2}</a></li>}
                    <li style={{ cursor: "pointer" }} className="page-item">
                        <div onClick={() => paginationNext()} className="page-link" href="#">Next</div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Product