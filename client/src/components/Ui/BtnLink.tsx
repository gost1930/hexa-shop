import { Link } from 'react-router-dom'

const BtnLink = ({ path, title }: any) => {
    return (
        <Link to={path} className='py-2 px-4 w-fit border  cursor-pointer
hover:border-white hover:bg-white hover:text-black text-white'>
            {title}
        </Link>
    )
}

export default BtnLink;