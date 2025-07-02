import { getMovies } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import Movie from "./-components/Movie";
import Skeleton from "react-loading-skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RefreshCw, Search } from "lucide-react";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import EmptyState from "./-components/EmptyState";

export const Route = createFileRoute("/_app/explore")({
  component: RouteComponent,
});

type Params = Record<string, string | number | null>;
export const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Thriller",
  "War",
  "Western",
  "Short",
];
function RouteComponent() {
  const searchParams = useSearch({ strict: false }) as Record<string, string>;
  const navigate = Route.useNavigate();

  const [display, setDisplay] = useState(searchParams.filters ? true : false);
  const [search, setSearch] = useState(searchParams.search);

  const pageIndex = parseInt(searchParams.page || "1", 10) - 1;
  const pageSize = parseInt(searchParams.pageSize || "16", 10);

  const startYear = 2000;
  const endYear = new Date().getFullYear();
  const country_list = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "United States",
    "Canada",
    "India",
    "United Kingdom",
    "Nigeria",
    "France",
    "Germany",
    "China",
    "Japan",
    "South Korea",
    "Australia",
    "Brazil",
    "South Africa",
    "Mexico",
    "Italy",
    "Spain",
    "Russia",
    "Turkey",
    "Egypt",
    "Argentina",
    "Indonesia",
    "Vietnam",
    "Thailand",
    "Kenya",
    "Ghana",
    "Pakistan",
    "Bangladesh",
    "Philippines",
    "Others",
  ];
  const years = Array(endYear - startYear + 1)
    .fill(0)
    .map((_, i) => (startYear + i).toString())
    .reverse();
  const filters = [
    {
      label: "Genre",
      key: "genre",
      value: searchParams.genre || "Any",
      items: ["Any", ...genres],
    },
    {
      label: "Year",
      key: "year",
      value: searchParams.year || "Any",
      items: ["Any", ...years],
    },
    {
      label: "Sort",
      key: "sort",
      value: searchParams.sort || "Highest Rated",
      items: sortOptions.map((o) => o.label),
    },
    {
      label: "Country",
      key: "country",
      value: searchParams.country || "Any",
      items: ["Any", ...country_list],
    },
  ];

  const updateParam = (key: string, value: string) => {
    const newParams: Record<string, string> = { ...searchParams };
    if (value === "Any" || !value) {
      delete newParams[key];
    } else {
      newParams[key] = value;
    }
    if (key !== "page") newParams.page = "1";
    navigate({ search: () => newParams });
  };

  const clearFilters = () => {
    navigate({ search: () => {} });
    setSearch("");
  };

  const buildParamsFromSearch = (sp: Record<string, string>): Params => ({
    limit: pageSize,
    offset: (parseInt(sp.page || "1", 10) - 1) * pageSize,
    genre: sp.genre && sp.genre !== "Any" ? sp.genre : null,
    year: sp.year && sp.year !== "Any" ? sp.year : null,
    releaseLocation: sp.country && sp.country !== "Any" ? sp.country : null,
    ordering:
      sortOptions.find((o) => o.label === (sp.sort || "Highest Rated"))
        ?.value || "-rating_star",
    title: sp.title || null,
    search: sp.search || null,
  });

  const params = buildParamsFromSearch(searchParams);

  const { data, isFetching } = useQuery({
    queryKey: ["movies", params],
    queryFn: () => getMovies({ params }),
    staleTime: Infinity,
  });

  const totalPages = Math.ceil((data?.count || 0) / pageSize);
  const canPrev = pageIndex > 0;
  const canNext = pageIndex + 1 < totalPages;

  return (
    <div className="px-4 mt-20">
      <div className="w-full flex justify-between bg-dry">
        <h2 className="ml-3 text-sm font-semibold invisible">Explore Movies</h2>

        <div className="flex items-center gap-2 px-2">
          <Button
            onClick={() =>
              setDisplay((v) => {
                updateParam("filters", `${!v}`);
                return !v;
              })
            }
            className="w-7 h-7 p-0 text-white bg-subMain flex-colo"
          >
            <FiFilter className="w-4 h-4" />
          </Button>

          <Button
            onClick={clearFilters}
            className="w-7 h-7 p-0 text-white bg-subMain flex-colo"
            title="Clear Filters"
            disabled={Object.keys(searchParams).length === 0}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>

          <p className="text-xs">Page {pageIndex + 1}</p>

          <Button
            onClick={() => updateParam("page", pageIndex.toString())}
            disabled={!canPrev}
            className={cn(
              "w-7 h-7 p-0 text-white flex-colo",
              canPrev ? "bg-subMain" : "bg-dry"
            )}
          >
            <ArrowLeft />
          </Button>

          <Button
            onClick={() => updateParam("page", String(pageIndex + 2))}
            disabled={!canNext}
            className={cn(
              "w-7 h-7 p-0 text-white flex-colo",
              canNext ? "bg-subMain" : "bg-dry"
            )}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      {/** Filter Panel */}
      <div
        className={cn(
          "grid gap-3 items-end w-full transition-all duration-300 ease-linear overflow-hidden pt-2",
          display
            ? "opacity-100 max-h-[500px] visible"
            : "opacity-0 max-h-0 invisible"
        )}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-8 rounded border-border text-muted-foreground px-3">
          {filters.map((f, i) => (
            <div key={i} className="flex flex-col gap-1">
              <Label className="uppercase text-xs">{f.label}</Label>
              <Select
                value={f.value}
                onValueChange={(v) => updateParam(f.key, v)}
              >
                <SelectTrigger className="w-full text-xs bg-background border-border">
                  <SelectValue placeholder={f.label} />
                </SelectTrigger>
                <SelectContent>
                  {f.items.map((item) => (
                    <SelectItem
                      key={item}
                      value={item?.toString()}
                      className="text-xs"
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <div className="mx-3">
          <Input
            placeholder="Find in page ..."
            startIcon={Search}
            className="grid-cols-4"
            value={search}
            onInput={(e) => {
              const { value } = e.target as HTMLInputElement;
              setSearch(value);
              updateParam("search", value);
            }}
          />
        </div>
      </div>

      {/** Movies Grid */}
      <div className="grid mt-3 grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap- overflow-hidden">
        {isFetching
          ? Array(pageSize)
              .fill(null)
              .map((_, i) => (
                <Skeleton
                  key={i}
                  baseColor="rgb(11 15 41)"
                  className="rounded-lg aspect-[216/319]"
                />
              ))
          : data?.results.map((movie, idx) => (
              <Movie key={idx} movie={movie} />
            ))}
      </div>
      {data?.count === 0 && <EmptyState />}
    </div>
  );
}

const sortOptions = [
  { label: "Latest Release", value: "-releaseDate" },
  { label: "Old Release", value: "releaseDate" },
  { label: "Highest Rated", value: "-rating_star" },
  { label: "Lowest Rated", value: "rating_star" },
  { label: "Title Asc", value: "title" },
  { label: "Title Desc", value: "-title" },
];
