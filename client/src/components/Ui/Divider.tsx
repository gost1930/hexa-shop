import React from 'react'

const Divider = ({ className }: { className?: string }) => {
    return (
        <div className={`w-full border-t border-dashed border-gray-400 ${className}`}></div>
    )
}

export default Divider;
