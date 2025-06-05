import { Link, } from "@tanstack/react-router";
import logo from "../../../../assets/logo.png"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import clsx from "clsx";
import { useAuth } from "@/components/context/AuthContext";
import { useState, type FC } from "react";
import Login from "@/components/modals/Login";
import SignUp from "@/components/modals/SignUp";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MoreNavItem from "./MoreNavItem";
import { Heart, History, Settings } from "lucide-react";

export const UserMenuItem: FC<{ baseClasses: string }> = ({ baseClasses }) => {

  const [isLoginOpen, setisLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const loginProps = { isLoginOpen, setisLoginOpen, setIsSignUpOpen }
  const signUpProps = { isSignUpOpen, setIsSignUpOpen, setisLoginOpen }



  const linkClass = clsx(
    "bg-main border-subMain hover:bg-subMain",
    baseClasses,
    isLoginOpen ? "text-subMain bg-main hover:bg-main" : ""

  );
  const signUpClass = clsx(
    `bg-subMain hover:bg-main [&.active]:text-white hover:text-white hover:border hover:border-subMain`,
    baseClasses,
    isSignUpOpen ? "text-subMain bg-main !border !border-subMain" : ""

  );

  const { user } = useAuth()
  return (
    <>
      {
        user ? <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/profile">
              <Avatar title={user.username}>
                <AvatarImage src={user.image} alt={user.username} />
                <AvatarFallback>
                  {user?.username?.slice(0, 2)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
          : (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Login loginClass={linkClass} loginProps={loginProps} />
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <SignUp loginClass={signUpClass} signUpProps={signUpProps} />
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>

          )
      }

    </>
  )
}

const LargeNavbar = () => {
  const baseClasses = "border py-2 px-3 rounded-lg transitions flex gap-2 items-center [&.active]:text-subMain hover:[&.active]:bg-main";
  const linkClass = clsx(
    "bg-main border-subMain hover:bg-subMain",
    baseClasses
  );

  const navItems = [
    { to: "/history", label: "History", icon: <History size="12" /> },
    { to: "/watchlist", label: "Favourites", icon: <Heart size="12" /> },
    { to: "/settings", label: "Settings", icon: <Settings size="12" /> },
  ];


  return (
    <div className="hidden md:flex px-7 py-3 justify-between items-center min-h-7 w-full">
      {/* Logo */}
      <NavigationMenuLink asChild>
        <Link to="/" className="flex items-center justify-center">
          <img
            src={logo}
            alt="logo"
            className="w-full h-12 object-contain scale-[0.5]"
          />
        </Link>
      </NavigationMenuLink>
      <NavigationMenuLink className="w-6/12">
        <Input placeholder='Search' />
      </NavigationMenuLink>



      {/* Menus for larger screens */}
      <NavigationMenuList>
        {navItems.map(({ to, label, icon }) => (
          <NavigationMenuItem key={to}>
            <NavigationMenuLink asChild>
              <Link className={linkClass} to={to}>
                {icon}
                {label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        <UserMenuItem baseClasses={baseClasses} />
        <MoreNavItem />
      </NavigationMenuList>


    </div>
  )
}

const MobileNavbar = () => {

  const baseClasses = "border py-2 px-3 rounded-lg transitions flex gap-2 items-center [&.active]:text-subMain";



  return (

    <div className="md:hidden flex justify-between text-text text-sm gap-3">
      <NavigationMenuList className="w-[90vw]">
        <NavigationMenu >
          <NavigationMenuLink asChild>
            <Link to="/" className="flex items-center justify-center">
              <img
                src={logo}
                alt="logo"
                className="w-full h-12 object-contain scale-[0.5]"
              />
            </Link>
          </NavigationMenuLink>
          <Input placeholder='Search' />
        </NavigationMenu>
        <UserMenuItem baseClasses={baseClasses} />
        <MoreNavItem />
      </NavigationMenuList>


    </div>

  )
}
const Navbar = () => {


  return (
    <NavigationMenu className="w-full px-5">
      <MobileNavbar />
      <LargeNavbar />
    </NavigationMenu>
  );
};

export default Navbar;
