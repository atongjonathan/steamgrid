import {
  Link,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import logo from "../../../../assets/logo.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import clsx from "clsx";
import { useAuth } from "@/components/context/AuthContext";
import { useState, type FC } from "react";
import Login from "@/components/modals/Login";
import SignUp from "@/components/modals/SignUp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MoreNavItem from "./MoreNavItem";
import { ArrowLeft, Bookmark, Filter, History, Settings } from "lucide-react";
import InputSearch from "./InputSearch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Categories from "../../index/-components/Categories";
import InfoBanner from "../../index/-components/InfoBanner";
import { Button } from "@/components/ui/button";
import { useCanGoBack } from "@tanstack/react-router";

export const UserMenuItem: FC<{ baseClasses: string }> = ({ baseClasses }) => {
  const [isLoginOpen, setisLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const loginProps = { isLoginOpen, setisLoginOpen, setIsSignUpOpen };
  const signUpProps = { isSignUpOpen, setIsSignUpOpen, setisLoginOpen };

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

  const { isAuthenticated, user } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/profile">
              <Avatar title={user?.username}>
                <AvatarImage src={user?.image} alt={user?.username} />
                <AvatarFallback>
                  {user?.username?.slice(0, 2)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ) : (
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
      )}
    </>
  );
};
export const navItems = [
  { to: "/history", label: "History", icon: History },
  { to: "/watchlist", label: "Saved", icon: Bookmark },
  { to: "/settings", label: "Settings", icon: Settings },
];

const LargeNavbar = () => {
  const baseClasses =
    "border py-2 px-3 rounded-lg transitions flex gap-2 items-center [&.active]:text-subMain hover:[&.active]:bg-main";
  const linkClass = clsx(
    "bg-main border-subMain hover:bg-subMain",
    baseClasses
  );

  return (
    <div className="hidden md:flex px-7 py-3 justify-between items-center min-h-7 w-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/" className="flex items-center justify-center">
              <img
                src={logo}
                alt="logo"
                className="w-full h-12 object-contain scale-[0.5]"
              />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink>
            <InputSearch />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      {/* Logo */}

      {/* Menus for larger screens */}
      <NavigationMenuList>
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavigationMenuItem key={to}>
            <NavigationMenuLink asChild>
              <Link className={linkClass} to={to}>
                <Icon size={12} />
                {label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        <UserMenuItem baseClasses={baseClasses} />
        <MoreNavItem />
      </NavigationMenuList>
    </div>
  );
};

const MobileNavbar = () => {
  const baseClasses =
    "border py-2 px-3 rounded-lg transitions flex gap-2 items-center [&.active]:text-subMain";
  const { pathname } = useLocation();
  const router = useRouter();
  const navigate = useNavigate();
  const canGoBack = useCanGoBack();
  const handleClick = () => {
    if (canGoBack) router.history.back();
    else navigate({ to: "/" });
  };

  if (pathname === "/search")
    return (
      <div className="md:hidden flex items-center gap-2 w-full bg-background text-foreground">
        {/* Back button */}
        <Button
          onClick={handleClick}
          variant="ghost"
          className="p-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={20} />
        </Button>

        {/* Search input */}
        <InputSearch />

        {/* Filter button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/explore"
                className="p-2 text-muted-foreground hover:text-foreground"
              >
                <Filter size={20} />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Explore</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );

  return (
    <div className="md:hidden flex justify-between text-text text-sm gap-3">
      <NavigationMenuList className="w-[90vw]">
        <NavigationMenu>
          <NavigationMenuLink asChild>
            <Link to="/" className="flex items-center justify-center">
              <img
                src={logo}
                alt="logo"
                className="w-full h-12 object-contain scale-[0.5]"
              />
            </Link>
          </NavigationMenuLink>
          <InputSearch />
        </NavigationMenu>
        <UserMenuItem baseClasses={baseClasses} />
        <MoreNavItem />
      </NavigationMenuList>
    </div>
  );
};
const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div className="relative">
      <NavigationMenu className="w-full px-5 fixed z-50 top-0 bg-background/90 flex flex-col">
        <div className="w-full">
          <MobileNavbar />
          <LargeNavbar />
        </div>
        <InfoBanner />
        {pathname === "/" && <Categories />}
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
