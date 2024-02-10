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
    const changeTheme = () => {
        document.querySelector("html").getAttribute("data-theme") === "night" ? document.querySelector("html").setAttribute("data-theme", "cmyk") : document.querySelector("html").setAttribute("data-theme", "night");
        setLightTheme(!lightTheme)
    }
    return (
        <header className='flex shadow-xl rounded-b-md navbar items-center gap-5 py-4 bg-white/10 px-5'>
            <div>
                <Link to={'/'}>
                    <h2 className='font-bold text-3xl font-[raleway]'>QuranDaily</h2>
                </Link>
            </div>
            <nav>
                <ul className='flex gap-5'>

                    <li><Link to={'/quran'} className="hover:text-orange-400 transition-colors duration-200 ease-linear text-lg">Quran</Link></li>
                    {
                        !cookie.access_token ?
                            <li><Link to={'/auth'} className="hover:text-orange-400 transition-colors duration-200 ease-linear text-lg">Login</Link></li>
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