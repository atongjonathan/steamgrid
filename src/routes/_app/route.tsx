import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import Navbar from "./-components/Navbar/Navbar";
import MobileFooterNav from "./-components/Navbar/MobileFooterNav";
import { FadeLoader } from "react-spinners";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

export const PendingComponent = () => (
  <section className="h-[80vh] flex justify-center items-center">
    <FadeLoader
      color={"#14759f"}
      loading={true}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </section>
);
function RouteComponent() {
  const { pathname } = useLocation();
  const atHome = pathname === "/";
  const atWatch = pathname.includes("/watch");

  return (
    <>
      <div className="bg-main text-white relative min-h-[95vh] lg:min-h-[100vh] pb-20 lg:pb-0">
        <Navbar />

        <MobileFooterNav />
        <div className={atHome ? `lg:mt-36 mt-28` : atWatch ? "mt-16" : ""}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
