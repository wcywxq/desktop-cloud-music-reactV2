import * as React from 'react'
import { useState } from 'reinspect'
import { useParams } from 'react-router-dom'
import { Icon, Table, Empty, Modal } from 'antd';

import { IconFont, formatDuration } from '@/tools'

// 类型
import { ColumnProps, PaginationConfig } from 'antd/lib/table'
import { ProjectStateType } from "@/redux"
import { SearchParams } from '@/api/types'

// 添加音乐到播放列表的 reducer
import { useMusicPlayList, useMusicMessage, useCanUse } from "@/hooks"

// props 的类型
interface IProps {
    isLoading: boolean;
    isError: boolean;
    data: any[];
    count: number;
    setParams: React.Dispatch<React.SetStateAction<SearchParams>>;
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

export const Single: React.FC<IProps> = (props) => {
    // props 传递的数据
    const { isLoading, isError, data, count, setParams } = props;

    // 获取参数
    const { keywords } = useParams();

    // 当前页码
    const [page, setPage] = useState(1, '当前页码');

    // 发送双击的歌曲到 reducer，同时获取 state 或者 sessionStorage 中的数组长度，用来传递索引
    const { state, setRecord } = useMusicPlayList();

    // 双击传递音乐id，从而获取音乐的url
    const { setID, setDuration, setListIndex } = useMusicMessage();

    // 音乐是否可用
    const { canUseState, setMid } = useCanUse();

    // 设置当前索引
    const [curIdx, setCurIdx] = useState<number | null>(null, '当前索引');

    // 表头和索引
    const columns: ColumnProps<SingleData>[] = [
        {
            title: '序号',
            dataIndex: 'index', width: 80, className: 'f-fsi',
            render: (text: any, record: SingleData) => (
                <span>
                    {
                        record.index === curIdx ?
                            <IconFont type='icon-shengyin-red' className='f-cp' /> :
                            <span className='s-cl-darkgray'>{text}</span>
                    }
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
            )
        },
        { title: '音乐标题', dataIndex: 'name', width: 400 },
        { title: '歌手', dataIndex: 'artists.name' },
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

    /**
     * 点击分页按钮重新发起请求
     * @param {PaginationConfig} pagination
     */
    function onHandleChange(pagination: PaginationConfig) {
        if (pagination.current) {
            setPage(pagination.current);
            setParams({ keywords, limit: 100, offset: (pagination.current - 1) * 100 });
        }
    }

    /**
     * 双击之后的回调函数
     * @param {SingleData} record
     */
    function onHandleDoubleClick(record: SingleData) {
        // 传递音乐 id，从而判断音乐是否可用
        setMid(record.key);

        // 音乐不可用的弹框
        if (!canUseState.success) {
            Modal.error({
                title: '音乐不可用',
                content: (
                    <div>
                        <p>{canUseState.message}</p>
                    </div>
                ),
                maskClosable: true
            });
        } else {
            Modal.confirm({
                title: '音乐可用',
                icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />,
                content: (
                    <div>
                        <p>{canUseState.message === 'ok' ? '是否立即播放' : ''}</p>
                    </div>
                ),
                okText: '确定',
                cancelText: '取消',
                maskClosable: true,
                onOk: () => {
                    setRecord(record); // 传递数据
                    setID(record.key); // 传递 id
                    setDuration(record.duration); // 传递持续时长
                    setCurIdx(record.index); // 传递当前索引
                    if (sessionStorage.getItem('data') && sessionStorage.getItem('data') !== '[]') {
                        let sessionData: ProjectStateType[] = JSON.parse(sessionStorage.getItem('data') as string);
                        setListIndex(sessionData.length); // 传递音乐播放列表索引
                    } else {
                        setListIndex((state as ProjectStateType[]).length); // 传递音乐播放列表索引
                    }
                }
            });
        }
    }

    return (
        <>
            {
                isError ?
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>请求失败</span>} />
                    :
                    <Table<SingleData>
                        className="f-cp"
                        loading={isLoading}
                        columns={columns}
                        dataSource={dataSource}
                        pagination={pagination}
                        scroll={{ y: 365 }}
                        onChange={onHandleChange}
                        onRow={(record: SingleData) => {
                            return {
                                // 双击行
                                onDoubleClick: () => onHandleDoubleClick(record)
                            }
                        }}
                    />
            }
        </>
    )
};
