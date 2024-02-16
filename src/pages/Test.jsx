import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CommonLayout from '../layouts/CommonLayout';
import { Table, Radio, Button, Segmented } from 'antd';
import { Link } from 'react-router-dom';

const Test = () => {
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
    const d = {
        "id": 1,
        "revelation_place": "makkah",
        "revelation_order": 5,
        "bismillah_pre": false,
        "name_simple": "Al-Fatihah",
        "name_complex": "Al-Fātiĥah",
        "name_arabic": "الفاتحة",
        "verses_count": 7,
        "pages": [
            1,
            1
        ],
        "translated_name": {
            "language_name": "english",
            "name": "The Opener"
        }
    }
    console.log(chapter[0])

    return (
        <CommonLayout>
            <div className='mt-5'>
                <Segmented
                    className="font-semibold mb-5"
                    options={[
                        { label: 'Surah', value: 'surah' },
                        { label: 'Page', value: 'page' },
                        { label: 'Juz', value: 'juz' },
                        { label: 'Hizb', value: 'hizb' },
                        { label: 'Ruku', value: 'ruku' }
                    ]}
                    // value='arabic'
                    onChange={(e) => console.log(e)}
                />

                <Table
                    dataSource={chapter}
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: surahNameLang === 'name_simple' ? 'name_simple' : 'name_arabic',
                            key: 'name',
                            render: (text, record) => <Link to={`/quran/${record.id}`}>{text}</Link>,
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
                    // loading
                    // loading={chapter.length === 0}
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
        </CommonLayout>
    )
}

export default Test
