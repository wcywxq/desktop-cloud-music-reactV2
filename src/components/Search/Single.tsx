import * as React from 'react'
import { useState } from 'reinspect'
import { useParams } from 'react-router-dom'
import { Icon, Table } from 'antd';

import { formatDuration } from '@/tools'
import './Single.scss'

// 类型
import { ColumnProps, PaginationConfig } from 'antd/lib/table'
import { MusicProjectState } from "@/redux"
import { InitialParams } from '@/hooks'

// 添加音乐到播放列表的 reducer
import { useMusicPlayList, useMusicMessage } from "@/hooks"

// props 的类型
interface IProps {
    isLoading: boolean;
    isError: boolean;
    data: any[];
    count: number;
    setParams: React.Dispatch<React.SetStateAction<InitialParams>>;
}

// 单曲列表数据渲染的类型
interface SingleData {
    key: number;
    index: number;
    name: string;
    "artists.name": string;
    "album.name": string;
    duration: number;
}

export function Single(props: IProps) {
    // 获取搜索渲染列表的 reducer 数据
    const { isLoading, isError, data, count, setParams } = props;

    // 获取参数
    const { keywords } = useParams();

    // 当前页码
    const [page, setPage] = useState(1, '当前页码');

    // 发送双击的歌曲到 reducer，同时获取 state 或者 sessionStorage 中的数组长度，用来传递索引
    const { state, setRecord } = useMusicPlayList();

    // 双击传递音乐id，从而获取音乐的url
    const { setID, setDuration, setListIndex } = useMusicMessage();

    // 表头和索引
    const columns: ColumnProps<SingleData>[] = [
        {
            title: '序号', dataIndex: 'index', width: 80, className: 'm-s-single-order',
            render: (text: number) => (
                <span>
                    <Icon type="caret-right" style={{ color: '#f00', cursor: 'pointer' }} />{" "}
                    {/* <Icon type="pause" style={{color: '#f00'}} />{" "} */}
                    <span>{text}</span>
                </span>
            )
        },
        {
            title: '喜欢/下载', dataIndex: 'icon', width: 100,
            render: () => (
                <span>
                    <Icon type="heart" className="icon" />{" "}
                    <Icon type="download" className="icon" />
                </span>
            ),
        },
        { title: '音乐标题', dataIndex: 'name', width: 400 },
        { title: '歌手', dataIndex: 'artists.name', },
        { title: '专辑', dataIndex: 'album.name' },
        { title: '时长', dataIndex: 'duration', render: (text) => <span>{formatDuration(text)}</span> }
    ];

    // 表格渲染
    const dataSource: SingleData[] = data.map((item, index) => {
        return {
            key: item.id,
            index: (index + 1) + (page - 1) * 100,
            name: item.name,
            "artists.name": item.artists[0].name,
            "album.name": item.album.name,
            duration: item.duration
        }
    });

    // 表格分页显示配置
    const pagination = {
        total: count,
        pageSize: 100,
        current: page
    };

    // 点击分页按钮重新发起请求
    function onHandleChange(pagination: PaginationConfig) {
        if (pagination.current) {
            setPage(pagination.current);
            setParams({
                keywords,
                limit: 100,
                offset: (pagination.current - 1) * 100
            });
        }
    };


    // 双击之后的回调函数
    function onHandleDoubleClick(record: SingleData) {
        setRecord(record);
        setID(record.key);
        setDuration(record.duration);
        if (sessionStorage.getItem('data') && sessionStorage.getItem('data') !== '[]') {
            let sessionData: MusicProjectState[] = JSON.parse(sessionStorage.getItem('data') as string)
            setListIndex(sessionData.length); // 传递音乐播放列表索引
        } else {
            setListIndex((state as MusicProjectState[]).length); // 传递音乐播放列表索引
        }
    };

    return (
        <Table<SingleData>
            loading={isLoading}
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            scroll={{ y: 365 }}
            onChange={onHandleChange}
            onRow={record => {
                return {
                    // 双击行
                    onDoubleClick: () => onHandleDoubleClick(record)
                }
            }}
        />
    )
}
