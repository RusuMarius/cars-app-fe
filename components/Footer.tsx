import Link from 'next/link'
import React from 'react'
import logo from '../assets/logo-white.png'
import Image from 'next/image'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer>
      <div className='container pt-10 pb-10 flex flex-col md:flex-row justify-between'>
        <div className='flex flex-col gap-4 text-white w-[100%] md:w-[48%] my-6 items-center md:items-start'>
          <Link className='ml-4' href="/"><Image className='max-w-[200px]' src={logo} alt='' /></Link>
        </div>
        <div className='flex flex-col gap-4 text-white w-[100%] md:w-[33%] my-6 items-center md:items-start'>
          <h4 className='font-bold text-white'>Links</h4>
          <Link href="/cars">Cars</Link>
          <Link href="/clothes">Clothes</Link>
          <Link href="/shoes">Shoes</Link>
        </div>
        <div className='flex flex-col gap-4 text-white w-[100%] md:w-[18%] my-6 items-center md:items-start'>
          <h4 className='font-bold text-white'>Media</h4>
          <div className='flex items-center gap-4'>
            <Link href="https://www.facebook.com" aria-label="Facebook"><FaFacebookF size={24} /></Link>
            <Link href="https://www.instagram.com" aria-label="Instagram"><FaInstagram size={24} /></Link>
            <Link href="https://www.twitter.com" aria-label="Twitter"><FaTwitter size={24} /></Link>
            <Link href="https://www.linkedin.com" aria-label="LinkedIn"><FaLinkedinIn size={24} /></Link>
          </div>
        </div>
      </div>
      <div className='container pt-5 pb-10'>
        <p className='text-white text-xs'>© 2024. Mercedes-Benz România S.R.L. Toate drepturile rezervate.</p><br />
        <p className='text-white text-xs'>Sistemele noastre de asistență pentru șofer și de siguranță sunt dispozitive auxiliare și nu te exonerează de responsabilitatea ca șofer. Te rugăm să respecți instrucțiunile din manualul de utilizare și limitele sistemului descrise acolo.<br /></p>

        </div>
    </footer>
  )
}

export default Footer
