import { type BannerMovie, updateUser, type Movie } from "@/api";
import { useAuth } from "@/components/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { HandHelpingIcon, Loader2Icon, ThumbsUp, Share } from "lucide-react";
import { toast } from "sonner";
import Actions from "../../index/-components/Banner/Actions";

const VideoActionBtns = ({ movie }: { movie: BannerMovie | Movie }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto">
      <LikeBtn movie={movie} />
      <Actions movie={movie} />
      <ShareBtn movie={movie} />
      <Button variant="outline" size="sm">
        <HandHelpingIcon className="h-4 w-4" />
        Support
      </Button>
    </div>
  );
};

export default VideoActionBtns;
const LikeBtn = ({ movie }: { movie: BannerMovie | Movie }) => {
  const { user, fetchUser } = useAuth();
  const { id } = movie;
  const liked = user?.favourites.some((fav) => fav.id === id);

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateMe"],
    mutationFn: async () => {
      if (!user) throw new Error("No user found");

      let updatedFavourites;
      if (liked) {
        updatedFavourites = user.favourites.filter((fav) => fav.id !== id);
      } else {
        updatedFavourites = [...user.favourites, movie];
      }

      const update = {
        favourite_ids: updatedFavourites.map((fav) => fav.id),
        favourites: updatedFavourites,
      };

      await updateUser({ ...user, ...update });
      return fetchUser();
    },
  });

  return (
    <Button variant="outline" size="sm" onClick={() => mutate()}>
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <ThumbsUp className="h-4 w-4 mr-2" fill={liked ? "white" : undefined} />
      )}

      {liked ? "Liked" : "Like"}
    </Button>
  );
};

export const handleShare = async (title: string, id: number) => {
  const shareData = {
    title,
    text: `Watch '${title}' at StreamGrid`,
    url: "https://streamgrid.stream/watch/" + id,
  };

  if (!navigator.share) {
    toast.error("Web Share is not supported in this browser");
    return;
  }

  try {
    if (navigator.canShare && !navigator.canShare(shareData)) {
      toast.error("Cannot share this content from this device");
      return;
    }

    await navigator.share(shareData);
  } catch (err) {
    let error = err as Error;
    if (error.name !== "AbortError") {
      toast.error("Sharing failed: " + error.message);
    }
  }
};

const ShareBtn = ({ movie }: { movie: BannerMovie | Movie }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => handleShare(movie.title, movie.id)}
    >
      <Share className="h-4 w-4 mr-2" />
      Share
    </Button>
  );
};
