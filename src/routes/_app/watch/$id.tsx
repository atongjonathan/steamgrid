import { createFileRoute } from "@tanstack/react-router";
import MovieWatchPage from "./-components/devin";

export const Route = createFileRoute("/_app/watch/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MovieWatchPage />;
}
