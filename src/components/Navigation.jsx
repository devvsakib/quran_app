'use client'
import { Menu, Layout, Button } from 'antd';
import { Link } from 'react-router-dom';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useTheme } from '../utilities/ThemeProvider';
import { useEffect, useState } from 'react';

const { Header } = Layout;

const Navigation = () => {
    // const { theme, toggleTheme } = useTheme();
    const menu = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Fatwa',
            link: '/fatwa'
        },
        {
            title: 'Quran',
            link: '/quran'
        },
        {
            title: 'Hadith',
            link: '/hadith'
        },
        {
            title: 'Biography',
            link: '/biography'
        }
    ]

    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowSize(window.innerWidth);
        })
    }, [window.innerWidth])

    useEffect(() => {
        if (windowSize > 768) {
            setShowMenu(false);
        }
    }, [windowSize])


    return (
        <header className='flex items-center justify-between max-w-[1280px] mx-auto bg-white px-5 realtive'>
            <div>
                <p className='font-semibold'>RenewImaan</p>
            </div>
            <Menu mode={windowSize > 768 ? 'horizontal' : 'inline'}
                style={{ border: "none" }}
                className={`text-sm ${windowSize <= 768 && showMenu ? 'block absolute top-8 right-0 z-40  border-4 border-red-400' : windowSize <= 768 ? 'hidden' : ''}`}
            >
                {
                    menu.map((item, idx) => (
                        <Menu.Item key={idx}>
                            <Link to={item.link}>{item.title}</Link>
                        </Menu.Item>
                    ))
                }
            </Menu>
            <div>
                {
                    windowSize <= 768 && <Button type='primary' onClick={() => setShowMenu(!showMenu)}>Menu</Button>
                }
                {/* {
                    theme === 'dark' ? <MoonOutlined onClick={toggleTheme} /> : <SunOutlined onClick={toggleTheme} />
                } */}
            </div>
        </header>
    )
}

export default Navigation