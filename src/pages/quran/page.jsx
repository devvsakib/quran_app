import axios from 'axios'
import { Radio, Table } from 'antd'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Layout from '../../layouts/Layout'

const Quran = () => {
    const [chapter, setChapter] = useState([])
    const [surahNameLang, setSurahNameLang] = useState('name_simple') // Default language is English

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
                setChapter(response.data.chapters);
            })
            .catch((error) => {
                console.log(error);
            });
        }, [])
        
    return (
        <Layout>
            <div className='mt-5'>
                <h1>Test</h1>
                <Table
                    dataSource={chapter}
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: surahNameLang === 'name_simple' ? 'name_simple' : 'name_arabic',
                            key: 'name',
                            render: (text, record) => <Link to={`/quran/${record.id}`} className='font-[uthmani] text-xl'>{text}</Link>,
                            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                                <Radio.Group
                                    className='p-2 grid gap-2'
                                    onChange={(e) => {
                                        setSurahNameLang(e.target.value);
                                        setSelectedKeys([e.target.value]);
                                        confirm();
                                    }}
                                    defaultValue={surahNameLang}
                                >
                                    <Radio value="name-arabic">Arabic</Radio>
                                    <Radio value="name_simple">English</Radio>
                                </Radio.Group>
                            ),
                        },
                        {
                            title: 'Revelation Place',
                            dataIndex: 'revelation_place',
                            key: 'revelation_place',
                            filters: [
                                { text: 'Makkah', value: 'makkah' },
                                { text: 'Madina', value: 'madina' },
                            ],
                            onFilter: (value, record) => record.revelation_place.indexOf(value) === 0,
                        },
                        {
                            title: 'Revelation Order',
                            dataIndex: 'revelation_order',
                            key: 'revelation_order',
                            sorter: (a, b) => a.revelation_order - b.revelation_order,
                        },
                        {
                            title: 'Verses Count',
                            dataIndex: 'verses_count',
                            key: 'verses_count',
                            sorter: (a, b) => a.revelation_order - b.revelation_order,
                        }
                    ]}
                    locale={
                        {
                            emptyText: <svg className='surahLoadingSvg' viewBox="0 0 1320 300">
                                <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                                    {
                                        "Loading..."
                                    }
                                </text>
                            </svg>
                        }
                    }
                />
            </div>
        </Layout>
    )
}

export default Quran