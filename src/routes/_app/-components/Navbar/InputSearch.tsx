
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getMovies } from '@/api'
import { Search, Star } from 'lucide-react'
import { isMobile } from 'react-device-detect';
import { useNavigate } from '@tanstack/react-router'
import Skeleton from 'react-loading-skeleton'

const mockResults = [
    {
        id: 1,
        title: 'React Crash Course',
        thumbnail: 'https://img.youtube.com/vi/w7ejDZ8SWv8/mqdefault.jpg',
    },
    {
        id: 2,
        title: 'ShadCN UI Tutorial',
        thumbnail: 'https://img.youtube.com/vi/4nC4VXHdyXY/mqdefault.jpg',
    },
    {
        id: 3,
        title: 'Understanding Tailwind CSS',
        thumbnail: 'https://img.youtube.com/vi/dFgzHOX84xQ/mqdefault.jpg',
    },
    {
        id: 4,
        title: 'YouTube Clone with React',
        thumbnail: 'https://img.youtube.com/vi/NT299zIk2JY/mqdefault.jpg',
    },
    {
        id: 5,
        title: 'Advanced TypeScript Tips',
        thumbnail: 'https://img.youtube.com/vi/d56mG7DezGs/mqdefault.jpg',
    },
]

export default function InputSearch() {
    const [query, setQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const navigate = useNavigate()


    const filteredResults = query
        ? mockResults.filter((r) =>
            r.title.toLowerCase().includes(query.toLowerCase())
        )
        : mockResults

    return (
        <div className="relative lg:w-[400px] w-full">
            <div className="w-full flex items-center">
                <Input
                    startIcon={Search}
                    placeholder="Search"
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
                    autoFocus={window.innerWidth <= 768 || isMobile ? true : undefined}
                    onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                />
            </div>

            {isFocused && filteredResults.length > 0 && (
                <Card className="absolute left-0 right-0 z-10 mt-2 rounded-xl shadow-md bg-background border text-white">
                    <SearchCardContents />
                </Card>
            )}
        </div>

    )
}

export function SearchCardContents() {
    const { isLoading, data } = useQuery({
        queryKey: ["sliderQuery",],
        queryFn: () => {
            return getMovies({ params: { limit: 7 } })
        },
        staleTime: Infinity,
    })
    return (
        <CardContent className="p-0">
            {
                isLoading ? <Skeleton baseColor='#080a1a' className='px-4 py-3 lg:animate-pulse' /> :
                    data?.results.map((result) => (
                        <div
                            key={result.id}
                            className={cn(
                                'flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors'
                            )}
                        >
                            <img
                                src={result.poster}
                                alt={result.title}
                                className="w-16 h-10 object-cover rounded-md"
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
                    ))}
        </CardContent>
    )
}
