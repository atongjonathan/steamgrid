import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import Navbar from "./-components/Navbar/Navbar";
import MobileFooterNav from "./-components/Navbar/MobileFooterNav";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pathname } = useLocation();
  const atHome = pathname === "/";

  return (
    <>
      <div className="bg-main text-white relative min-h-[95vh] lg:min-h-[100vh]">
        <Navbar />

        <MobileFooterNav />
        <div className={atHome ? `lg:mt-36 mt-28` : ""}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
