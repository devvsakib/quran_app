import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const [cookie, setCookie] = useCookies(['access_token']);
    const navigate = useNavigate();
    const [lightTheme, setLightTheme] = useState(true)
    // const logOut = () => {
    //     setCookie("access_token", "")
    //     window.localStorage.removeItem("userId")
    //     window.localStorage.removeItem("username")
    //     toast.success("Logout Success")
    //     navigate("/")
    // }
    const menu = ["test","hadith"]
    const changeTheme = () => {
        document.querySelector("html").getAttribute("data-theme") === "dark" ? document.querySelector("html").setAttribute("data-theme", "cmyk") : document.querySelector("html").setAttribute("data-theme", "dark");
        setLightTheme(!lightTheme)
    }
    return (
        <header className='flex shadow rounded-b-md navbar items-center gap-5 py-4 bg-white/10 px-5 bg-white'>
            <div>
                <Link to={'/'}>
                    <h2 className='font-bold text-3xl font-[raleway]'>QuranDaily</h2>
                </Link>
            </div>
            <nav>
                <ul className='flex gap-5'>

                    {
                        menu.map((item, index) => (
                            <li key={index}><Link to={item} className="hover:text-orange-400 transition-colors duration-200 ease-linear capitalize text-lg">{item}</Link></li>
                        )
                        )}
                    {
                        !cookie.access_token ?
                            <li><Link to={'/login'} className="hover:text-orange-400 transition-colors duration-200 ease-linear text-lg">Login</Link></li>
                            :
                            <>
                                <li><Link to={'/auth'} className="hover:text-orange-400 transition-colors duration-200 ease-linear text-lg"
                                // onClick={logOut}
                                >Logout</Link></li>
                            </>
                    }
                </ul>
            </nav>
            <div>
                <button type='text' className="btn gap-2" onClick={changeTheme}>
                    {
                        !lightTheme ? "Light" : "Dark"
                    }

                </button>
            </div>
        </header>
    )
}

export default Header