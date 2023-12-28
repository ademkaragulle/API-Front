import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function EditCategory() {
    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [message, setMessage] = useState("")
    let { categoryId } = useParams();



    const fetchCategory = async (categoryId) => {
        const response = await fetch("https://localhost:7265/api/Category/" + categoryId);
        const category = await response.json();
        setName(category.name)
        setSelectedCategory(category)
        setStatus(category.isStatus ? "active" : "passive")
    }


    useEffect(() => {
        fetchCategory(categoryId)
    }, [])

    const submitForm = async () => {
        const data = {
            id: selectedCategory.id,
            name: name,
            isStatus: status == "active" ? true : false
        }


        try {
            const response = await fetch("https://localhost:7265/api/Category", {
                method: "PUT", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            setMessage("Düzenleme Başarılı")
        } catch (error) {
            setMessage(`Error ${error}`)
        }
    }

    return (
        <div className='row'>
            <Link to={"/"} className="btn btn-danger">Anasayfa</Link>
            <div className='col-6 '>
                <br />
                <label>Name</label>
                <input onChange={(e) => setName(e.target.value)} value={name} className="form-control" type="text" />

                <label>Status</label>
                <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="active">Active</option>
                    <option value="passive">Passive</option>
                </select>
                <div onClick={() => submitForm()} className='btn btn-primary form-control my-3'>Submit</div>
            </div>
            <div>
                {message}
            </div>
        </div >
    )
}

export default EditCategory