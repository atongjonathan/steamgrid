import type { MinMovie } from "@/api";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const Movie = ({ movie }: { movie: MinMovie }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="p-1 hover:scale-95 transition-transform relative rounded overflow-hidden flex flex-col gap-2">
            <Link to={`/watch/$id`} params={{ id: movie.id.toString() }} className="block w-full aspect-[216/319] relative">
                {!loaded && (
                    <Skeleton
                        baseColor="rgb(11 15 41)"
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        containerClassName="w-full h-full"
                    />
                )}

                <LazyLoadImage
                    onLoad={() => setLoaded(true)}
                    src={movie.poster}
                    alt={movie.title}
                    title={movie.title}
                    effect="opacity"
                    className={`w-full h-full object-cover absolute top-0 left-0 rounded-lg transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </Link>
            <a className="flex w-full flex-col gap-1" href="/watch/movie/552524">
                
                <div className="flex w-full text-[.82rem] sm:text-sm font-medium !line-clamp-2 tracking-wider">
                    {movie.title}
                </div>
            </a>
        </div>
    );
};

export default Movie
