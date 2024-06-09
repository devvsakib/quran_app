import Layout from "../layouts/Layout";
import images from "../configs/Images";
import axios from "axios";
import { useEffect, useState } from "react";
import CardStack from "./TestCard.jsx";
import { Link } from "react-router-dom";

export default function Home() {

    const [prayerTime, setPrayerTime] = useState([]);
    const options = {
        method: 'GET',
        url: 'https://muslimsalat.p.rapidapi.com/moulvibazar.json',
        headers: {
            'X-RapidAPI-Key': '51e4c9eccdmsh2e7f28b71b0d204p18ec06jsnd4e7c395d401',
            'X-RapidAPI-Host': 'muslimsalat.p.rapidapi.com'
        }
    };
    const getPrayerTime = async () => {
        // fetch("http://api.aladhan.com/v1/calendarByAddress/2024/2?address=Moulvibazar&method=2")
        // .then((response) => response.json())
        // .then((data) => {
        // });
        const response = await axios.request(options);
        setPrayerTime(response.data);
    }

    useEffect(() => { getPrayerTime() }, []);
    const times = [
        "Fajr",
        "Dhuhr",
        "Asr",
        "Maghrib",
        "Isha"
    ]
    return (
        <div
            style={{ background: `url(${images.bg}) center center` }}
            className="bg-white"
        >
            {/* <TestCard /> */}
            <div
                className="bg-cover bg-center relative  bg-white"
                style={{
                    backgroundImage: `url(${images.bannerBG})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div
                    className="min-h-screen grid items-center"
                >
                    <div className="w-5/12 mx-auto -mt-20">
                        <img src={images.lailahaillallah} />
                    </div>
                </div>
            </div>
            <div className="grid px-10 grid-cols-5 gap-5 py-20 bg-cover bg-center"
                style={{
                    background: `url(${images.prayerbg}) center -15rem`,
                }}
            >
                {
                    prayerTime?.items && prayerTime ? Object.keys(prayerTime?.items[0])?.map((item, index) => (
                        times.find((time) => time.toLowerCase() === item.toLowerCase()) ?
                            <div className="bg-white/10 text-white backdrop-blur-md shadow p-5 rounded-lg" key={index}>
                                <h1 className="text-2xl font-semibold capitalize">{item}</h1>
                                <p className="mt-3">{prayerTime?.items[0][item]}</p>
                            </div> : null
                    )) : null
                }

            </div>
            <div className="bg-white">
                <div
                    className="h-72 grid grid-cols-3 items-center"
                    style={{
                        backgroundImage: `url(${images.quranayah})`,
                        backgroundSize: "cover",
                        backgroundPositionY: "center",
                        backgroundRepeat: "no-repeat"
                    }}
                >
                    <div className="max-w-[1280px] mx-auto col-span-2 px-10">
                        <p className="font-[uthmani] text-4xl"> ذَٰلِكَ ٱلۡكِتَٰبُ لَا رَيۡبَۛ فِيهِۛ هُدٗى لِّلۡمُتَّقِينَ ٢</p>
                        <p className="text-xl mt-2 font-[RobotoCondensedRegu]">This is the Book about which there is no doubt, a guidance for those conscious of Allāh</p>
                        <span className="font-semibold text-gray-500 text-xs">Al-Baqarah 2</span>
                    </div>
                </div>
            </div>
            <Layout>
                <div className="grid grid-cols-3 gap-5 my-20">
                    <div className="col-span-2">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="bg-white p-5 rounded-lg">
                                <h1 className="text-2xl font-semibold">About Us</h1>
                                <p className="mt-3 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                            <div className="bg-white p-5 rounded-lg">
                                <h1 className="text-2xl font-semibold">Our Mission</h1>
                                <p className="mt-3 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-lg">
                        <h1 className="text-2xl font-semibold">Our Services</h1>
                        <p className="mt-3 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
                <div>
                    <Link to={"http://www.islamagainstextremism.com"} target="_blank">
                        <img src="http://www.islamagainstextremism.com/assets/banners/banner-new-iae-2015.jpg" alt="Islam Against Extremism" />
                    </Link>
                </div>
            </Layout>
        </div>
    );
}
