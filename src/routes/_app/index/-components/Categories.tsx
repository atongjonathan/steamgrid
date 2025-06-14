import { Link, useLocation } from '@tanstack/react-router'
import { genres } from '../../explore'

const Categories = () => {
    const { pathname } = useLocation()
    return pathname !== "/explore" && (
        <div
            className="w-full flex items-center gap-3 overflow-x-scroll scrollbar-hide py-2 px-1 hide-scrollbar-lg"
        >
            {
                genres.map((genre) => (
                    <Link key={genre}
                        to="/explore" search={{ genre }}
                        className={`${'bg-dry'
                            } whitespace-nowrap p-3 cursor-pointer rounded-2xl border border-gray-800 text-xs text-white`}
                    >
                        {genre}
                    </Link>
                ))
            }

        </div>
    )
}

export default Categories
