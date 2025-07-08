import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "@tanstack/react-query";
import { getTrailers, type Movie } from "@/api";
import { Button } from "@/components/ui/button";
import type { Swiper as SwiperT } from "swiper/types";
import TrailerModal from "./TrailerModal";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TrailerSlider = ({ movie }: { movie: Movie }) => {
  const split = movie?.link?.split("/") || [];
  const tmdb_id = split[split.length - 1];

  const { isPending, data } = useQuery({
    queryKey: ["trailerQuery", tmdb_id],
    queryFn: () => getTrailers(tmdb_id),
    enabled: !!tmdb_id,
  });

  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [startDisabled, setStartDisabled] = useState(false);
  const [endDisabled, setEndDisabled] = useState(false);

  const handleSliderChange = (start: boolean, end: boolean) => {
    setStartDisabled(!!start);
    setEndDisabled(!!end);
  };

  const onSlideChange = (swiper: SwiperT) => {
    handleSliderChange(swiper.isBeginning, swiper.isEnd);
  };

  return (
    <div>
      {(data?.length ?? 0) > 0 && (
        <div className="w-full flex justify-between items-center mt-5">
          <h2 className="text-sm font-semibold truncate">
            More Videos
            <span> {`(${data?.length})`}</span>
          </h2>
          <div className="flex gap-2">
            <Button
              className={`transition text-sm rounded w-7 h-7 flex items-center justify-center text-white bg-subMain active:bg-dry"
              }`}
              ref={(node) => setPrevEl(node)}
              disabled={startDisabled}
            >
              <ArrowLeft />
            </Button>
            <Button
              className={`transition text-sm rounded w-7 h-7 flex items-center justify-center text-white`}
              ref={(node) => setNextEl(node)}
              disabled={endDisabled}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
      )}

      <div className="mt-5">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          speed={500}
          navigation={{ nextEl, prevEl }}
          modules={[Navigation, Autoplay]}
          onSlideChange={onSlideChange}
          onSwiper={(swiper) => {
            handleSliderChange(swiper.isBeginning, swiper.isEnd);
          }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 4, spaceBetween: 30 },
          }}
        >
          {isPending && (
            <div className="flex overflow-x-scroll">
              {Array.from({ length: 4 }).map((item, idx) => (
                <div
                  key={`${item as undefined}-${idx}`}
                  className="w-full aspect-video rounded-lg overflow-hidden bg-white/10"
                >
                  <Skeleton
                    baseColor="rgb(22 28 63)"
                    className="w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}

          {data &&
            data?.map((item, idx) => (
              <SwiperSlide key={idx} className="cursor-pointer h-fit">
                <TrailerModal movie={movie} trailer={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TrailerSlider;
