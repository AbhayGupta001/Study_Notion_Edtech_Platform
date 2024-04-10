import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,toLink,active}) => {
  return (
    <Link to={`${toLink}`}>
        <button className={`text-sm md:text-[15px] text-center px-5 py-2.5 rounded-md font-semibold  ${active ? "bg-yellow-50 text-black shadow-[1.5px_1.5px_0px_0.4px_#FFE395]":"bg-richblack-800 text-richblack-5 shadow-[1.5px_1.5px_0px_0.4px_#424854]"}
        transition-all duration-200 hover:scale-95`}>
            {children}
        </button>
    </Link>
 )
}

export default Button