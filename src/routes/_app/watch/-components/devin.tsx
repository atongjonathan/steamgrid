import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Route } from "../$id";
import MovieInfo from "./MovieInfo";
import { SearchCardContents } from "../../-components/Navbar/InputSearch";
import Characters from "./Characters";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Comment } from "./Comment";
import TrailerSlider from "./TrailerSlider";
import VideoPlayer from "./VideoPlayer";
import VideoActionBtns from "./VideoActionBtns";

export default function MovieWatchPage() {
  const [expandedComments, setExpandedComments] = React.useState<Set<number>>(
    new Set()
  );

  const movieData = Route.useLoaderData();
  const split = movieData?.link?.split("/") || [];
  const tmdb_id = split[split.length - 1];
  const toggleCommentExpansion = (commentIdx: number) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(commentIdx)) {
      newExpanded.delete(commentIdx);
    } else {
      newExpanded.add(commentIdx);
    }
    setExpandedComments(newExpanded);
  };

  const Comments = () => (
    <div className="space-y-4 text-text">
      {movieData?.reviews?.map((comment, idx) => (
        <Comment
          key={idx}
          comment={comment}
          toggleCommentExpansion={() => toggleCommentExpansion(idx)}
          expanded={expandedComments.has(idx)}
        />
      ))}
    </div>
  );

  const AddComment = () => (
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
  );

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <VideoPlayer movie={movieData} />

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
                <VideoActionBtns movie={movieData} />
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="plot">
                  <AccordionTrigger>Plot</AccordionTrigger>
                  <AccordionContent>
                    <p>{movieData.plot}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <Characters tmdb_id={tmdb_id} />
            <Separator />

            <TrailerSlider movie={movieData} />

            {/* Comments Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm text-text">
                  Comments ({movieData?.reviews?.length ?? 0})
                </h2>
              </div>
            </div>
            <AddComment />
            <Comments />
          </div>

          {/* Sidebar - Additional Movie Info */}
          <div className="space-y-4">
            <Card>
              <CardContent className="space-y-4">
                <MovieInfo movie={movieData} />
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

            <VideoActionBtns movie={movieData} />

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
                <SheetTitle>{movieData.title}</SheetTitle>
                {/* <SheetDescription>
                  Additional information about {movieData?.title}
                </SheetDescription> */}
              </SheetHeader>
              <MovieInfo movie={movieData} />
            </SheetContent>
          </Sheet>
          <Separator />

          <Characters tmdb_id={tmdb_id} />
          <Separator />
          <TrailerSlider movie={movieData} />

          {/* Mobile Comments Section */}
          <div className="space-y-4">
            <Sheet>
              <SheetTrigger asChild className="m-0!">
                <Card>
                  <CardHeader>
                    <h2 className="font-semibold text-sm text-text">
                      Comments ({movieData?.reviews?.length ?? 0})
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <div>
                      {(movieData?.reviews?.length ?? 0) > 0 && (
                        <Comment
                          comment={movieData?.reviews![0]}
                          toggleCommentExpansion={() =>
                            toggleCommentExpansion(0)
                          }
                          expanded={expandedComments.has(0)}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] overflow-scroll">
                <SheetHeader>
                  <h2 className="font-semibold text-text">
                    Comments ({movieData?.reviews?.length ?? 0})
                  </h2>
                </SheetHeader>
                {/* Add Comment - Mobile */}
                <AddComment />
                {/* Mobile Comments List */}
                <Comments />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
