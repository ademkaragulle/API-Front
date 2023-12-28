import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './components/addProduct'
import AddCategory from './components/AddCategory'
import Category from './components/Category'
import Product from './components/Product'
import EditCategory from './components/EditCategory'
import EditProduct from './components/EditProduct'

function App() {


  return (
    <div>
      <div className="container m-5">
        <div className="row">
          <Routes>
            <Route path='/' element={
              <>
                <Category />
                <Product />
              </>
            } />
            <Route path='/addProduct' element={<AddProduct />} />
            <Route path='/addCategory' element={<AddCategory />} />
            <Route path='/editCategory/:categoryId' element={<EditCategory />} />
            <Route path='/editProduct/:productId' element={<EditProduct />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
