import * as React from 'react'
import {useState} from 'reinspect'
import {useParams} from 'react-router-dom'
import {Table, Icon} from 'antd';

import {formatDuration} from '../../tools/format'
import './Single.scss'

// 类型
import {PaginationConfig, ColumnProps} from 'antd/lib/table';
import {InitialParams} from '../../hooks/useSearchMusic'

// props 的类型
interface IProps {
    isLoading: boolean,
    isError: boolean,
    data: any[],
    count: number,
    setParams: React.Dispatch<React.SetStateAction<InitialParams>>
}

// 单曲列表数据渲染的类型
interface SingleData {
    key: number,
    index: number,
    name: string,
    "artists.name": string,
    "album.name": string,
    duration: string
}

export function Single(props: IProps) {
    // 获取参数
    const {keywords} = useParams()

    // 当前页码
    const [page, setPage] = useState(1, '当前页码')

    // 获取 reducer 数据
    const {
        isLoading,
        isError,
        data,
        count,
        setParams
    } = props

    // 表头和索引
    const columns: ColumnProps<SingleData>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            width: 80,
            className: 'm-s-single-order'
        },
        {
            title: '喜欢/下载',
            dataIndex: 'icon',
            width: 100,
            render: () => (
                <span>
                    <Icon type="heart" className="icon"/>{" "}
                    <Icon type="download" className="icon"/>
                </span>
            ),
        },
        {
            title: '音乐标题',
            dataIndex: 'name',
            width: 400
        },
        {
            title: '歌手',
            dataIndex: 'artists.name',
        },
        {
            title: '专辑',
            dataIndex: 'album.name'
        },
        {
            title: '时长',
            dataIndex: 'duration'
        }
    ];

    // 表格渲染
    const dataSource: SingleData[] = data.map((item, index) => {
        return {
            key: item.id,
            index: (index + 1) + (page - 1) * 100,
            name: item.name,
            "artists.name": item.artists[0].name,
            "album.name": item.album.name,
            duration: formatDuration(item.duration)
        }
    })

    // 表格分页显示配置
    const pagination = {
        total: count,
        pageSize: 100,
        current: page
    }

    // 点击分页按钮重新发起请求
    const onHandleChange = (pagination: PaginationConfig) => {
        if (pagination.current) {
            setPage(pagination.current)
            setParams({
                keywords,
                limit: 100,
                offset: (pagination.current - 1) * 100
            })
        }
    }

    return (
        <Table<SingleData>
            loading={isLoading}
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            scroll={{y: 365}}
            onChange={onHandleChange}
        />
    )
}
