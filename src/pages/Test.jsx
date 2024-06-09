import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import CommonLayout from '../layouts/CommonLayout';
import { Table, Radio, Button, Segmented, Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

const Test = () => {
    const [chapter, setChapter] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [surahNameLang, setSurahNameLang] = useState('name_simple') // Default language is English

    useEffect(() => {
        setIsLoading(true)
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
            }).finally(() => {
                setIsLoading(false)
            });
    }, [])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div >
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text, record) =>
            searchedColumn === dataIndex ? (
                <Link to={`/quran/${record.id}`}>{text}</Link>
            ) : (
                <Link to={`/quran/${record.id}`}>{text}</Link>
            ),
    });

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
                virtual={true}
                    dataSource={chapter}
                    columns={[
                        {
                            title: 'Type',
                            dataIndex: 'id',
                            key: 'id',
                            render: (text, record) => record.revelation_place === 'makkah' ? <img src={`/meccan.svg`} className="h-10  -bottom-20" /> :
                                <img src={`/medinan.svg`} className="h-10  -bottom-20" />,
                            filters: [
                                { text: 'Makkah', value: 'makkah' },
                                { text: 'Madina', value: 'madina' },
                            ],
                            onFilter: (value, record) => record.revelation_place.indexOf(value) === 0,

                        },
                        {
                            title: 'Name',
                            dataIndex: surahNameLang === 'name_simple' ? 'name_simple' : 'name_arabic',
                            key: 'name',
                            ...getColumnSearchProps(surahNameLang === 'name_simple' ? 'name_simple' : 'name_arabic'),
                            // render: (text, record) => <Link to={`/quran/${record.id}`}>{text}</Link>,
                            // filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                            //     <div className='p-3'>
                            //         <div>

                            //             <Input
                            //                 ref={searchInput}
                            //                 placeholder={`Search `}
                            //                 value={selectedKeys[0]}
                            //                 onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            //                 onPressEnter={() => handleSearch(selectedKeys, confirm, 'name_simple')}
                            //                 style={{
                            //                     marginBottom: 8,
                            //                     display: 'block',
                            //                 }}
                            //             />
                            //             <Button
                            //                 type="primary"
                            //                 onClick={() => handleSearch(selectedKeys, confirm, 'name_simple')}
                            //                 icon={<SearchOutlined />}
                            //                 size="small"
                            //             >
                            //                 Search
                            //             </Button>
                            //         </div>
                            //         <Radio.Group
                            //             className='p-2 grid gap-2'
                            //             onChange={(e) => {
                            //                 setSurahNameLang(e.target.value);
                            //                 setSelectedKeys([e.target.value]);
                            //                 confirm();
                            //             }}
                            //             defaultValue={surahNameLang}
                            //         >
                            //             <Radio value="name-arabic">Arabic</Radio>
                            //             <Radio value="name_simple">English</Radio>
                            //         </Radio.Group>
                            //     </div>
                            // ),
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
                    loading={isLoading}
                    // loading={chapter.length === 0}
                    locale={
                        {
                            emptyText: 'No Surah Found',
                            
                        }
                    }
                />
            </div>
        </CommonLayout>
    )
}

export default Test
