import React from 'react'
import { Inputs } from '../../components'
// icons
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePhoneInTalk } from "react-icons/md";

const OrderForm = () => {
    return (
        <div className='w-full h-full border-dashed border-gray-500 border-2 px-5 pb-3 rounded-md'>
            <div className='w-full flex flex-col items-center justify-center gap-y-1 my-4'>
                <h1 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>Order Now</h1>
                <p className='text-gray-600 dark:text-gray-300 italic text-xs'>please fill the form below</p>
            </div>
            <form action="">
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Inputs type='text' placeholder='Name' icon={<FaRegUser />} />
                    <Inputs type='number' placeholder='Phone Number' icon={<MdOutlinePhoneInTalk />} />
                </div>
                <div className='my-5'>
                    <Inputs type='number' placeholder='Phone Number' icon={<MdOutlinePhoneInTalk />} />
                </div>
                <div className='my-5 grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Inputs type='checkbox' placeholder='Phone Number' icon={<MdOutlinePhoneInTalk />} id='hosse' />
                    <Inputs type='checkbox' placeholder='Phone Number' icon={<MdOutlinePhoneInTalk />} id='office' />
                </div>
                <div className='my-5 grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Inputs type='select'>
                        <option value="">Select State</option>
                    </Inputs>
                    <Inputs type='select' >
                        <option value="">Select City</option>
                    </Inputs>
                </div>
            </form>
        </div>
    )
}

export default OrderForm;
