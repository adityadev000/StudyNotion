import React from 'react'

const IconBtn = ({ onClick , children , disabled , outline = false , customClasses , icon , text  }) => {
    return (
        <button 
            disabled = {disabled}
            onClick= {()=> onClick() } 
            className={`${customClasses} flex items-center`}
        >   
            {text}
            {children}
            {icon}
        </button>
    )
}

export default IconBtn
