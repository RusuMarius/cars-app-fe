import Link from 'next/link'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { FaCalendarCheck, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';



const Dropdown = async ({user}: {user: any}) => {
  return (
    <div className='flex items-center gap-4'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex gap-2 items-center'>
            <Avatar>
              <AvatarImage src={user.picture} />
              <AvatarFallback className='bg-slate-400 text-white'>{`${user.given_name[0]} ${user.family_name[0]}`}</AvatarFallback>
              <div className='user-circle bg-blue-400 text-white'>{`${user.given_name[0]} ${user.family_name[0]}`}</div>
            </Avatar>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel><Link href='/dashboard'>Dashboard</Link></DropdownMenuLabel>

          <DropdownMenuSeparator />

          <div className='px-2'>
            <div className='flex gap-1 font-bold text-sm'>
              <p className='text-xs'>{user.given_name}</p>
              <p className='text-xs'>{user.family_name}</p>
            </div>
            <p className='text-xs'>{user.email}</p>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuGroup className='flex flex-col gap-2'>
            <Link href="/">
              <DropdownMenuItem>
                <span className='mr-2'>Home</span>
                <DropdownMenuShortcut>
                  <FaHome />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <LogoutLink>
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>
                <FaSignOutAlt />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </LogoutLink>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Dropdown