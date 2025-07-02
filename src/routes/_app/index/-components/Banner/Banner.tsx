import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerItem from "./BannerItem";
import "swiper/css";
import "swiper/css/effect-fade";
import { Route } from "../../route";

const Banner = () => {
  let movies = Route.useLoaderData();

  return (
    <>
      {/* {
        isLoading ?
          <div className="relative w-full">
            <div className="relative h-96  py-10 overflow-hidden bg-dry z-10 ">
              <div className="lg:w-7/12 absolute linear-bg xl:pl-32 sm:pl-32 px-3 top-0 bottom-0 right-0 left-0 flex flex-col lg:pt-2 pt-10  lg:gap-7 md:gap-5 gap-4 z-20 md:h-96 min-h-80 max-h-96 justify-center">
                <Skeleton baseColor="rgb(22 28 63)" height={30} />
                <div className="flex gap-5 items-center text-dryGray">
                  <Skeleton baseColor="rgb(22 28 63)" height={30} width={300} />
                </div>
                <Skeleton baseColor="rgb(22 28 63)" height={70} />
                <div className="flex gap-5 items-center">
                  <Skeleton baseColor="rgb(22 28 63)" height={35} width={100} />
                  <Skeleton baseColor="rgb(22 28 63)" height={35} width={50} />
                </div>
              </div>
            </div>
          </div>
          : */}
      <div className="relative w-full">
        <Swiper
          className="w-full  h-96  bg-dry"
          slidesPerView={1}
          resistanceRatio={0.1}
          loop
          direction="horizontal"
          speed={1000}
          grabCursor
          keyboard
          modules={[Autoplay, EffectFade]}
          autoplay={{
            delay: 10000,
            disableOnInteraction: true,
          }}
        >
          {movies?.map((movie, idx) => (
            <SwiperSlide key={idx} className="relative overflow-hidden">
              <BannerItem movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <Notifier movies={movies}/> */}
      </div>
      {/* } */}
    </>
  );
};

export default Banner;
