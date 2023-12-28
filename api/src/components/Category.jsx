import { useEffect, useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom';

function Category() {
  const [categories, setCategories] = useState([])


  const fetchCategory = async () => {
    const response = await fetch("https://localhost:7265/api/Category");
    const category = await response.json();
    setCategories(category)
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <div className="col-6">
      <div className='d-flex justify-content-between'>
        <div><h2>Category List</h2></div>
        <Link to={"addCategory"}><div className="btn btn-danger">Add Category</div></Link>
      </div>
      <table className="table table-responsive table-stripped table-hover table-dark">
        <thead>
          <tr className='text-center'>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>

          </tr>
        </thead>
        <tbody>
          {categories && categories.map((item, index) => (
            <tr key={index} className='text-center'>
              <th scope="row">{item.id}</th>
              <td>{item.name}</td>
              <td>
                <div className={item.isStatus ? "btn btn-success" : "btn btn-danger"}>
                  {item.isStatus ? "Active" : "Passive"}
                </div>
              </td>
              <td><Link className='btn btn-primary' to={"/editCategory/" + item.id}>Güncelle</Link></td>
              <td><div className='btn btn-danger'>Delete</div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Category