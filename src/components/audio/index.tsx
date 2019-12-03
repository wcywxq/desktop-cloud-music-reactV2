import React, { useEffect, useRef } from "react"
import { useState } from 'reinspect'
import { Button, Col, Icon, Popover, Row, Slider, Table } from 'antd'

import { formatDuration, IconFont } from '@/tools'
// 删除
import { MUSIC_PROJECT_DELETE } from "@/redux/constants"
import { MusicMessageState, MusicProjectState } from "@/redux"
import { useMusicPlayList } from "@/hooks"
// 类型
import { ColumnProps } from "antd/lib/table"
// 组件
import MusicDetailWidget from "@/components/MusicDetailWidget";

// 接口
interface PlayListData {
    index: number;
    key: number;
    name: string;
    "artist.name": string;
    duration: number;
}

interface IProps {
    musicMsgState: MusicMessageState;
    setListIndex: React.Dispatch<React.SetStateAction<number>>;
    setID: React.Dispatch<React.SetStateAction<number>>;
    setDuration: React.Dispatch<React.SetStateAction<number>>;
}

export const Audio: React.FC<IProps> = (props) => {
    // 获取音乐信息, 包括url
    const { musicMsgState, setListIndex, setID, setDuration } = props;

    // 遮罩层
    const [visible, setVisible] = useState(false, '是否打开遮罩层');
    // 是否喜欢
    const [like, setLike] = useState(false, '是否喜欢');
    // 是否暂停播放
    const [flag, setFlag] = useState(false, '控制播放暂停');
    // 是否静音
    const [mute, setMute] = useState(false, '是否静音');
    // 播放音乐列表和历史记录列表的路由
    const [isPlayList, setIsPlayList] = useState(true, '是否是播放音乐列表，否则是历史记录列表');
    // 播放时间
    const [currentTime, setCurrentTime] = useState<any>(0, '当前时间');

    // 播放控制部分
    const audioRef = useRef<any>();
    const audio = audioRef.current as unknown as HTMLAudioElement;

    // 音量控制
    const SoundControl = <Slider vertical defaultValue={30} style={{ height: '100px' }} />;

    // 获取添加到音乐播放列表的歌曲
    const { state, dispatch } = useMusicPlayList();

    // 表格设置
    const columns: ColumnProps<PlayListData>[] = [
        {
            title: () => <span className="s-cl-lightgray">序号</span>,
            dataIndex: 'index',
            width: 70,
            className: 'f-fz12 f-cp'
        },
        {
            title: () => <span className="s-cl-lightgray">总{dataSource.length}首</span>,
            dataIndex: 'name',
            width: 200,
            className: 'f-fz12 f-cp',
            render: (text: string) => {
                return <span>{
                    text.length > 8 ? text.substring(0, 8) + '...' : text
                }</span>
            }
        },
        {
            title: () => (
                <span>
                    <Icon type="folder-add" />{" "}收藏全部
                 </span>
            ),
            dataIndex: 'artist.name',
            width: 100,
            className: 'f-fz12 f-cp',
            render: (text: string) => {
                return <span>{
                    text.length > 8 ? text.substring(0, 8) + '...' : text
                }</span>
            }
        },
        {
            title: () => (
                <span onClick={() => dispatch({ type: MUSIC_PROJECT_DELETE })}>
                    <Icon type="delete" />{" "}清空
                 </span>
            ),
            dataIndex: 'duration',
            width: 80,
            className: 'f-fz12 f-cp',
            render: (text: number) => {
                return <span>{formatDuration(text)}</span>
            }
        }
    ];

    // 播放列表数据渲染, 如果有 sessionStorage，则用 sessionStorage 来获取数据
    let dataSource: PlayListData[];

    if (sessionStorage.getItem('data') && sessionStorage.getItem('data') !== '[]') {
        let sessionData = JSON.parse(sessionStorage.getItem('data') as string);
        dataSource = sessionData.map((item: MusicProjectState, index: number) => {
            return {
                index: index + 1,
                key: item.key,
                name: item.musicName,
                "artist.name": item["artist.name"],
                duration: item.duration
            }
        })
    } else if (state) {
        dataSource = state.map((item: MusicProjectState, index: number) => {
            return {
                index: index + 1,
                key: item.key,
                name: item.musicName,
                "artist.name": item["artist.name"],
                duration: item.duration
            }
        })
    } else {
        dataSource = []
    }

    // 音乐播放列表
    const MusicPlayList = (
        <div className='m-table-pl'>
            <div className='u-btn-group'>
                <Button
                    shape='round'
                    type={isPlayList ? 'danger' : 'default'}
                    className='f-bsn'
                    onClick={() => setIsPlayList(true)}
                >
                    播放列表
                </Button>
                <Button
                    shape='round'
                    type={!isPlayList ? 'danger' : 'default'}
                    className='f-bsn'
                    onClick={() => setIsPlayList(false)}
                >
                    历史记录
                </Button>
            </div>
            <div style={{ marginTop: '15px' }}>
                <Table
                    // loading={true}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{ total: dataSource.length, pageSize: 100 }}
                    scroll={{ y: 500 }}
                    className='f-usn'
                    onRow={record => {
                        return {
                            onDoubleClick: () => {
                                setID(record.key);
                                setDuration(record.duration);
                            }
                        }
                    }}
                // onChange={onHandleChange}
                />
            </div>
        </div>
    );

    /**
     * 点击暂停播放按钮
     * @param {React.MouseEvent<HTMLElement, MouseEvent>} event
     */
    function handlePlayClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        // 若 audio 不为 null
        if (audio) {
            // 若有src源文件
            if (audio.src) {
                // 播放暂停控制
                if (audio.paused) {
                    setFlag(true);
                    audio.play()
                } else {
                    setFlag(false);
                    audio.pause()
                }
            }
        }
    }

    /**
     * 播放器控制条改变的回调函数
     * @param value
     */
    function onSliderChange(value: any) {
        // 将进度条的值赋予给 audio 播放的当前时间
        audio.currentTime = value / 1000;
        // 将当前播放时间传递给 state
        setCurrentTime(value)
    }

    // 监听 audio 事件
    useEffect(() => {
        if (audio) {
            // 元数据已加载
            audio.addEventListener('loadedmetadata', () => {
                setFlag(true);
                audio.play();
            });
            // 监听播放时间
            audio.addEventListener('timeupdate', () => {
                setCurrentTime(audio.currentTime * 1000)
            });
            // 播放结束
            audio.addEventListener('ended', () => {
                setFlag(false);
                audio.pause();
                // 循环播放单曲
                setCurrentTime(0);
                setFlag(true);
                setTimeout(() => audio.play(), 300)
            });
            audio.addEventListener('abort', () => {
                // console.log(audio.currentSrc)
            })
        }
    }, [audio]);

    // 切换歌曲, 上一首 or 下一首
    useEffect(() => {
        let data;
        if (sessionStorage.getItem('data') && sessionStorage.getItem('data') !== '[]') {
            data = JSON.parse(sessionStorage.getItem('data') as string);
        } else if (state) {
            data = state;
        }

        if (musicMsgState) {
            if (musicMsgState["list.index"] > data.length - 1) {
                setListIndex(0);
            } else if (musicMsgState["list.index"] < 0) {
                setListIndex(data.length - 1);
            } else {
                setID(data[musicMsgState["list.index"]].key);
                setDuration(data[musicMsgState["list.index"]].duration);
            }
        }
    }, [musicMsgState, setDuration, setID, setListIndex, state]);

    // 渲染
    return (
        <div className='g-ft f-pr'>
            {
                musicMsgState ?
                    <audio ref={audioRef} src={musicMsgState.url[0]} style={{ height: 0 }} /> :
                    null
            }
            <Slider
                disabled={!audio}
                value={currentTime}
                max={musicMsgState ? musicMsgState.duration : undefined}
                tipFormatter={value => formatDuration(value)}
                onChange={onSliderChange}
                className="f-pa"
                style={{ width: '100%', top: '-32px', left: 0 }} />
            <Row>
                {
                    audio ? audio.src ?
                        <div>
                            <Col span={1}>
                                <img
                                    src={musicMsgState ? musicMsgState.picUrl : ''}
                                    alt=''
                                    className='f-cp'
                                    onClick={() => setVisible(!visible)}
                                />
                                <MusicDetailWidget visible={visible} setVisible={setVisible} />
                            </Col>
                            <Col span={7}>
                                {
                                    musicMsgState ?
                                        (
                                            <p>
                                                <span>
                                                    {
                                                        musicMsgState.name.length >= 10 ?
                                                            musicMsgState.name.substring(0, 10) + '...' :
                                                            musicMsgState.name
                                                    }
                                                </span>
                                                {" "}-{" "}
                                                <span className='f-fz12 s-cl-gray'>
                                                    {
                                                        musicMsgState.artist.join(' / ').length >= 16 ?
                                                            musicMsgState.artist.join(' / ').substring(0, 30) + '...' :
                                                            musicMsgState.artist.join(' / ')
                                                    }
                                                </span>
                                            </p>
                                        ) : null
                                }
                                <p>
                                    <span className='f-fz12 s-cl-lightgray'>
                                        {
                                            musicMsgState ?
                                                `${formatDuration(currentTime)} / ${formatDuration(musicMsgState.duration)}`
                                                : null
                                        }
                                    </span>
                                </p>
                            </Col>
                        </div>
                        : <Col span={8} /> : <Col span={8} />
                }
                <Col span={8} className='m-pcm f-dg f-jc-center f-ai-center'>
                    <Icon type='heart'
                        className={like ? 'f-fz18 f-cp s-cl-default' : 'f-fz18 f-cp'}
                        theme={like ? "filled" : undefined}
                        onClick={() => setLike(!like)}
                    />
                    <Icon type="step-backward"
                        className='f-fz24 f-cp s-cl-default'
                        onClick={() => {
                            if (musicMsgState) {
                                setListIndex(musicMsgState["list.index"] - 1)
                            }
                        }}
                    />
                    <Icon type={flag ? "pause-circle" : "play-circle"} theme="filled"
                        className='f-fz40 f-cp s-cl-default'
                        onClick={handlePlayClick}
                    />
                    <Icon type="step-forward"
                        className='f-fz24 f-cp s-cl-default'
                        onClick={() => {
                            if (musicMsgState) {
                                setListIndex(musicMsgState["list.index"] + 1)
                            }
                        }}
                    />
                    <IconFont type='icon-share' className='f-fz18 f-cp' />
                </Col>
                <Col span={4} />
                <Col span={4} className='m-pcr f-dg f-jc-end f-ai-center'>
                    <IconFont type='icon-xindong' className='f-fz18 f-cp' />
                    <Popover content={MusicPlayList} placement='top' trigger="click">
                        <IconFont type='icon-bofangliebiao' className='f-fz18 f-cp' />
                    </Popover>
                    <IconFont type='icon-geci' className='f-fz18 f-cp' />
                    <Popover content={SoundControl} style={{ height: '100px' }}>
                        <IconFont
                            type={mute ? 'icon-jingyin' : 'icon-shengyin'}
                            className='f-fz18 f-cp'
                            onClick={() => setMute(!mute)}
                        />
                    </Popover>
                </Col>
            </Row>
        </div>
    )
};

