
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../../layouts/Layout'

const Hadith = () => {
    const baseUrl = "https://quran-hadith-api.onrender.com/api/v1/hadiths/books"
    const [booksOfHadith, setBooksOfHadith] = useState([])


    useEffect(() => {
        axios(baseUrl)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    return (
        <Layout>
            Hadith
        </Layout>
    )
}

export default Hadith