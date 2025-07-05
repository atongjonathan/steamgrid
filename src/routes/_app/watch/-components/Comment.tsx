import type { CommentT } from "@/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export const Comment = ({
  comment,
  expanded,
  toggleCommentExpansion,
}: {
  comment: CommentT;
  expanded: boolean;
  toggleCommentExpansion: (commentId: string) => void;
}) => {
  return (
    <div
      className="flex gap-3 text-text"
      onClick={() => toggleCommentExpansion(comment.id?.toString() ?? "")}
    >
      <Avatar className="w-8 h-8">
        <AvatarImage src={comment.authorUrl ?? ""} />
        {comment.author?.length > 0 && (
          <AvatarFallback>{comment.author[0]}</AvatarFallback>
        )}{" "}
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium text-muted-foreground">{`@${comment.author}`}</span>
            <span className="text-muted-foreground text-xs">
              {comment.date}
            </span>
          </div>
        </div>
        <h4 className="font-medium text-sm">{comment.heading}</h4>
        <div className="text-sm ">
          <p className={expanded ? "text-xs" : "line-clamp-3 text-xs"}>
            {comment.content}
          </p>
          {comment.content?.length > 200 && (
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto mt-1 font-normal text-xs text-white"
              onClick={() =>
                toggleCommentExpansion(comment.id?.toString() ?? "")
              }
            >
              {expanded ? "Show less" : "Read more"}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <ThumbsUp className="h-3 w-3 mr-1" />
            {comment.helpfulNess?.votedAsHelpful}
          </Button>
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            <ThumbsDown className="h-3 w-3 mr-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
