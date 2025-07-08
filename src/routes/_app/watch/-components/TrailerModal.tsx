import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import {
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
} from "react-icons/md";

interface Movie {
  poster: string;
}

interface Trailer {
  name: string;
  type: string;
  published_at: string;
  key: string;
}

interface TrailerModalProps {
  movie: Movie;
  trailer: Trailer;
}

interface TrailerVideoProps {
  trailer: Trailer;
}

export default function TrailerModal({ movie, trailer }: TrailerModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function open(): void {
    setIsOpen(true);
  }

  return (
    <>
      <div className="h-32">
        <div
          style={{
            backgroundImage: `url('${movie.poster}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          onClick={open}
          className="w-100 h-full relative group p-4 h-rate border border-border bg-dry rounded-lg overflow-hidden grid items-center justify-center"
        >
          {!isOpen ? (
            <MdOutlinePlayCircleFilled className="text-3xl text-subMain bg-white rounded-full ml-1 mt-1" />
          ) : (
            <MdOutlinePauseCircleFilled className="text-3xl text-subMain bg-white rounded-full ml-1 mt-1" />
          )}
        </div>
      </div>

      <div className="flex size-full justify-end gap-1 z-10 flex-col p-2 px-3 mobile-hero-gradient">
        <div className="flex sm:text-sm !line-clamp-2 font-medium !leading-tight">
          {trailer.name}
        </div>
        <div className="flex !leading-tight !line-clamp-1 items-center text-xs !tracking-wider text-gray-300">
          {trailer.type}
          <span className="shrink-0 mx-1 font-semibold text-centerundefined">
            •
          </span>
          {`${new Date(trailer.published_at).getDate()}/${new Date(trailer.published_at).getMonth()}/${new Date(trailer.published_at).getFullYear()}`}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-screen max-w-prose rounded-xl bg-main/5 p-6 backdrop-blur-3xl">
          <TrailerVideo trailer={trailer} />
        </DialogContent>
      </Dialog>
    </>
  );
}
import YouTube from "react-youtube";

export function TrailerVideo({ trailer }: TrailerVideoProps) {
  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  return trailer ? (
    <div className="relative pb-[56.25%] w-full">
      <YouTube videoId={trailer.key} opts={opts} />
    </div>
  ) : null;
}
