'use client';
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

const links = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Cars',
    path: '/cars'
  },
  {
    name: 'Clothes',
    path: '/clothes'
  },
  {
    name: 'Shoes',
    path: '/shoes'
  },
]




const Nav = ({isUserAuthenticated}: {isUserAuthenticated: boolean}) => {
  const pathname = usePathname()
  return (
    <nav className="ml-auto">
      <ul className="flex gap-6">
        {links.map((link, index) => {
          return <li key={index}>
            <Link className="nav-item" href={link.path}>{link.name}</Link>
          </li>
        })}
      </ul>
      {!isUserAuthenticated && pathname === '/dashboard' && redirect('/')}
    </nav>
  )
}

export default Nav