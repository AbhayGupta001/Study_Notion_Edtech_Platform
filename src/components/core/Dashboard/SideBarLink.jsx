import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import * as Icons from 'react-icons/vsc';

const SideBarLink = ({link , iconName}) => {

    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route)=> {
      return matchPath(route, location.pathname);
    }

  return (
    <Link to={link.path}>
        <div className={`flex gap-x-2 px-7 pr-10 py-[0.4rem] items-center text-[15px] text-richblack-300 border-l-[4px] border-transparent transition-all duration-200 
         font-medium ${
          matchRoute(link.path) && "bg-yellow-800 text-yellow-50 border-yellow-50 font-bold"
         } whitespace-nowrap `}>
            <span>
                <Icon className="text-lg"/>
            </span>
            <p>{link.name}</p>
        </div>
    </Link>
  )
}

export default SideBarLink