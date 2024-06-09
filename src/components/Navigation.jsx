'use client'
import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useTheme } from '../utilities/ThemeProvider';

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
    return (
        <header className='flex items-center justify-between max-w-[1280px] mx-auto bg-white px-5'>
            <div>
                <p className='font-semibold'>RenewImaan</p>
            </div>
            <Menu mode="horizontal" style={{ border: "none" }}>
                {
                    menu.map((item, idx) => (
                        <Menu.Item key={idx}>
                            <Link to={item.link}>{item.title}</Link>
                        </Menu.Item>
                    ))
                }
            </Menu>
            {/* <div>
                {
                    theme === 'dark' ? <MoonOutlined onClick={toggleTheme} /> : <SunOutlined onClick={toggleTheme} />
                }
            </div> */}
        </header>
    )
}

export default Navigation