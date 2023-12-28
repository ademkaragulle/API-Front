import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function AddProduct() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [status, setStatus] = useState("")
    const [categories, setCategories] = useState([])
    const submitForm = () => {
        const data = {
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
            const response = await fetch("https://localhost:7265/api/Product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const fetchCategory = async () => {
        const response = await fetch("https://localhost:7265/api/Category");
        const category = await response.json();
        setCategories(category)
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <div className='row'>
            <Link to={"/"} className="btn btn-danger">Anasayfa</Link>
            <div className='col-6 '>
                <label>Name</label>
                <input onChange={(e) => setName(e.target.value)} className="form-control" type="text" />
                <label>Price</label>
                <input onChange={(e) => setPrice(e.target.value)} className="form-control" type="text" />
                <label>Stock</label>
                <input onChange={(e) => setStock(e.target.value)} className="form-control" type="text" />
                <label>Category</label>
                <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                    {
                        categories.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
                <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="passive">Passive</option>
                </select>
                <label>Status</label>
                <div onClick={() => submitForm()} className='btn btn-primary form-control my-3'>Submit</div>
            </div>
        </div>
    )
}

export default AddProduct