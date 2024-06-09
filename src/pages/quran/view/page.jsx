import { AppstoreOutlined, BookOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../../../layouts/Layout';
import images from '../../../configs/Images';
const Surah = ({ params }) => {
    const { surahnumber } = useParams();
    const navigate = useNavigate();
    const [verses, setVerses] = useState([])
    const [loading, setLoading] = useState(true)
    const [versesBn, setVersesBn] = useState([])
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => setCollapsed(!collapsed);
    const [allChapter, setChapter] = useState([]);
    const [surah, setSurah] = useState([]);
    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.quran.com/api/v4/chapters?language=bangla',
            headers: {
                'Accept': 'application/json'
            }
        };

        axios(config)
            .then((response) => {
                setSurah(response.data.chapters[surahnumber - 1])
                setChapter(response.data.chapters);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [surahnumber])
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }
    const items = [
        getItem('All Surah', 'sub1', <BookOutlined />, allChapter?.map((el, i) => {
            return getItem(<Link href={`/quran/${el.id}`}>{el.name_simple}</Link>, el.id, <img style={{ width: 10 }} src={images[el.revelation_place]} />)
        }), 'subMenu'),
    ];

    const surahAyah = [
        "1:1, 1:7", "2:1, 2:286", "3:1, 3:200", "4:1, 4:176", "5:1, 5:120", "6:1, 6:165", "7:1, 7:206", "8:1, 8:75", "9:1, 9:129", "10:1, 10:109", "11:1, 11:123", "12:1, 12:111", "13:1, 13:43", "14:1, 14:52", "15:1, 15:99", "16:1, 16:128", "17:1, 17:111", "18:1, 18:110", "19:1, 19:59", "20:1, 20:130", "21:1, 21:112", "22:1, 22:78", "23:1, 23:118", "24:1, 24:64", "25:1, 25:77", "26:1, 26:227", "27:1, 27:93", "28:1, 28:88", "29:1, 29:69", "30:1, 30:60", "31:1, 31:34", "32:1, 32:30", "33:1, 33:73", "34:1, 34:54", "35:1, 35:45", "36:1, 36:83", "37:1, 37:182", "38:1, 38:88", "39:1, 39:75", "40:1, 40:85", "41:1, 41:54", "42:1, 42:53", "43:1, 43:89", "44:1, 44:59", "45:1, 45:37", "46:1, 46:35", "47:1, 47:38", "48:1, 48:29", "49:1, 49:18", "50:1, 50:45", "51:1, 51:60", "52:1, 52:49", "53:1, 53:62", "54:1, 54:55", "55:1, 55:78", "56:1, 56:96", "57:1, 57:29", "58:1, 58:22", "59:1, 59:24", "60:1, 60:13", "61:1, 61:14", "62:1, 62:11", "63:1, 63:11", "64:1, 64:18", "65:1, 65:12", "66:1, 66:12", "67:1, 67:30", "68:1, 68:52", "69:1, 69:52", "70:1, 70:44", "71:1, 71:28", "72:1, 72:28", "73:1, 73:20", "74:1, 74:56", "75:1, 75:40", "76:1, 76:31", "77:1, 77:50", "78:1, 78:40", "79:1, 79:46", "80:1, 80:42", "81:1, 81:29", "82:1, 82:19", "83:1, 83:36", "84:1, 84:25", "85:1, 85:22", "86:1, 86:17", "87:1, 87:19", "88:1, 88:26", "89:1, 89:30", "90:1, 90:20", "91:1, 91:15", "92:1, 92:21", "93:1, 93:11", "94:1, 94:8", "95:1, 95:8", "96:1, 96:19", "97:1, 97:5", "98:1, 98:8", "99:1, 99:8", "100:1, 100:11", "101:1, 101:11", "102:1, 102:8", "103:1, 103:3", "104:1, 104:9", "105:1, 105:5", "106:1, 106:4", "107:1, 107:7", "108:1, 108:3", "109:1, 109:6", "110:1, 110:3", "111:1, 111:5", "112:1, 112:4", "113:1, 113:5", "114:1, 114:6"
    ]
    const surahNameByNumber = [
        "Al-Fatiha", "Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Maidah", "Al-Anam", "Al-Araf", "Al-Anfal", "At-Tawbah", "Yunus", "Hud", "Yusuf", "Ar-Rad", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha", "Al-Anbiya", "Al-Hajj", "Al-Muminun", "An-Nur", "Al-Furqan", "Ash-Shuara", "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajda", "Al-Ahzab", "Saba", "Fatir", "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir", "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqia", "Al-Hadid", "Al-Mujadila", "Al-Hashr", "Al-Mumtahina", "As-Saff", "Al-Jumua", "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haaqqa", "Al-Maarij", "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddathir", "Al-Qiyama", "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "Abasa", "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-A'la", "Al-Ghashiya", "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Lail", "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-Alaq", "Al-Qadr", "Al-Bayyina", "Az-Zalzala", "Al-Adiyat", "Al-Qaria", "At-Takathur", "Al-Asr", "Al-Humazah", "Al-Fil", "Quraish", "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr", "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
    ]

    useEffect(() => {
        if ((surahAyah.length >= parseInt(surahnumber) && parseInt(surahnumber) > 0 && parseInt(surahnumber) <= 114)) {
            setLoading(true)
            fetch(`https://api.quranwbw.com/v1/verses?verses=${JSON.stringify(surahAyah[surahnumber - 1]).split("\"").join("").replace(/\s/g, '')}&verse_translation=1&between=true`).then(res => res.json()).then(data => {
                setLoading(false)
                setVerses(data.data.verses)
            })
            fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan/${surahnumber}.min.json`).then(res => res.json()).then(data => {
                setVersesBn(data.chapter)
            })
        }
    }, [surahnumber])

    return (
        <Layout>
            <div
                className='fixed top-10 h-screen z-50'
                style={{
                    width: 256,
                }}
            >
                <Menu
                
                    activeKey={surah?.name_simple}
                    mode="vertical"
                    style={{
                        // border: 0,
                        backgroundColor: '#f5f5f5',
                        borderRadius: 5
                    }}
                    inlineCollapsed={collapsed}
                    onClick={(e) => navigate(`/quran/${e.key}`)}
                    items={items}
                />
            </div>

            {
                loading && parseInt(surahnumber) < 114 &&
                <div>
                    <svg className='loadingSvg' viewBox="0 0 1320 300">
                        <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                            {
                                surahNameByNumber[parseInt(surahnumber) - 1] ? surahNameByNumber[parseInt(surahnumber) - 1] : "Surah not found"
                            }
                        </text>
                    </svg>
                </div>
            }
            {
                parseInt(surahnumber) > 114 && <p className='text-[3rem] px-5 md:px-10 mt-20'>Ya akhi, Quran has 114 Surah! How did you forget this?</p>
            }

            {
                !verses && !parseInt(surahnumber) && <p>Surah not found</p>
            }
            {
                !loading && <div className='mt-20 px-5 md:px-10  select-none'>
                    <div className="grid justify-center">
                        <img src="/bismilla.png" alt="Bismillah" draggable={false} />
                    </div>
                    <div className="relative flex items-center justify-between w-full bg-[#FCEDDC] p-5 mt-5 rounded-md ">
                        <div>
                            <p className='font-[uthmani] text-3xl'>
                                {surah?.name_arabic}
                            </p>
                            <div >
                                <p className="surahEngName -mb-2">{surah?.name_simple}</p>
                                <p className="surahEngMeaningName m-0  text-[#947C5c]">{surah?.translated_name?.name}</p>
                            </div>
                            <div className="text-base  text-[#947C5c]">
                                <p>{surah?.verses_count} verses</p>
                                <p>{surah?.revelation_place}</p>
                            </div>
                        </div>
                        {
                            surah?.revelation_place && <img src={`/${surah?.revelation_place.toLowerCase()}.svg`} className="w-1/4 absolute right-0 -bottom-18" alt={surah?.revelation_place} draggable={false} />
                        }
                    </div>
                    <div className='mt-2 flex gap-2 font-[uthmani] text-[3rem] break-words text-right justify-end'>
                        <div className='grid gap-3 mt-20'>
                            {
                                parseInt(surahnumber) <= 114 && !loading && Object.keys(verses).map((el, i) => <div key={i}>
                                    <p className={i !== 0 && "mt-10"}>
                                        {verses[el].words.arabic.split("|").join(" ")}<span style={{ fontSize: "45px" }} className='text-3xl'>{verses[el].words.end}</span>
                                    </p>
                                    <span className='!text-xl'>
                                        {verses[el].words.translation.split("|").join(" ")}
                                    </span>
                                    <br />
                                    <span className='!text-xl'
                                        style={{
                                            lineHeight: "30px !important",
                                            display: "block"
                                        }}
                                    >
                                        {versesBn[verses[el].meta?.verse - 1]?.text}
                                    </span>
                                </div>)
                            }
                        </div>

                    </div>
                </div>
            }
        </Layout>
    )
}

export default Surah