
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getMovies } from '@/api'
import { Search, Star } from 'lucide-react'
import { isMobile } from 'react-device-detect';
import { useLocation, useNavigate, useSearch } from '@tanstack/react-router'
import Skeleton from 'react-loading-skeleton'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export default function InputSearch() {
    const [isFocused, setIsFocused] = useState(false)
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const search = useSearch({ strict: false }) // or define a search schema in route
    const queryFromURL = (search as Record<string, string>).q || ""
    const [query, setQuery] = useState(queryFromURL)


    useEffect(() => {
        if (queryFromURL !== query) {
            setQuery(queryFromURL)
        }
    }, [queryFromURL])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query !== queryFromURL) {
                navigate({
                    search: (prev) => ({
                        ...prev,
                        q: query || undefined, // undefined removes the param
                    }) as never,
                    replace: true, // avoid pushing history every keystroke
                })
            }
        }, 200)

        return () => clearTimeout(timeout)
    }, [query])


    return (
        <div className="relative lg:w-[400px] w-full">
            <div className="w-full flex items-center p-2">
                <Input
                    startIcon={Search}
                    placeholder="Search movie or concept"
                    value={query}
                    onChange={(e) => {
                        console.log(e.target.value);
                        setQuery(e.target.value);
                    }}
                    onFocus={() => {
                        // Redirect on mobile
                        if (window.innerWidth <= 768 || isMobile) {
                            navigate({ to: "/search" })
                        }
                        else
                            setIsFocused(true);
                    }}
                    autoFocus={pathname.includes("/search") ? true : undefined}
                    onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                />
            </div>

            {isFocused && (
                <Card className="absolute left-0 right-0 z-10 mt-2 rounded-xl shadow-md bg-background border text-white">
                    <SearchCardContents />
                </Card>
            )}
        </div>

    )
}

export function SearchCardContents() {
    const search = (useSearch({ strict: false }) as Record<string, string>).q || ""
    const { isLoading, data } = useQuery({
        queryKey: ["search", search],
        queryFn: () => {
            return getMovies({ params: { limit: 7, search } })
        },
        staleTime: Infinity,
    })

    return (
        <CardContent className="p-0">
            {
                isLoading ? (
                    <div
                        className={cn(
                            'flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors'
                        )}
                    >
                        <Skeleton width={100}  baseColor='rgb(22 28 63)'
                            className="w-16 h-10 object-cover rounded-md"
                        />
                        <div className="text-sm font-medium text-foreground">
                            <p><Skeleton width={100}  baseColor='rgb(22 28 63)'/></p>
                            <div className='flex gap-2 items-center'>
                                <Skeleton width={30}  baseColor='rgb(22 28 63)'/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {

                            data?.count ?? 0 > 0 ? <>
                                {
                                    data?.results.map((result) => (
                                        <div
                                            key={result.id}
                                            className={cn(
                                                'flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors'
                                            )}
                                        >
                                            <LazyLoadImage
                                                src={result.poster}
                                                alt={result.title}
                                                className="w-16 h-10 object-cover rounded-md"
                                                placeholder={(
                                                    <div><Skeleton baseColor='rgb(22 28 63)' width={60} height={30}/></div>
                                                )}
                                            />
                                            <div className="text-sm font-medium text-foreground">
                                                {result.title} ({result.year})
                                                <div className='flex gap-2 items-center'>
                                                    <Star color='rgb(255 176 0)' fill='rgb(255 176 0)' size={12} />
                                                    {
                                                        result.rating_star
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    )
                                    )

                                }
                            </> : (
                                <div
                                    className={cn(
                                        'flex justify-between gap-4 px-4 py-3 transition-colors text-sm font-medium text-foreground'
                                    )}
                                >
                                    <p>No movie found</p>
                                    <a href="https://t.me/dont_be_soy2" rel='noopener' target='_blank' className='underline'>
                                        Request</a>
                                </div>
                            )
                        }
                    </>
                )

            }
        </CardContent>
    )
}
