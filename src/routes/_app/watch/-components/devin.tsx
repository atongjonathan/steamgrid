import * as React from "react";
import {
  ChevronDown,
  Info,
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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
    handle: string;
  };
  title: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface MovieData {
  title: string;
  year: number;
  duration: string;
  rating: string;
  genre: string[];
  director: string;
  cast: string[];
  plot: string;
  imdbRating: number;
  rottenTomatoes: number;
}

const movieData: MovieData = {
  title: "Inception",
  year: 2010,
  duration: "2h 28m",
  rating: "PG-13",
  genre: ["Action", "Sci-Fi", "Thriller"],
  director: "Christopher Nolan",
  cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Ellen Page"],
  plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
  imdbRating: 8.8,
  rottenTomatoes: 87,
};

const comments: Comment[] = [
  {
    id: "1",
    user: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
      handle: "@johndoe",
    },
    title: "Mind-bending masterpiece!",
    content:
      "This movie completely blew my mind. The concept of dreams within dreams is executed so brilliantly. Christopher Nolan has outdone himself with this one. The cinematography is stunning, the acting is top-notch, and the plot keeps you guessing until the very end. I've watched it multiple times and still discover new details each time. The way they handle the different levels of reality is just incredible. Hans Zimmer's score perfectly complements the intense atmosphere throughout the film.",
    timestamp: "2 hours ago",
    likes: 42,
  },
  {
    id: "2",
    user: {
      name: "Sarah Wilson",
      avatar: "/avatars/sarah.jpg",
      handle: "@sarahw",
    },
    title: "Complex but rewarding",
    content:
      "Initially found it confusing but after a second viewing, I appreciate the intricate storytelling. The visual effects are groundbreaking and the performances are solid across the board. Leonardo DiCaprio delivers another powerful performance, and the supporting cast really brings depth to their characters. The film's exploration of guilt, memory, and reality is profound. While it requires attention and perhaps multiple viewings to fully grasp, it's incredibly rewarding for those willing to invest the mental energy.",
    timestamp: "5 hours ago",
    likes: 28,
  },
  {
    id: "3",
    user: {
      name: "Mike Chen",
      avatar: "/avatars/mike.jpg",
      handle: "@mikechen",
    },
    title: "Technical marvel with emotional depth",
    content:
      "What sets Inception apart from other sci-fi films is how it balances technical complexity with genuine emotional stakes. The relationship between Cobb and Mal provides the emotional core that grounds all the high-concept elements. The practical effects combined with CGI create some of the most memorable sequences in cinema. The rotating hallway fight scene alone is worth the price of admission. Nolan's attention to detail in creating the rules of the dream world and sticking to them throughout is commendable.",
    timestamp: "1 day ago",
    likes: 35,
  },
];

