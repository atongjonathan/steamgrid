import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FaFilm, FaListAlt } from 'react-icons/fa'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { EllipsisVerticalIcon } from 'lucide-react'
import { useAuth } from '@/components/context/AuthContext'

export default function MoreNavItem() {
    // const { user } = useContext(AuthContext)
    const { user } = useAuth()

    const baseClasses =
        'border py-2 px-1 rounded-lg transitions flex gap-2 items-center [&.active]:text-subMain hover:[&.active]:bg-main'
    const linkClass = clsx('bg-main border-subMain hover:bg-subMain', baseClasses)

    const common = [
        {
            name: 'About',
            link: '/about',
            icon: FaListAlt,
        },
        {
            name: 'Contact',
            link: '/contact',
            icon: FaFilm,
        },
    ]

    const adminLinks = [
        {
            name: 'Add',
            link: '/add',
            icon: FaFilm,
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={linkClass}>
                <EllipsisVerticalIcon className="size-4 fill-white/60" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40 bg-main border border-subMain text-white rounded-xl shadow-md p-1 z-50">
                {user?.is_superuser &&
                    adminLinks.map((link, idx) => (
                        <DropdownMenuItem
                            key={idx}
                            className="cursor-pointer hover:bg-subMain focus:hover:bg-subMain px-3 py-1.5 rounded-lg"
                            asChild
                        >
                            <Link to={link.link} className="flex items-center gap-2">
                                <link.icon />
                                {link.name}
                            </Link>
                        </DropdownMenuItem>
                    ))}

                {common.map((link, idx) => (
                    <DropdownMenuItem
                        key={idx}
                        className="cursor-pointer hover:bg-subMain focus:hover:bg-subMain px-3 py-1.5 rounded-lg"
                        asChild
                    >
                        <Link to={link.link} className={clsx(baseClasses, "border-none")}>
                            <link.icon />
                            {link.name}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
