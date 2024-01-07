import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { BrowserRouter as Router, Routes, Route, BrowserRouter, } from "react-router-dom";
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import Orders from '../../Components/Orders/Orders';

const Admin = () => {
    return (
        <div className='admin'>
            <Routes>
                <Route path='/addproduct' element={<AddProduct />} />
                <Route path='/listproduct' element={<ListProduct />} />
                <Route path='/orders' element={<Orders />} />
            </Routes>
            <Sidebar />
        </div>
    )
}

export default Admin
