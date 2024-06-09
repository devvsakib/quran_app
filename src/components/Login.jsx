import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CommonLayout from '../layouts/CommonLayout'

const Login = ({ }) => {
    const apiKey = "$2y$10$QGhYRP8QntsIXimr38iKe2cELAnnvoBWkBHtRZkn8ZxZ61fzyPOq"
    const [hadith, setHadith] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const bookSlug = "sahih-muslim"
    const apiUrl = `https://hadithapi.com/api/${bookSlug}/chapters?apiKey=${apiKey}`;
    const apiUrl2 = `https://hadithapi.com/api/hadiths?hadithEnglish=music&apiKey=${apiKey}`;
    const apiUrl3 = `https://hadithapi.com/api/books?apiKey=${apiKey}`;

    useEffect(() => {
        setIsLoading(true)
        fetch(apiUrl2)
            .then(response => response.json())
            .then(data => {
                console.log(data.hadiths.data);
                setHadith(data.hadiths.data);
            })
            .catch(error => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false)
            });
    }, [])
    return (
        <CommonLayout>
            <h1 className='text-3xl my-5'>Login</h1>
            {
                isLoading ? <p>Loading...</p> :
                    <div>
                        <h1 className='text-3xl my-5'>Hadith</h1>
                        <ul className='font-uthman grid gap-5 grid-cols-2'>
                            {hadith?.map((h, index) => {
                                return <li  className='bg-white rounded-md shadow-sm p-5 !font-[poppins]' key={index}>{h.hadithEnglish}</li>
                            })}
                        </ul>
                    </div>
            }
        </CommonLayout>
    )
}

export default Login