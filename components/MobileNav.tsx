'use client'
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import Link from "next/link"
import { FaBars } from "react-icons/fa"

const links = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Clothes',
    path: '/clothes'
  },
  {
    name: 'Shoes',
    path: '/shoes'
  },
  {
    name: 'Cars',
    path: '/cars'
  },
]

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex items-center burger">
        <FaBars />
      </SheetTrigger>
      <SheetContent side="left" className="flex justify-center items-center">
        <nav className="flex flex-col gap-8 items-center">
          {links.map((link, index) => (
            <Link key={index} href={link.path} onClick={handleLinkClick}>
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
