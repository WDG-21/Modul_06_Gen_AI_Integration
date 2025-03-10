import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='bg-zinc-900 p-4 text-white shadow-md border-b-2 border-yellow-500'>
      <ul className='flex space-x-6 justify-center'>
        <li>
          <NavLink to='/' className='text-lg font-semibold hover:text-gray-300'>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink
            to='image'
            className='text-lg font-semibold hover:text-gray-300'
          >
            IMAGE GENERATOR
          </NavLink>
        </li>
        <li>
          <NavLink
            to='chat'
            className='text-lg font-semibold hover:text-gray-300'
          >
            AI ASSISTANT
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
