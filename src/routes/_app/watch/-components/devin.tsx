import * as React from "react";
import {
  Play,
  ThumbsUp,
  ThumbsDown,
  Share,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Route } from "../$id";
import MovieInfo from "./MovieInfo";
import { SearchCardContents } from "../../-components/Navbar/InputSearch";
import Characters from "./Characters";

export default function MovieWatchPage() {
  const [expandedComments, setExpandedComments] = React.useState<Set<string>>(
    new Set()
  );

  const movieData = Route.useLoaderData();
  const split = movieData?.link?.split("/") || [];
  const tmdb_id = split[split.length - 1];
  const toggleCommentExpansion = (commentId: string) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedComments(newExpanded);
  };

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Video Player Section */}
        <div className="aspect-video bg-black rounded-lg mb-6 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="lg" className="rounded-full w-16 h-16">
              <Play className="h-8 w-8 ml-1" />
            </Button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Movie Title and Actions */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{movieData?.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <span>{movieData?.year}</span>
                    <span>•</span>
                    <span>{movieData?.runtime}</span>
                    <span>•</span>
                    <Badge variant="secondary">
                      {movieData?.contentRating}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Dislike
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-sm">{movieData?.plot}</p>
            </div>
            <Characters tmdb_id={tmdb_id} />
            <Separator />

            {/* Comments Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {movieData?.reviews?.length} Comments
                </h2>
              </div>

              {/* Add Comment */}
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Add a comment..."
                    className="min-h-[80px]"
                  />
                  <div className="flex justify-end mt-2">
                    <Button size="sm">Comment</Button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {movieData?.reviews?.map((comment, idx) => (
                  <div key={idx} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.authorUrl ?? ""} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-muted-foreground">{`@${comment.author}`}</span>

                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                          {comment.date}
                        </span>
                      </div>
                      <h4 className="font-medium">{comment.heading}</h4>
                      <div className="text-sm">
                        <p
                          className={
                            expandedComments.has(comment.id?.toString() ?? "")
                              ? ""
                              : "line-clamp-3"
                          }
                        >
                          {comment.content}
                        </p>
                        {comment.content?.length > 200 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 h-auto mt-1 font-normal text-xs"
                            onClick={() =>
                              toggleCommentExpansion(
                                comment.id?.toString() ?? ""
                              )
                            }
                          >
                            {expandedComments.has(comment.id?.toString() ?? "")
                              ? "Show less"
                              : "Read more"}
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto"
                        >
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {comment.helpfulNess.votedAsHelpful}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto"
                        >
                          <ThumbsDown className="h-3 w-3 mr-1" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Additional Movie Info */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Movie Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="">Year:</span>
                    <span>{movieData?.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="">Duration:</span>
                    <span>{movieData?.runtime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="">Rating:</span>
                    <span>{movieData?.rating_star}</span>
                  </div>
                </div> */}
                <MovieInfo movie={movieData} />
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Genres</h4>
                  <div className="flex flex-wrap gap-1">
                    {movieData?.genre.map((g) => (
                      <Badge key={g} variant="secondary" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <SearchCardContents />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Movie Title and Actions */}
          <div className="space-y-4">
            <div>
              <h1 className="text-xl font-bold">{movieData?.title}</h1>
              <div className="flex items-center gap-2  mt-1 text-sm">
                <span>{movieData?.year}</span>
                <span>•</span>
                <span>{movieData?.runtime}</span>
                <span>•</span>
                <Badge variant="secondary" className="text-xs">
                  {movieData?.contentRating}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <ThumbsDown className="h-4 w-4 mr-1" />
                Dislike
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>

            {/* Mobile Movie Info Collapsible */}
          </div>
          {/* Sheet for Additional Movie Info on Mobile */}
          <Sheet>
            <SheetTrigger asChild className="m-0!">
              <div className="space-y-2">
                <p className="text-sm  line-clamp-2">{movieData?.plot}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto mt-1 font-normal text-white text-xs"
                >
                  More info
                </Button>
              </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Movie Details</SheetTitle>
                <SheetDescription>
                  Additional information about {movieData?.title}
                </SheetDescription>
              </SheetHeader>
              <MovieInfo movie={movieData} />

            </SheetContent>
          </Sheet>

          <Separator />

          {/* Mobile Comments Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              {movieData?.reviews?.length} Comments
            </h2>

            {/* Add Comment - Mobile */}
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Add a comment..."
                  className="min-h-[60px] text-sm"
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm">Comment</Button>
                </div>
              </div>
            </div>

            {/* Mobile Comments List */}
            <div className="space-y-4">
              {movieData?.reviews?.map((comment, idx) => (
                <div key={idx} className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.authorUrl ?? ""} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
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
                      <p
                        className={
                          expandedComments.has(comment.id?.toString() ?? "")
                            ? "text-xs"
                            : "line-clamp-3 text-xs"
                        }
                      >
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
                          {expandedComments.has(comment.id?.toString() ?? "")
                            ? "Show less"
                            : "Read more"}
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {comment.helpfulNess.votedAsHelpful}
                      </Button>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <ThumbsDown className="h-3 w-3 mr-1" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
