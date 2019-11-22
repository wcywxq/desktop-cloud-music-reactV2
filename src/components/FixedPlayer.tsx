// MutableRefObject 泛型接口，接收一个参数，作为 useRef 的类型定义,参数可以为T类型，即任意类型
import React, { useRef, MutableRefObject, useEffect } from "react"
import { useState } from 'reinspect'
import { Row, Col, Button, Icon, Slider, Popover, Table } from 'antd'

import './FixedPlayer.scss'

import { IconFont, formatDuration } from '@/tools'

// 删除
import { MUSIC_PROJECT_DELETE } from "@/redux/constants"
import { MusicMessageState, MusicProjectState } from "@/redux"
import { useMusicPlayList } from "@/hooks"

// 类型
import { ColumnProps } from "antd/lib/table"

// 组件
import MusicDetail from "@/components/MusicDetail";

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

// 样式
const styles: { [propsName: string]: React.CSSProperties } = {
    Table: {
        userSelect: 'none'
    }
};

const FixedPlayer = (props: IProps) => {
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
    const audioRef: MutableRefObject<any> = useRef();
    const audio = audioRef.current as unknown as HTMLMediaElement;

    // 音量控制
    const SoundControl = <Slider vertical defaultValue={30} style={{ height: '100px' }} />;

    // 获取添加到音乐播放列表的歌曲
    const { state, dispatch } = useMusicPlayList();

    // 表格设置
    const columns: ColumnProps<PlayListData>[] = [
        {
            title: () => <span style={{ fontSize: '12px', color: '#d2d2d2' }}>序号</span>,
            dataIndex: 'index',
            width: 50,
            className: 'fz'
        },
        {
            title: () => <span style={{ fontSize: '12px', color: '#d2d2d2' }}>总{dataSource.length}首</span>,
            dataIndex: 'name',
            width: 180,
            className: 'fz',
            render: (text: string) => {
                return <span>{
                    text.length > 8 ? text.substring(0, 8) + '...' : text
                }</span>
            }
        },
        {
            title: () => (
                <span style={{ fontSize: '12px', cursor: 'pointer' }}>
                    <Icon type="folder-add" />{" "}收藏全部
                 </span>
            ),
            dataIndex: 'artist.name',
            width: 110,
            className: 'fz',
            render: (text: string) => {
                return <span>{
                    text.length > 8 ? text.substring(0, 8) + '...' : text
                }</span>
            }
        },
        {
            title: () => (
                <span style={{ fontSize: '12px', cursor: 'pointer' }}
                    onClick={() => dispatch({ type: MUSIC_PROJECT_DELETE })}
                >
                    <Icon type="delete" />{" "}清空
                 </span>
            ),
            dataIndex: 'duration',
            width: 110,
            className: 'fz',
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
    } else {
        dataSource = state.map((item: MusicProjectState, index: number) => {
            return {
                index: index + 1,
                key: item.key,
                name: item.musicName,
                "artist.name": item["artist.name"],
                duration: item.duration
            }
        })
    }

    // 音乐播放列表
    const MusicPlayList = (
        <div className='music-play-list'>
            <div className='button-group'>
                <Button
                    shape='round'
                    type={isPlayList ? 'danger' : 'default'}
                    className='border-shape'
                    onClick={() => setIsPlayList(true)}
                >
                    播放列表
                </Button>
                <Button
                    shape='round'
                    type={!isPlayList ? 'danger' : 'default'}
                    className='border-shape'
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
                    style={styles.Table}
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

    // 点击暂停播放按钮
    function handlePlayClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        // 若 audio 不为 null
        if (audio) {
            // setFlag(!flag)
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

    // 播放器控制条改变的回调函数
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
            audio.addEventListener(
                'loadedmetadata',
                () => {
                    setFlag(true);
                    audio.play()
                }
            );
            // 监听播放时间
            audio.addEventListener(
                'timeupdate',
                () => {
                    setCurrentTime(audio.currentTime * 1000)
                }
            );
            // 播放结束
            audio.addEventListener(
                'ended',
                () => {
                    setFlag(false);
                    audio.pause();
                    // 循环播放单曲
                    setCurrentTime(0);
                    setFlag(true);
                    setTimeout(() => audio.play(), 300)
                }
            );
            audio.addEventListener(
                'abort',
                () => {
                    // console.log(audio.currentSrc)
                }
            )
        }
    }, [audio]);

    // 切换歌曲, 上一首 or 下一首
    useEffect(() => {
        let data;
        if (sessionStorage.getItem('data') && sessionStorage.getItem('data') !== '[]') {
            let sessionData: MusicProjectState[] = JSON.parse(sessionStorage.getItem('data') as string);
            data = sessionData;
        } else {
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
        <div className='fixed-player'>
            <audio ref={audioRef} src={musicMsgState ? musicMsgState.url[0] : ''} />
            <Slider
                disabled={!audio}
                value={currentTime}
                max={musicMsgState ? musicMsgState.duration : undefined}
                tipFormatter={value => formatDuration(value)}
                onChange={onSliderChange}
                style={{
                    position: "absolute",
                    width: '100%',
                    top: '-32px',
                    left: 0,
                }} />
            <Row>
                {
                    audio ? audio.src ?
                        <div>
                            <Col span={1}>
                                <img
                                    src={musicMsgState ? musicMsgState.picUrl : ''}
                                    alt=''
                                    onClick={() => setVisible(!visible)}
                                />
                                <MusicDetail visible={visible} setVisible={setVisible} />
                            </Col>
                            <Col span={7}>
                                {
                                    musicMsgState ?
                                        (
                                            <p>
                                                <span className='music-name'>
                                                    {
                                                        musicMsgState.name.length >= 10 ?
                                                            musicMsgState.name.substring(0, 10) + '...' :
                                                            musicMsgState.name
                                                    }
                                                </span>
                                                {" "}-{" "}
                                                <span className='music-value' style={{ color: 'rgb(128, 128, 128)' }}>
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
                                    <span className='music-value' style={{ color: 'rgb(180, 180, 180)' }}>
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
                <Col span={8} className='music-control'>
                    <Icon type='heart'
                        className={like ? 'music-control-icon music-control-color' : 'music-control-icon'}
                        theme={like ? "filled" : undefined}
                        style={{ fontSize: '18px' }}
                        onClick={() => setLike(!like)}
                    />
                    <Icon type="step-backward"
                        className='music-control-icon music-control-color'
                        style={{ fontSize: '24px' }}
                        onClick={() => {
                            if (musicMsgState) {
                                setListIndex(musicMsgState["list.index"] - 1)
                            }
                        }}
                    />
                    <Icon type={flag ? "pause-circle" : "play-circle"} theme="filled"
                        className='music-control-icon music-control-color'
                        style={{ fontSize: '40px' }}
                        onClick={handlePlayClick}
                    />
                    <Icon type="step-forward"
                        className='music-control-icon music-control-color'
                        style={{ fontSize: '24px' }}
                        onClick={() => {
                            if (musicMsgState) {
                                setListIndex(musicMsgState["list.index"] + 1)
                            }
                        }}
                    />
                    <IconFont type='icon-share'
                        className='music-control-icon'
                        style={{ fontSize: '18px' }} />
                </Col>
                <Col span={4} />
                <Col span={4} className='music-list'>
                    <IconFont type='icon-xindong' className='music-list-icon' />
                    <Popover content={MusicPlayList} placement='top' trigger="click">
                        <IconFont type='icon-bofangliebiao' className='music-list-icon' />
                    </Popover>
                    <IconFont type='icon-geci' className='music-list-icon' />
                    <Popover content={SoundControl} style={{ height: '100px' }}>
                        <IconFont
                            type={mute ? 'icon-jingyin' : 'icon-shengyin'}
                            className='music-list-icon'
                            onClick={() => setMute(!mute)}
                        />
                    </Popover>
                </Col>
            </Row>
        </div>
    )
};

export default FixedPlayer
