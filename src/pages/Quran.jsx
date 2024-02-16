import React, { useEffect, useState } from 'react'
import CommonLayout from '../layouts/CommonLayout'
import { Input, Segmented, Spin } from 'antd'
const Quran = () => {
    const [totalLetter, setTotalLetter] = useState("1")

    // // remove space 
    const [total, setTotal] = useState(0)
    const arabicAlphabet = [
        "ا", "ب", "ج", 'د', 'ه', 'و', 'ز', 'ح', 'ط', 'ي', 'ك', 'ل', 'م', 'ن', 'س', 'ع', 'ف', 'ص', 'ق', 'ر', 'ش', 'ت', 'ث', 'خ', 'ذ', 'ض', 'ظ', 'غ',
    ]

    const surahAyah = [
        "1:1, 1:7", "2:1, 2:286", "3:1, 3:200", "4:1, 4:176", "5:1, 5:120", "6:1, 6:165", "7:1, 7:206", "8:1, 8:75", "9:1, 9:129", "10:1, 10:109", "11:1, 11:123", "12:1, 12:111", "13:1, 13:43", "14:1, 14:52", "15:1, 15:99", "16:1, 16:128", "17:1, 17:111", "18:1, 18:110", "19:1, 19:59", "20:1, 20:130", "21:1, 21:112", "22:1, 22:78", "23:1, 23:118", "24:1, 24:64", "25:1, 25:77", "26:1, 26:227", "27:1, 27:93", "28:1, 28:88", "29:1, 29:69", "30:1, 30:60", "31:1, 31:34", "32:1, 32:30", "33:1, 33:73", "34:1, 34:54", "35:1, 35:45", "36:1, 36:83", "37:1, 37:182", "38:1, 38:88", "39:1, 39:75", "40:1, 40:85", "41:1, 41:54", "42:1, 42:53", "43:1, 43:89", "44:1, 44:59", "45:1, 45:37", "46:1, 46:35", "47:1, 47:38", "48:1, 48:29", "49:1, 49:18", "50:1, 50:45", "51:1, 51:60", "52:1, 52:49", "53:1, 53:62", "54:1, 54:55", "55:1, 55:78", "56:1, 56:96", "57:1, 57:29", "58:1, 58:22", "59:1, 59:24", "60:1, 60:13", "61:1, 61:14", "62:1, 62:11", "63:1, 63:11", "64:1, 64:18", "65:1, 65:12", "66:1, 66:12", "67:1, 67:30", "68:1, 68:52", "69:1, 69:52", "70:1, 70:44", "71:1, 71:28", "72:1, 72:28", "73:1, 73:20", "74:1, 74:56", "75:1, 75:40", "76:1, 76:31", "77:1, 77:50", "78:1, 78:40", "79:1, 79:46", "80:1, 80:42", "81:1, 81:29", "82:1, 82:19", "83:1, 83:36", "84:1, 84:25", "85:1, 85:22", "86:1, 86:17", "87:1, 87:19", "88:1, 88:26", "89:1, 89:30", "90:1, 90:20", "91:1, 91:15", "92:1, 92:21", "93:1, 93:11", "94:1, 94:8", "95:1, 95:8", "96:1, 96:19", "97:1, 97:5", "98:1, 98:8", "99:1, 99:8", "100:1, 100:11", "101:1, 101:11", "102:1, 102:8", "103:1, 103:3", "104:1, 104:9", "105:1, 105:5", "106:1, 106:4", "107:1, 107:7", "108:1, 108:3", "109:1, 109:6", "110:1, 110:3", "111:1, 111:5", "112:1, 112:4", "113:1, 113:5", "114:1, 114:6"
    ]
    const surahNameByNumber = [
        "Al-Fatiha", "Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Maidah", "Al-Anam", "Al-Araf", "Al-Anfal", "At-Tawbah", "Yunus", "Hud", "Yusuf", "Ar-Rad", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha", "Al-Anbiya", "Al-Hajj", "Al-Muminun", "An-Nur", "Al-Furqan", "Ash-Shuara", "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman", "As-Sajda", "Al-Ahzab", "Saba", "Fatir", "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir", "Fussilat", "Ash-Shura", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqia", "Al-Hadid", "Al-Mujadila", "Al-Hashr", "Al-Mumtahina", "As-Saff", "Al-Jumua", "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haaqqa", "Al-Maarij", "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddathir", "Al-Qiyama", "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "Abasa", "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-A'la", "Al-Ghashiya", "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Lail", "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-Alaq", "Al-Qadr", "Al-Bayyina", "Az-Zalzala", "Al-Adiyat", "Al-Qaria", "At-Takathur", "Al-Asr", "Al-Humazah", "Al-Fil", "Quraish", "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr", "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
    ]

    const url = 'https://api.quranwbw.com/v1/verses?verses=17:1,17:111&verse_translation=1&between=true'
    const fontApi = "https://quranwbw.com/assets/fonts/uthmani-new.ttf"

    const [verses, setVerses] = useState([])
    const [versesBn, setVersesBn] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if ((surahAyah.length >= parseInt(totalLetter) && parseInt(totalLetter) > 0 && parseInt(totalLetter) <= 114)) {
            setLoading(true)
            fetch(`https://api.quranwbw.com/v1/verses?verses=${JSON.stringify(surahAyah[totalLetter - 1]).split("\"").join("").replace(/\s/g, '')}&verse_translation=1&between=true`).then(res => res.json()).then(data => {
                setLoading(false)
                setVerses(data.data.verses)
            })
            fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan/${totalLetter}.min.json`).then(res => res.json()).then(data => {

                setVersesBn(data.chapter)
            })
        }
    }, [totalLetter])

    useEffect(() => {
        let totalAr = 0
        totalLetter.split("").map(i => {
            if (arabicAlphabet.includes(i)) {
                totalAr += 1
            }
        })
        setTotal(totalAr)
    }, [totalLetter])

    return (
        <CommonLayout>
            <div className='min-h-screen grid gap-10'>
                <div>
                    <img src="/bismillah.png" alt="bismillah" className='w-1/6 mx-auto mt-5 mb-2' />
                    <Input type="text"
                        allowClear
                        placeholder='Enter Surah Number'
                        className='bg-transparent border border-pink-700 rounded-md p-2 max-w-full mt-2 focus:outline-none focus:ring-2 focus:ring-pink-700 focus:border-transparent'
                        onChange={(e) => {
                            setTotalLetter(e.target.value.replace(/\s/g, ''))
                        }}
                    />
                 
                </div>
                <div>
                    <div className='mt-2 flex gap-2 font-[uthmani] text-[3rem] break-words text-right justify-end'>
                        {/* {
                        totalLetter.split("").map((i, index) => {
                            if (arabicAlphabet.includes(i)) {
                                return <p key={index} className='text-2xl font-bold font-[raleway]'>{i}</p>
                            }
                        })
                    } */}
                        {
                            parseInt(totalLetter) > 114 && <p>Ya akhi, Quran has 114 Surah! How did you forget this?</p>
                        }
                        {/* {loading && parseInt(totalLetter) < 114 && <img className='w-1/12 mx-auto' src='/loading.svg' />} */}
                        {loading && parseInt(totalLetter) < 114 && <svg className='loadingSvg' viewBox="0 0 1320 300">
                            <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                                {
                                    surahNameByNumber[parseInt(totalLetter) - 1] ? surahNameByNumber[parseInt(totalLetter) - 1] : "Surah not found"
                                }
                            </text>
                        </svg>}
                        {/* {loading && parseInt(totalLetter) < 114 && <Spin className='w-1/12 mx-auto' />} */}
                        {
                            !verses && !parseInt(totalLetter) && <p>Surah not found</p>
                        }
                        <div className='grid gap-3'>
                            {
                                parseInt(totalLetter) <= 114 && !loading && Object.keys(verses).map((el, i) => <div key={i}>
                                    <p>
                                        {verses[el].words.arabic.split("|").join(" ")}<span style={{ fontSize: "45px" }} className='text-3xl'>{verses[el].words.end}</span>
                                    </p>
                                    <span className='!text-xl'>
                                        {verses[el].words.translation.split("|").join(" ")}
                                    </span>
                                    <br />
                                    <span className='!text-xl'>
                                        {versesBn[verses[el].meta?.verse - 1]?.text}
                                    </span>
                                </div>)
                            }
                        </div>

                    </div>
                </div>
            </div>
        </CommonLayout>
    )
}

export default Quran