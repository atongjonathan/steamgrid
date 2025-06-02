import React from "react";
import { CalendarCheck, ClockFading } from "lucide-react";
import type { BannerMovie } from "@/api";

const BannerFlexItems: React.FC<{ movie: BannerMovie }> = ({ movie })  => {

  return movie?.id && (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{movie.genre[0]}</span>
      </div>
      <div className="flex items-center gap-2">
        <CalendarCheck color="#14759f" size={14} />
        <span className="text-sm font-medium">{movie.year}</span>
      </div>
      <div className="flex items-center gap-2">
        <ClockFading color="#14759f" size={14} />
        <span className="text-sm font-medium">{movie.runtime}</span>
      </div>

    </>
  );
};

export default BannerFlexItems;
