import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { ProfileDropdown } from '../core/Auth/ProfileDropdown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { ACCOUNT_TYPE } from '../../utils/constants';
import { GiHamburgerMenu } from "react-icons/gi";
import { logout } from '../../services/operations/authAPI';

export const Navbar = () => {
    
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token} = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);
    const { totalItems } = useSelector(state => state.cart);
    const [subLinks , setSubLinks] = useState([]);
    const [active,setActive] = useState(false);

    const fetchSubLinks = async()=>{
        try{
            const result = await apiConnector("GET",categories.CATEGORIES_API);
            // console.log("result",result.data.allCategories);

            setSubLinks(result.data.allCategories);
        }catch(err){
            console.log("could not fetch catagories");
        }
    }
    // console.log("sublinks",subLinks);

    const parseCategoryName = (name)=>{
        name = name.split(" ").join("-").toLowerCase();
        return name;
    }

    useEffect(()=>{
        fetchSubLinks();
    },[]);

  return (
    <div className={` ${token && location.pathname.includes('dashboard') && "fixed bg-richblack-800 z-20 top-0 left-0"} w-full border-richblack-700 border-b`}>
        <div className='w-11/12 max-w-maxContent mx-auto flex flex-1 justify-between items-center md:p-[.7rem]  py-[0.4rem] relative'>
            
            {/* logo */}
            <Link to={'/'}>
                <img src={logo} width={160} height={42}/>
            </Link>

            <div className={`${!active && "max-md:hidden"} flex flex-col justify-between items-center max-md:absolute right-0 -bottom-[140%] z-[150] max-md:translate-y-[80%] max-md:bg-richblack-800 max-md:min-w-[200px] gap-2 max-md:border-[.1px] border-richblack-700 max-md:py-2 max-md:rounded-sm`}>

                {/* nav-links */}
                <nav>
                    <ul className='flex max-md:flex-col items-center justify-between gap-2 text-[17px] text-richblack-25 cursor-pointer'>
                        {
                            NavbarLinks.map((link, index)=>{
                                return <li 
                                    key={index} 
                                    className='p-2 whitespace-nowrap'
                                    onClick={()=>setActive(false)}
                                    >
                                    {
                                        link.title === 'Catalog'
                                        ? (<div className='relative flex items-center group'>
                                            <span>{link.title}</span>
                                            <MdKeyboardArrowDown className='text-[26px]'/>
                                            <div className='invisible opacity-0 w-[200px] lg:w-[300px] absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[15%] flex flex-col justify-between gap-2 p-4  bg-richblack-5 group-hover:visible group-hover:opacity-100 group-hover:translate-y-[10%] rounded-lg transition-all ease-in-out duration-200 z-50 text-richblack-800'>
                                                <div className='absolute w-6 h-6 top-0 translate-y-[-45%] left-[56%] rounded
                                                rotate-45 bg-richblack-5'>
                                                </div>
                                                {
                                                    subLinks.map((category)=>
                                                        <Link to={`/catalog/${parseCategoryName(category?.name)}`} key={category._id}>
                                                            <p className='hover:bg-richblack-50 hover:bg-opacity-95 p-4 rounded-lg'>{category.name}</p>
                                                        </Link>
                                                    )
                                                }
                                            </div>
                                        </div>)
                                        :(
                                            <NavLink to={link.path}>
                                                <p>{link.title}</p>
                                            </NavLink>
                                        )
                                    }
                                </li>
                            })
                        }
                    </ul>
                </nav>

                {/* Login Signup Dashboard */}
                {
                    !token &&
                    <Link className='md:hidden' to={'/login'} onClick={()=>setActive(false)}>
                        <button className='px-3 py-2 bg-richblack-800'>
                            Log in
                        </button>
                    </Link>
                }
                {
                    !token &&
                    <Link className='md:hidden' to={'/signup'} onClick={()=>setActive(false)}>
                        <button className='px-3 py-2 bg-richblack-800'>
                            Sign up
                        </button>
                    </Link>
                }

                {
                    token &&
                    <div className='md:hidden flex flex-col gap-y-2'>
                        <Link to={"/dashboard/my-profile"} onClick={()=>setActive(false)}>
                            <p className='p-4 py-2'>
                                <span>Dashboard</span>
                            </p>
                        </Link>
                        <button onClick={()=>{
                            dispatch(logout(navigate))
                            setActive(false);
                        }}>
                            <p className='p-4 py-2 '>
                                <span>Log Out</span>
                            </p>
                        </button>
                    </div>
                }

            </div>
            
            {/* For viewport greater than md Login Signup Dashboard */}
            <div className={`max-md:hidden flex items-center gap-3 ${token && "hidden"}`}>

                {
                    !token &&
                    <Link to={'/login'}>
                        <button className='px-3 py-2 bg-richblack-800 text-richblack-100 border-b md:border border-richblack-700 md:rounded-md'>
                            Log in
                        </button>
                    </Link>
                }
                {
                    !token &&
                    <Link to={'/signup'}>
                        <button className='px-3 py-2 bg-richblack-800 text-richblack-100 border border-richblack-700 rounded-md'>
                            Sign up
                        </button>
                    </Link>
                }
            </div>

            {/* Cart and Profile Dropdown */}
            <div className={`flex items-center gap-x-6 ${!token && "hidden"}`}>
                    {
                        user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR &&
                        <Link to={'/dashboard/cart'}>
                            <div className='relative '>
                                <MdOutlineShoppingCart className='text-2xl text-richblack-25'/>
                                {
                                    totalItems > 0 &&
                                    <span className='absolute -bottom-[40%] -right-[40%] p-[1px] px-[7px] text-sm text-yellow-50 font-bold rounded-full bg-richblack-600'>
                                        {totalItems}
                                    </span>
                                }
                            </div>
                        </Link>
                    }
                    {
                        token &&
                        <div onClick={()=>setActive(prev => !prev)}><ProfileDropdown/></div>
                    }
            </div>
            {/* Menu button */}
            {
                !token &&
                <div className='md:hidden cursor-pointer text-lg font-bold' onClick={()=>setActive(prev => !prev)}>
                    <GiHamburgerMenu />
                </div>
            }
        </div>
    </div>
  )
}
