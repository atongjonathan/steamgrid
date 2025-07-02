import { createFileRoute } from "@tanstack/react-router";
import MovieWatchPage from "./-components/devin";
import { getMovie } from "@/api";

export const Route = createFileRoute("/_app/watch/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      const data = await getMovie(params.id);
      return data;
    } catch (error) {
      throw new Error("Failed to load video data."); // You can throw more detailed error objects too
    }
  },
});

function RouteComponent() {
  return <MovieWatchPage />;
}
