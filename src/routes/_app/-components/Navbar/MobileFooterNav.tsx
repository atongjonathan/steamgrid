import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { navItems } from "./Navbar";

const Hover =
  "transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3 h-max [&.active]:text-subMain ";

const MobileFooterNav = () => {
  return (
    <footer className="md:hidden sm:flex fixed z-50 bottom-0 w-full">
      <div className="rounded-md p-1 bg-gradient-to-t from-dry from-40% to-100% flex justify-around items-center w-full">
        {navItems.map((item, idx) => (
          <Button
            key={idx}
            onClick={() => console.log(`${item.label} clicked`)}
            asChild
            variant="ghost"
            className={Hover}
          >
            <Link to={item.to} className={Hover}>
              <item.icon size={16} />
              <p className="text-sm">{item.label}</p>
            </Link>
          </Button>
        ))}
      </div>
    </footer>
  );
};

export default MobileFooterNav;
