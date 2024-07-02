"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signIn, useSession, signOut } from 'next-auth/react'

export const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [dropdown, setDropdown] = useState(false)

    const path = usePathname()

    const { data: session } = useSession()
    console.log(session)

    return (
        <nav className="bg-white border-gray-200">

            {session?.user ? (
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-3 px-4">
                    <Link href={'/'}>
                        <h1 className='text-3xl'>NavBar</h1>
                    </Link>
                    <div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
                        <div>
                            <div onClick={() => setDropdown(!dropdown)}
                                className='cursor-pointer hidden md:flex md:flex-col md:items-center md:justify-center md:space-y-0'>
                                <img
                                    src={session?.user.image as any}
                                    alt={session?.user.name as any}
                                    className='w-10 h-10 rounded-full border-2 border-teal-600'
                                />
                                <p className='font-medium text-sm text-center'>{session?.user.name}</p>
                            </div>
                            <div className={`z-10 fixed ${dropdown == true ? '': 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                                <ul className="py-2 text-sm text-gray-700">
                                    <li>
                                        <a onClick={() => {
                                                signOut({
                                                    callbackUrl: "/",
                                                })
                                            }} 
                                            className="cursor-pointer block px-4 py-2 hover:bg-gray-100">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className={`${isMenuOpen == false ? 'hidden' : ''} w-full md:block md:w-auto`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                            <li>
                                <Link href={'/'} className={`block py-2 px-3 rounded md:bg-transparent ${path == '/' ? 'text-white bg-blue-700 md:text-blue-700' : 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700'} md:p-0`}>Home</Link>
                            </li>
                            <li>
                                <Link href={'/dashboard'} className={`block py-2 px-3 rounded md:bg-transparent ${path == '/dashboard' ? 'text-white bg-blue-700 md:text-blue-700' : 'text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700'} md:p-0`}>Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link href={'/'}>
                        <h1 className='text-3xl'>NavBar</h1>
                    </Link>
                    <div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
                        <button
                            onClick={() => signIn()}
                            className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 shadow-lg shadow-teal-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
                            Sing In
                        </button>
                    </div>

                </div>
            )}

        </nav>

    )
}
