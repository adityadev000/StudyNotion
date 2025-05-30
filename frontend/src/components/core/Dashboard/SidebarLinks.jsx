import React from 'react'
import * as VscIcons from "react-icons/vsc";
import { matchPath, NavLink, useLocation } from 'react-router-dom';

const SidebarLinks = ({link , iconName} ) => {
    const location = useLocation() ; 
    const IconComponent = VscIcons[iconName];

    const matchRoute = (route) => {
        return matchPath ({path:route } , location.pathname) ; 
    }
    return (
        <NavLink
            to={link.path}
            // onclick
            className={` relative px-8 py-2 text-base font-medium${matchRoute(link.path) ? ' bg-yellow-800 text-yellow-100 font-semibold text-base' : ' bg-opacity-0 text-richblack-200'}`}
        >   

            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? 'opacity-100' : ' opacity-0'}`}></span>

            <div className=' flex items-center gap-x-2'>
            {IconComponent ? (
                <IconComponent className="text-lg" />
            ) : (
            <span className="text-red-500">?</span>
            )}

                <span>{link.name}</span>

            </div>

        </NavLink>
    )
}

export default SidebarLinks
