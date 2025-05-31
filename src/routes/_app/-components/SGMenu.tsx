import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaFilm, FaListAlt, FaAngleDown } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'

export default function SgMenu() {
    // const { user } = useContext(AuthContext)
    const user = null

    const { pathname } = useLocation()

    let [active, setActive] = useState('Menu')


    const common = [
        {
            name: 'About',
            link: '/about-us',
            icon: FaListAlt,

        },
        {
            name: 'Contact',
            link: '/contact-us',
            icon: FaFilm,

        },
    ]


    const adminLinks = [

        {
            name: 'Add',
            link: '/addmovie',
            icon: FaFilm,

        },

    ]




    return (
        <div className="text-right">
            <Link to='/' className='[&.active]:text-subMain'>
            <Menu>
                <MenuButton className={`inline-flex items-center gap-2 text-sm/6 font-semibold text-white shadow-inner data-[hover]:text-subMain transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0`}>
                    <span >{active ? active : 'Menu'}</span>

                    <FaAngleDown className="size-4 fill-white/60" />
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom"
                    className="w-36 z-50 origin-top-right rounded-xl border border-white/5 bg-main p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    {
                        user?.is_superuser && adminLinks.map((link, idx) => (
                            <MenuItem key={idx} >
                                <Link
                                    to={link.link}
                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                >
                                    <link.icon className="text-lg size-4" />
                                    {link.name}
                                </Link>
                            </MenuItem>
                        ))
                    }


                    {
                         common.map((link, idx) => (
                            <MenuItem key={idx} >
                                <Link 
                                    to={link.link}
                                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                                >
                                    <link.icon className="text-lg size-4" />
                                    {link.name}
                                </Link>
                            </MenuItem>
                        ))
                    }

                </MenuItems>
            </Menu>
            </Link>
            
        </div>
    )
}