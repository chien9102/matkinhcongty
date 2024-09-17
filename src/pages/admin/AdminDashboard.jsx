import React, { useState } from 'react';
import { menu } from '../../utils/Constants';
import AdminRoutes from '../../routers/AdminRoutes';
import { Link } from 'react-router-dom';
function AdminDashboard(props) {
    const [hidden, setHidden] = useState(true);
    const [show, setShow] = useState(false);
    const [productPage, setProductPage] = useState(null);

    const handleMenu = (a) => {
        if (a.id == productPage) {
            setProductPage(null);
        } else {
            setProductPage(a.id);
        }
    }
    return (
        <div className='md:flex'>
            <div className="left bg-slate-400 md:h-[100vh]">
                <div className="flex items-center p-3">
                    <i class={`fa-solid fa-bars ${show ? "xoay" : "quay"}`} onClick={() => setShow(!show)}></i>
                    <h1 className={`ml-3 text-2xl ${show ? "" : "hidden"}`}><b>Start</b><b className=' text-blue-800'>Admin</b></h1>
                </div>
                <div className={show ? "" : "left-mobile"}>
                    <Link to={"/"} className="flex items-center p-3 hover:bg-slate-300 ">
                        <i class="fa-brands fa-windows text-blue-800"></i>
                        <h2 class={`text-blue-800 ml-5 ${show ? "" : "hidden"} `}>Dash Board</h2>
                    </Link>
                    <h1 className={`ml-2 ${show ? "" : "hidden"}`}>UI Elements</h1>
                    <Link to={"/categories"} className="flex items-center p-3 hover:text-blue-800 hover:bg-slate-300 ">
                        <i class="fa-brands fa-elementor"></i>
                        <h2 class={`ml-5 ${show ? "" : "hidden"}`}>Categories</h2>
                    </Link>
                    <h1 className={`ml-2 ${show ? "" : "hidden"}`}>Forms and Datas</h1>

                    {
                        menu.map(element => (
                            <div>
                                <div className='p-3 flex items-center hover:bg-slate-300  hover:text-blue-800' onClick={() => handleMenu(element)}>
                                    <i class={element.icon}></i>
                                    <h1 class={`ml-5 ${show ? "" : "hidden"}`}>{element.title}</h1>
                                    <i class={`fa-solid fa-chevron-right ml-auto ${show ? "" : "hidden"}`}></i>
                                </div>
                                <div className={productPage == element.id ? "" : "hidden"}>
                                    {
                                        element.items.map(item => (
                                            <Link to={item.path} className='p-3 flex items-center hover:bg-slate-300  hover:text-blue-800'>
                                                <i class="fa-solid fa-caret-right"></i>
                                                <h1 class="ml-5" >{item.title}</h1>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                    
                    <h1 className={`ms-4 mt-3 ${show ? "" : "hidden"}`}>Pages</h1>

                    <Link to={"/reviews"} className="flex items-center p-3 mt-2 hover:bg-slate-300  hover:text-blue-800">
                        <i class="fa-regular fa-circle-user"></i>
                        <h1 class={` ml-5 ${show ? "" : "hidden"}`}>Reviews</h1>
                        <i class={` ml-auto fa-solid fa-chevron-right ${show ? "" : "hidden"}`}></i>
                    </Link>
                </div>
            </div>
            <div className="right flex-1">
                <div className="right-header items-center flex justify-between px-6">
                    <div >
                        <h1 class="text-3xl">Good Morning,<b>John Doe</b></h1>
                        <h>Your performance summary this week</h>
                    </div>
                    <div className="icon flex ">
                        <i class="fa-solid fa-magnifying-glass text-2xl"></i>
                        <i class="fa-solid fa-envelope text-2xl ml-5"></i>
                        <div class="position: relative; ">
                            <i class="fa-solid fa-bell text-2xl ml-5"></i>
                            <span class="position-absolute right-16 translate-middle p-2 bg-danger border border-light rounded-circle">
                            </span>
                        </div>
                        <div className='relative' onClick={() => setHidden(!hidden)}>
                            <div className="">
                                <img className='rounded-full w-8 h-8 ml-5' src="https://cdn.pixabay.com/photo/2023/10/10/15/37/motorcycle-8306765_1280.jpg" alt="" />
                            </div>
                            <div class={`card profile absolute z-10 right-0 mt-2 ${hidden ? "hidden" : ""}`} >
                                <ul class="list-group list-group-flush ">
                                    <div class=" p-3 text-center">
                                        <div className='flex justify-center'>
                                            <img className='rounded-full w-8 h-8 ' src="https://cdn.pixabay.com/photo/2023/10/10/15/37/motorcycle-8306765_1280.jpg" alt="" />
                                        </div>
                                        <h1 class='mt-2'>Allen Moreno</h1>
                                        <h1 class='mt-2'>allenmoreno@gmail.com</h1>
                                    </div>
                                    <li className=" flex list-group-item justify-between   hover:bg-gray-300">
                                        <div className="flex">
                                            <i class="fa-sharp fa-regular fa-user ms-2"></i>
                                            <h1 class=" ms-2" >My Profile</h1>
                                        </div>
                                        <div className="no">
                                            <h1 className='w-6 h-6 text-center rounded-full bg-red-700 text-gray-50'>1</h1>
                                        </div>
                                    </li>
                                    <li class="flex list-group-item  hover:bg-gray-300"><i class="fa-solid fa-message ms-2"></i><h1 class=" ms-2">Message</h1></li>
                                    <li class="flex list-group-item  hover:bg-gray-300"><i class="fa-solid fa-calendar ms-2"></i><h1 class=" ms-2">Activity</h1></li>
                                    <li class="flex list-group-item  hover:bg-gray-300"><i class="fa-solid fa-circle-question ms-2"></i><h1 class=" ms-2">FAQ</h1></li>
                                    <li class="flex list-group-item  hover:bg-gray-300"><i class="fa-solid fa-right-from-bracket ms-2"></i><h1 class=" ms-2">Sign Out</h1></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
               <div className="right-main">
                     <AdminRoutes/>
               </div>
            </div>
        </div>
    );
}

export default AdminDashboard;