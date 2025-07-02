import {
  Banner,
  BannerClose,
  BannerIcon,
  BannerTitle,
  BannerAction,
} from "@/components/ui/shadcn-io/banner";
import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx"; // Optional: for cleaner class management

const InfoBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200); // Delay by 1.2s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={clsx(
        "transition-all duration-700 transform absolute mt-20",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-3 pointer-events-none"
      )}
    >
      <Banner className="border border-white rounded mx-1">
        <BannerIcon icon={CircleAlert} />
        <BannerTitle>
          You are currently using the new improved UI experience.
        </BannerTitle>
        <BannerAction
          className="bg-main border border-white hover:bg-main/70 hover:text-white"
          asChild
        >
          <a rel="noopener" href="https://streamgrid.stream" target="_blank">
            Go back
          </a>
        </BannerAction>
        <BannerClose />
      </Banner>
    </div>
  );
};

export default InfoBanner;
