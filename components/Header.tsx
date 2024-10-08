import Link from "next/link";
import Image from "next/image";
import imgLogo from '../assets/logo.png';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "./ui/button";
import Dropdown from "./Dropdown";
import Nav from "./Nav";
import CartHeader from "./CartHeader";
import MobileNav from "./MobileNav";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { FaUser } from 'react-icons/fa';


const Header = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  return (
    <header className='py-3 shadow-md'>
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image className="max-h-[40px] w-auto" src={imgLogo} width={160} height={160} alt="" />
        </Link>
        <div className="desktop-nav hidden lg:flex ml-auto">
          <Nav isUserAuthenticated={isUserAuthenticated} />
        </div>

        <>
          {isUserAuthenticated ? (
            <>
              <div className="cart-header-box ml-4">

                <CartHeader user={user} />
              </div>
              <div>
                <Dropdown user={user} />
              </div>
            </>
          ) : (
            <div className="flex gap-2 ml-4 login-wrapper">




              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="connection-wrapper"><FaUser /></div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel><Link href='/dashboard'>Autentication</Link></DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <div className='flex gap-2 items-center'>
                    <Link className="btn btn-ghost sign-in-btn" href="/sign-in">
                      <Button className="sign-in-button">Sign in</Button>
                    </Link>
                    <Link className="btn btn-ghost sign-in-btn" href="/sign-up">
                      <Button>Register</Button>
                    </Link>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </>
        <div className="mobile-nav lg:hidden ml-4">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
