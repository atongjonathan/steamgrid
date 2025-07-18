import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaStar } from "react-icons/fa";
import type { Movie } from "@/api";
import { Badge } from "@/components/ui/badge";

type MovieInfoProps = {
  movie: Movie;
};

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  const date = new Date(movie.releaseDate);
  const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return (
    <>
      <div className="col-span-4 lg:col-span-1">
        <div className="grid grid-cols-3 lg:grid-cols-2 gap-3">
          <div className="col-span-1 lg:col-span-2 flex flex-col items-center w-full gap-3 pt-8 lg:pt-4">
            <div className="border border-border p-1 rounded overflow-hidden relative h-fit">
              <LazyLoadImage
                src={movie.poster}
                alt={movie.title}
                title={movie.title}
                className="object-cover lg:h-64 mx-auto transition-opacity duration-300"
              />
              <div className="absolute flex justify-center gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
                <h6 className="font-semibold truncate flex flex-col gap-1">
                  <p className="line-clamp-2"> {movie.title}</p>
                  <div className="flex items-center justify-center gap-1">
                    <FaStar className="w-3 h-3 text-yellow-400" />
                    {movie.rating_star}
                  </div>
                </h6>
              </div>
            </div>
          </div>

          <div className="col-span-2 lg:col-span-2 flex flex-col gap-4 pl-4 py-3 text-white text-sm 2xl:text-base tracking-wider w-full">
            {/* Mobile Plot - Now inside content container */}
            <div className="lg:hidden">
              <Accordion type="single" collapsible defaultValue="mobile-plot">
                <AccordionItem value="mobile-plot">
                  <AccordionTrigger className="text-left">
                    <h6 className="font-semibold bg-dry py-2 mt-2 text-center text-sm md:text-lg">
                      Plot
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>{movie.plot}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            {/* Language(s) */}
            <div className="flex flex-col gap-1 font-light">
              <span className="font-medium text-gray-200">Language(s)</span>
              <span>
                {movie.spokenLanguages.map((l) => l.language).join(", ")}
              </span>
            </div>

            {/* Aired Date */}
            <div className="flex flex-col gap-1 font-light">
              <span className="font-medium text-gray-200">Aired</span>
              <span>{dateStr}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {movie?.genre.map((g) => (
                <Badge key={g} variant="secondary" className="text-xs">
                  {g}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
