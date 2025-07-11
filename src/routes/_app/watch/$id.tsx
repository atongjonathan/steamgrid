import { createFileRoute } from "@tanstack/react-router";
import MovieWatchPage from "./-components/devin";
import { getMovie } from "@/api";
import { queryOptions } from "@tanstack/react-query";
import { PendingComponent } from "../route";

export const Route = createFileRoute("/_app/watch/$id")({
  component: RouteComponent,
  pendingComponent: PendingComponent,
  loader: async ({ params, context }) => {
    const movieQueryOptions = queryOptions({
      queryKey: ["movie", params.id],
      queryFn: () => getMovie(params.id),
    });

    try {
      const data = await context.queryClient.ensureQueryData(movieQueryOptions);
      return data;
    } catch (error) {
      throw new Error("Failed to load video data."); // You can throw more detailed error objects too
    }
  },
});

function RouteComponent() {
  return <MovieWatchPage />;
}