export default function MovieWatchPage() {
  const [showMoreInfo, setShowMoreInfo] = React.useState(false);
  const [expandedComments, setExpandedComments] = React.useState<Set<string>>(
    new Set()
  );

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
    <div className="min-h-screen bg-background">
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
                  <h1 className="text-2xl font-bold">{movieData.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <span>{movieData.year}</span>
                    <span>•</span>
                    <span>{movieData.duration}</span>
                    <span>•</span>
                    <Badge variant="secondary">{movieData.rating}</Badge>
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

              {/* Movie Info Collapsible */}
              <Collapsible open={showMoreInfo} onOpenChange={setShowMoreInfo}>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {movieData.plot}
                  </p>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto font-normal"
                    >
                      <span className="text-sm">
                        {showMoreInfo ? "Show less" : "Show more"}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 ml-1 transition-transform ${showMoreInfo ? "rotate-180" : ""}`}
                      />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Director:</span>{" "}
                        {movieData.director}
                      </div>
                      <div>
                        <span className="font-medium">Genre:</span>{" "}
                        {movieData.genre.join(", ")}
                      </div>
                      <div>
                        <span className="font-medium">Cast:</span>{" "}
                        {movieData.cast.join(", ")}
                      </div>
                      <div>
                        <span className="font-medium">IMDb:</span>{" "}
                        {movieData.imdbRating}/10
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </div>

            <Separator />

            {/* Comments Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {comments.length} Comments
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
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.user.avatar} />
                      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{comment.user.name}</span>
                        <span className="text-muted-foreground">
                          {comment.user.handle}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                          {comment.timestamp}
                        </span>
                      </div>
                      <h4 className="font-medium">{comment.title}</h4>
                      <div className="text-sm">
                        <p
                          className={
                            expandedComments.has(comment.id)
                              ? ""
                              : "line-clamp-3"
                          }
                        >
                          {comment.content}
                        </p>
                        {comment.content.length > 200 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 h-auto mt-1 font-normal text-xs"
                            onClick={() => toggleCommentExpansion(comment.id)}
                          >
                            {expandedComments.has(comment.id)
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
                          {comment.likes}
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
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Year:</span>
                    <span>{movieData.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{movieData.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <span>{movieData.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IMDb:</span>
                    <span>{movieData.imdbRating}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RT Score:</span>
                    <span>{movieData.rottenTomatoes}%</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Genres</h4>
                  <div className="flex flex-wrap gap-1">
                    {movieData.genre.map((g) => (
                      <Badge key={g} variant="secondary" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Movie Title and Actions */}
          <div className="space-y-4">
            <div>
              <h1 className="text-xl font-bold">{movieData.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground mt-1 text-sm">
                <span>{movieData.year}</span>
                <span>•</span>
                <span>{movieData.duration}</span>
                <span>•</span>
                <Badge variant="secondary" className="text-xs">
                  {movieData.rating}
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

              {/* Sheet for Additional Movie Info on Mobile */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Info className="h-4 w-4 mr-1" />
                    More Info
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>Movie Details</SheetTitle>
                    <SheetDescription>
                      Additional information about {movieData.title}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Director:</span>
                        <span>{movieData.director}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Year:</span>
                        <span>{movieData.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>{movieData.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rating:</span>
                        <span>{movieData.rating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">IMDb:</span>
                        <span>{movieData.imdbRating}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">RT Score:</span>
                        <span>{movieData.rottenTomatoes}%</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-medium">Cast</h4>
                      <p className="text-sm text-muted-foreground">
                        {movieData.cast.join(", ")}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Genres</h4>
                      <div className="flex flex-wrap gap-1">
                        {movieData.genre.map((g) => (
                          <Badge
                            key={g}
                            variant="secondary"
                            className="text-xs"
                          >
                            {g}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Plot</h4>
                      <p className="text-sm text-muted-foreground">
                        {movieData.plot}
                      </p>
                    </div>
                  </div>
                  <SheetFooter className="mt-6">
                    <SheetClose asChild>
                      <Button variant="outline">Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>

            {/* Mobile Movie Info Collapsible */}
            <Collapsible open={showMoreInfo} onOpenChange={setShowMoreInfo}>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {movieData.plot}
                </p>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto font-normal"
                  >
                    <span className="text-sm">
                      {showMoreInfo ? "Show less" : "Show more"}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 ml-1 transition-transform ${showMoreInfo ? "rotate-180" : ""}`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Director:</span>{" "}
                      {movieData.director}
                    </div>
                    <div>
                      <span className="font-medium">Genre:</span>{" "}
                      {movieData.genre.join(", ")}
                    </div>
                    <div>
                      <span className="font-medium">Cast:</span>{" "}
                      {movieData.cast.join(", ")}
                    </div>
                    <div>
                      <span className="font-medium">IMDb:</span>{" "}
                      {movieData.imdbRating}/10
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </div>

          <Separator />

          {/* Mobile Comments Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              {comments.length} Comments
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
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.user.avatar} />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col gap-1 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.user.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {comment.timestamp}
                        </span>
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {comment.user.handle}
                      </span>
                    </div>
                    <h4 className="font-medium text-sm">{comment.title}</h4>
                    <div className="text-sm">
                      <p
                        className={
                          expandedComments.has(comment.id) ? "" : "line-clamp-3"
                        }
                      >
                        {comment.content}
                      </p>
                      {comment.content.length > 200 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto mt-1 font-normal text-xs"
                          onClick={() => toggleCommentExpansion(comment.id)}
                        >
                          {expandedComments.has(comment.id)
                            ? "Show less"
                            : "Read more"}
                        </Button>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {comment.likes}
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
