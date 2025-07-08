import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "@tanstack/react-query";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getMovies } from "@/api";
import Movie from "../../-components/Movie";
import type { Swiper as SwiperT } from "swiper/types";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SgSlider = ({
  params,
  title,
}: {
  params: Record<string, any>;
  title: string;
}) => {
  const dummy = [1, 2, 3, 4, 5, 6, 7];

  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["sliderQuery", params],
    queryFn: () => {
      return getMovies({
        params,
      });
    },
    staleTime: Infinity,
  });
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [endDisabled, setEndDisabled] = useState(false);
  const [startDisabled, setStartDisabled] = useState(true);
  const navigate = useNavigate();

  // Reset button states based on slider position
  const handleSliderChange = (start: boolean, end: boolean) => {
    if (end) {
      setEndDisabled(true);
      setStartDisabled(false); // Reset startDisabled when reaching the end
    } else if (start) {
      setStartDisabled(true);
      setEndDisabled(false); // Reset endDisabled when reaching the start
    } else {
      setStartDisabled(false);
      setEndDisabled(false); // Neither start nor end
    }
  };

  // Handle slide change to reset button states
  const onSlideChange = (swiper: SwiperT) => {
    const isAtStart = swiper.isBeginning;
    const isAtEnd = swiper.isEnd;

    if (isAtStart && !isAtEnd) {
      handleSliderChange(true, false); // At the beginning
    } else if (isAtEnd && !isAtStart) {
      handleSliderChange(false, true); // At the end
    } else {
      handleSliderChange(false, false); // Neither at start nor end
    }
  };

  const visibleTitles = ["Recently Added", "Latest Release"];

  return (
    <LazyLoadComponent visibleByDefault={visibleTitles.includes(title)}>
      <div className="lg:mt-5 mt-5">
        <div className="w-full flex justify-between">
          <div className="flex sm:gap-3 gap-2 items-center truncate">
            {isLoading ? (
              <Skeleton />
            ) : (
              isSuccess && (
                <>
                  <h2 className="font-semibold truncate">{title}</h2>
                </>
              )
            )}
          </div>

          {isSuccess && (
            <div className="px-2 flex justify-center gap-2">
              <Button
                className={`transition duration-100 ease-in text-sm rounded-lg w-7 h-7 flex-colo text-white "
                                    }`}
                ref={(node) => setPrevEl(node)}
                disabled={startDisabled}
              >
                <ArrowLeft />
              </Button>
              <Button
                className={`transition duration-100 ease-in text-sm rounded-lg w-7 h-7 flex-colo text-white`}
                ref={(node) => setNextEl(node)}
                disabled={endDisabled}
              >
                <ArrowRight />
              </Button>
            </div>
          )}
        </div>

        <div className="mt-3">
          <Swiper
            id={title}
            navigation={{ nextEl, prevEl }}
            slidesPerView={3}
            spaceBetween={5}
            speed={500}
            className=""
            modules={[Navigation]}
            onSlideChange={onSlideChange} // Trigger this on every slide change
            onReachEnd={(swiper) =>
              handleSliderChange(swiper.isBeginning, swiper.isEnd)
            } // End reached
            onReachBeginning={(swiper) =>
              handleSliderChange(swiper.isBeginning, swiper.isEnd)
            } // Beginning reached
            onSwiper={(swiper) => {
              if (isSuccess)
                handleSliderChange(swiper.isBeginning, swiper.isEnd);
            }}
            breakpoints={{
              0: {
                slidesPerView: 3,
                spaceBetween: 10,
              },

              768: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              992: {
                slidesPerView: 7,
                spaceBetween: 10,
              },
            }}
          >
            {isLoading ? (
              <>
                {dummy.map((id) => (
                  <SwiperSlide className="cursor-pointer" key={id}>
                    <Skeleton
                      baseColor="rgb(11 15 41)"
                      className="rounded-lg w-full aspect-[216/319]"
                    />
                  </SwiperSlide>
                ))}
              </>
            ) : (
              <>
                {data?.results?.map((movie, idx) => (
                  <SwiperSlide
                    className="cursor-pointer"
                    key={idx}
                    onClick={() => navigate({ to: `/watch/${movie.id}` })}
                  >
                    <Movie movie={movie} />
                  </SwiperSlide>
                ))}
              </>
            )}
          </Swiper>
        </div>
      </div>
    </LazyLoadComponent>
  );
};

export default SgSlider;
