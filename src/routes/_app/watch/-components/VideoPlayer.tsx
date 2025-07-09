import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/audio.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import {
  MediaPlayer,
  MediaProvider,
  Menu,
  MenuInstance,
  PIPButton,
  Poster,
  SeekButton,
} from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import { updateUser, type Movie, type User } from "@/api";
import { useAuth } from "@/components/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  PictureInPictureExitIcon,
  PictureInPictureIcon,
  QuestionMarkIcon,
} from "@vidstack/react/icons";
import {
  SeekBackward10Icon,
  SeekForward10Icon,
  DownloadIcon,
} from "@vidstack/react/icons";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { RefreshCcwDotIcon } from "lucide-react";

const VideoPlayer = ({ movie }: { movie: Movie }) => {
  const [src, setSrc] = useState(movie.stream);
  return (
    <MediaPlayer
      src={{ src, type: "video/mp4" }}
      streamType="on-demand"
      logLevel="warn"
      crossOrigin
      playsInline
      title={movie.title}
      poster={movie.poster}
      aspectRatio="16x9"
    >
      <MediaProvider>
        <Poster className="vds-poster" />
      </MediaProvider>
      <Layout movie={movie} setSrc={setSrc} />
    </MediaPlayer>
  );
};

export default VideoPlayer;

const Layout = ({
  movie,
  setSrc,
}: {
  movie: Movie;
  setSrc: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { user } = useAuth();
  const menuref = useRef<MenuInstance>(null!);

  return (
    <DefaultVideoLayout
      icons={defaultLayoutIcons}
      download={
        user
          ? {
              url: movie.stream.replace("video", "dl"),
              filename: movie.title,
            }
          : undefined
      }
      slots={{
        beforePlayButton: null,
        afterPlayButton: null,
        beforeGoogleCastButton: (
          <Menu.Root ref={menuref} className="vds-menu">
            <Menu.Button
              className="vds-menu-button vds-button"
              aria-label="Settings"
            >
              <QuestionMarkIcon className="vds-icon" />
            </Menu.Button>
            <Menu.Items
              className="vds-menu-items"
              placement="bottom"
              offset={0}
            >
              <Button
                variant={"secondary"}
                className="p-0"
                onClick={() => {
                  setSrc(movie.stream.replace("video", "dl"));
                  setTimeout(() => {
                    // const progressData = JSON.parse(
                    //   localStorage.getItem(VIDEO_PROGRESS_KEY) || "{}"
                    // );
                    setSrc(movie.stream);
                    // setInitialTime((prev) => {
                    //   return progressData[movie.id]?.time ?? 0;
                    // });
                    menuref.current?.close();
                  }, 10);
                }}
              >
                <RefreshCcwDotIcon className="vds-icon" />
                Refresh
              </Button>
            </Menu.Items>
          </Menu.Root>
        ),
        smallLayout: {
          beforeFullscreenButton: <BackwardButton />,
          afterFullscreenButton: <ForwardButton />,
          afterGoogleCastButton: (
            <PIPButton className="vds-button">
              <PictureInPictureIcon className="pip-enter-icon vds-icon" />
              <PictureInPictureExitIcon className="pip-exit-icon vds-icon" />
            </PIPButton>
          ),
        },
        downloadButton: user && (
          <DownloadButton
            user={user}
            stream={movie.stream}
            title={movie.title}
            id={movie.id}
          />
        ),
      }}
    />
  );
};

const ForwardButton = () => (
  <SeekButton className="vds-button" seconds={10}>
    <SeekForward10Icon className="vds-icon" />
  </SeekButton>
);

const BackwardButton = () => (
  <SeekButton className="vds-button" seconds={-10}>
    <SeekBackward10Icon className="vds-icon" />
  </SeekButton>
);
type DownloadButtonProps = {
  user: User;
  stream: string;
  title: string;
  id: number;
};
const DownloadButton = ({ user, stream, title, id }: DownloadButtonProps) => {
  const { fetchUser } = useAuth();
  const { mutate } = useMutation({
    mutationKey: ["updateMe"],
    mutationFn: () => {
      let { downloaded } = user;
      const update: { downloaded_ids: number[] } = { downloaded_ids: [] };
      const downloaded_ids = downloaded
        .filter((item) => item.id !== id)
        .map((item) => item.id);
      downloaded_ids.push(id);
      update.downloaded_ids = downloaded_ids;
      return updateUser({ ...user, ...update }).then(() => fetchUser());
    },
  });

  return (
    <button
      className="vds-button"
      onClick={() => {
        if (user) {
          mutate();
          const link = document.createElement("a");
          link.href = stream.replace("video", "dl");
          link.download = `StreamGrid - ${title}`;
          link.click();
        } else {
          toast.info("Only logged in users can download", {
            closeButton: true,
          });
        }
      }}
    >
      <DownloadIcon />
    </button>
  );
};
