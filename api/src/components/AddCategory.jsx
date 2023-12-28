import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function AddCategory() {
  const [name, setName] = useState("")
  const [status, setStatus] = useState("")


  const submitForm = () => {
    const data = {
      name: name,
      isStatus: status == "passive" ? false : true
    }
    fetchPost(data)
  }

  const fetchPost = async (data) => {
    try {
      const response = await fetch("https://localhost:7265/api/Category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  }



  return (
    <div className='row'>
      <Link to={"/"} className="btn btn-danger">Anasayfa</Link>
      <div className='col-6 '>
        <label>Name</label>
        <input onChange={(e) => setName(e.target.value)} className="form-control" type="text" />
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

export default AddCategory