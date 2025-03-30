// conmp
import { Button } from '../../admin/components';
import { ToggleSwitch } from '../../components';
import { CiLogout } from "react-icons/ci";



const AdminNav = () => {
  // clear cookie

  const logout = async () => {
    const res = await fetch('http://localhost:3001/api/v1/user/logout', {
      method: 'POST',
      credentials: 'include',
    })

    if (res.ok) {
      window.location.reload()
      window.localStorage.removeItem('userId')
    } else {
      console.log(res)
    }
  }
  return (
    <nav className='flex items-center justify-end p-3 gap-x-3 w-full h-20 border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900'>
      <select name="lang" id="lang" className='bg-white dark:bg-gray-900 outline-none focus:outline-none w-12 dark:text-white'>
        <option value="en">EN</option>
        <option value="ar">AR</option>
      </select>
      <Button title="log out" onClick={logout} icon={<CiLogout className='rotate-180' />} className='border px-4 rounded flex-row-reverse hover:bg-black hover:text-white dark:text-white dark:border-black hover:border-black' />
      <ToggleSwitch />

    </nav>
  )
}

export default AdminNav;
