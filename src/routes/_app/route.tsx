import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import Navbar from "./-components/Navbar/Navbar";
import MobileFooterNav from "./-components/Navbar/MobileFooterNav";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pathname } = useLocation();
  const atExplore = pathname === "/explore" || pathname === "/watch";

  return (
    <>
      <div className="bg-main text-white relative min-h-[95vh] lg:min-h-[100vh]">
        <Navbar />

        <MobileFooterNav />
        <div
          className={`lg:${atExplore ? `mt-20` : "mt-36"} md:${atExplore ? `[120px]` : "36"} ${atExplore ? `mt-14` : "mt-4"}`}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}
