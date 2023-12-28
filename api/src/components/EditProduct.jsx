import React, { useEffect, useState } from 'react'
import Product from './Product'
import { Link, useParams } from 'react-router-dom'

function EditProduct() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [status, setStatus] = useState("")
    const [categories, setCategories] = useState([])

    const [selectedProduct, setSelectedProduct] = useState("")
    const [message, setMessage] = useState("")
    let { productId } = useParams();


    const submitForm = () => {
        const data = {
            id: selectedProduct.id,
            name: name,
            price: price,
            stock: stock,
            categoryId: categoryId,
            isStatus: status == "passive" ? false : true,
        }
        fetchPost(data)
    }

    const fetchPost = async (data) => {
        try {
            console.log(data    )
            const response = await fetch("https://localhost:7265/api/Product", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log('!sadasda')
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const getProduct = async () => {
        const response = await fetch("https://localhost:7265/api/Product/" + productId);
        const product = await response.json();
        setName(product.name)
        setPrice(product.price)
        setStock(product.stock)
        setCategoryId(product.categoryId)
        setStatus(product.isStatus ? "active" : "passive")
        setSelectedProduct(product)
    }

    const fetchCategory = async () => {
        const response = await fetch("https://localhost:7265/api/Category");
        const category = await response.json();
        setCategories(category)
    }

    useEffect(() => {
        getProduct()
        fetchCategory()
    }, [])




    return (
        <div className='row'>
            <Link to={"/"} className="btn btn-danger">Anasayfa</Link>

            <div className='col-6 '>
                <label>Name</label>
                <input onChange={(e) => setName(e.target.value)} value={name} className="form-control" type="text" />
                <label>Price</label>
                <input onChange={(e) => setPrice(e.target.value)} value={price} className="form-control" type="text" />
                <label>Stock</label>
                <input onChange={(e) => setStock(e.target.value)} value={stock} className="form-control" type="text" />
                <label>Category</label>
                <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    {
                        categories.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
                <label>Status</label>
                <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="passive">Passive</option>
                </select>
                <div onClick={() => submitForm()} className='btn btn-primary form-control my-3'>Submit</div>
            </div>
        </div>
    )
}

export default EditProduct