import { useState, useEffect } from 'react'
import CommonLayout from '../layouts/CommonLayout'
import { Table } from 'antd'

const Hadith = () => {

    // const url = 'https://api.hadith.sutanlab.id/books/muslim'
    const baseurl = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json"
    const bnUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ben-bukhari.json"
    const arUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari.json"
    // https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-abudawud/1035.json
    // https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-abudawud/1035.min.json
    // https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-abudawud/sections/7.json
    // https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/info.json

    const [hadith, setHadith] = useState({})
    const [bnHadith, setBnHadith] = useState({})
    const [arHadith, setArHadith] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(baseurl)
            .then(response => response.json())
            .then(data => {
                setHadith(data)
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        fetch(bnUrl)
            .then(response => response.json())
            .then(data => {
                setBnHadith(data)
                setLoading(false)
            })
    }, [])
    useEffect(() => {
        fetch(arUrl)
            .then(response => response.json())
            .then(data => {
                setArHadith(data)
                setLoading(false)
            })
    }, [])
    const addArabicToBangla = () => {
        let mainData = []
        if (arHadith?.hadiths && bnHadith?.hadiths) {
            for (let i = 0; i < bnHadith?.hadiths.length; i++) {
                mainData.push({
                    ...bnHadith?.hadiths[i],
                    arabic: arHadith?.hadiths[i].text
                })
            }
        }
        return mainData
    }



    return (
        <CommonLayout>
            <div className='font-[raleway] mb-20'>
                <h4 className='mt-10 text-xl font-semibold'>
                    {hadith?.bukhari?.name}
                </h4>
                <div>
                    {loading && <p>Loading...</p>}

                    <p className='mt-5 mb-2'>Chapter</p>
                    <div className='grid gap-4'>
                        <Table
                            dataSource={addArabicToBangla()}
                            columns={[
                                {
                                    title: 'Hadith Number',
                                    dataIndex: 'hadithnumber',
                                    key: 'id',
                                },
                                {
                                    title: 'Bangla',
                                    dataIndex: 'text',
                                    key: 'id',
                                },
                                {
                                    title: 'Arabic',
                                    dataIndex: 'arabic',
                                    key: 'id',
                                    render: (text) => (
                                        <p className='text-xl font-[uthmani]'>
                                            {text}
                                        </p>
                                    )
                                },

                            ]}
                        />
                        {/* {
                            bnHadith?.hadiths && bnHadith?.hadiths.slice(0, 5).map((hadith, index) => {
                                return (
                                    <div key={index} className='bg-white rounded-sm shadow p-4 grid grid-cols-2 gap-5'>
                                        <div>
                                            <p className='font-semibold'>
                                            </p>
                                            <p>
                                                <span className='font-semibold'>{hadith.hadithnumber}. </span>
                                                {hadith.text}
                                            </p>
                                        </div>
                                        <div className='text-2xl font-[uthmani]'>
                                            {arHadith?.hadiths[index].text}
                                        </div>
                                    </div>
                                )
                            })
                        } */}
                    </div>

                    {/* <div className='grid grid-cols-2 gap-2'>
                        {
                            bnHadith?.metadata && Object.keys(bnHadith?.metadata?.sections).map((key, index) => {
                                return (
                                    <div key={index} className='bg-white rounded-sm shadow p-3 h-12'>
                                        <p className='font-semibold'>
                                            {(index + 1)}.
                                            {
                                                bnHadith?.metadata?.sections[index] === "" ? "Introduction" : bnHadith?.metadata?.sections[index]
                                            }
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div> */}
                </div>
            </div>
        </CommonLayout>
    )
}

export default Hadith