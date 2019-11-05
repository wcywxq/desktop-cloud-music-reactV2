// MutableRefObject 泛型接口，接收一个参数，作为 useRef 的类型定义,参数可以为T类型，即任意类型
import React, { useRef, MutableRefObject, useEffect } from "react"
import { useState } from 'reinspect'
import { Row, Col, Button, Icon, Slider, Popover, Table } from 'antd'

import './FixedPlayer.scss'

import { IconFont, formatDuration } from '@/tools'

// 删除
import { MUSIC_PROJECT_DELETE } from "@/redux/constants";
import { MusicProjectState } from "@/redux";
import { useMusicMessage, useMusicPlayList } from "@/hooks";

const FixedPlayer: React.FC = () => {
    const [like, setLike] = useState(false, '是否喜欢')
    const [flag, setFlag] = useState(false, '控制播放暂停')
    const [mute, setMute] = useState(false, '是否静音')
    const [isPlayList, setIsPlayList] = useState(true, '是否是播放音乐列表，否则是历史记录列表')

    // 获取添加到音乐播放列表的歌曲
    const { state, dispatch } = useMusicPlayList()

    // 获取音乐信息, 包括url
    const { musicMsgState } = useMusicMessage();

    // 音量控制
    const SoundControl = <Slider vertical defaultValue={30} style={{ height: '100px' }} />

    // 表格设置
    const columns = [
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
            dataIndex: 'artist',
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
        }
    ];

    // 播放列表数据渲染
    let dataSource;

    // 利用 sessionStorage 来获取数据
    if (sessionStorage.getItem('data') && sessionStorage.getItem('data') !== '[]') {
        let sessionData = JSON.parse(sessionStorage.getItem('data') as string)
        dataSource = sessionData.map((item: MusicProjectState) => {
            return {
                key: item.key,
                name: item.musicName,
                artist: item.artist,
                duration: item.duration
            }
        })
    } else {
        dataSource = state.map((item: MusicProjectState) => {
            return {
                key: item.key,
                name: item.musicName,
                artist: item.artist,
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
                // onChange={onHandleChange}
                />
            </div>
        </div>
    )

    // 播放控制部分
    const audioRef: MutableRefObject<any> = useRef()
    const audio = audioRef.current as unknown as HTMLMediaElement

    // 点击暂停播放按钮
    const handlePlayClick: React.MouseEventHandler<HTMLElement> = () => {
        // 若 audio 不为 null
        if (audio) {
            // setFlag(!flag)
            // 若有src源文件
            if (audio.src) {
                // 播放暂停控制
                if (audio.paused) {
                    setFlag(true)
                    audio.play()
                } else {
                    setFlag(false)
                    audio.pause()
                }
            }
        }
    }

    // 播放时间控制
    const [currentTime, setCurrentTime] = useState<any>(0, '当前时间')

    useEffect(() => {
        if (audio) {
            // 元数据已加载
            audio.addEventListener(
                'loadedmetadata',
                () => {
                    setFlag(true)
                    audio.play()
                }
            )
            // 监听播放时间
            audio.addEventListener(
                'timeupdate',
                () => {
                    console.log(audio.currentTime)
                    setCurrentTime(audio.currentTime * 1000)
                },
                false
            )
            // 播放结束
            audio.addEventListener(
                'ended',
                () => {
                    setFlag(false)
                    audio.pause()
                    // 循环播放单曲
                    setCurrentTime(0)
                    setFlag(true)
                    audio.play()
                }
            )
        }
    }, [audio])

    // 控制条改变的回调函数
    const onSliderChange = (value: any) => {
        // 将进度条的值赋予给 audio 播放的当前时间
        audio.currentTime = value / 1000
        // 将当前播放时间传递给 state
        setCurrentTime(value)
    }

    // // 成功获取资源长度的回调，刚获取完元数据的回调
    // audio.addEventListener(
    //     "loadedmetadata",
    //     () => {
    //         this.iconTab = false;
    //     },
    //     false
    // );
    // // 播放结束的回调
    // audio.addEventListener(
    //     "ended",
    //     () => {
    //         this.iconTab = false;
    //     },
    //     false
    // );

    // 渲染
    return (
        <div className='fixed-player'>
            <audio ref={audioRef} src={musicMsgState.url[0]} />
            <Slider
                disabled={!audio}
                value={currentTime}
                max={musicMsgState.duration}
                tipFormatter={value => formatDuration(value)}
                onChange={onSliderChange}
                // onAfterChange={val => console.log(val)}
                // onChange={val => {
                //     // setCurrentTime(val)
                //     // console.log(audio.currentTime)
                //     // val = Math.ceil(currentTime * 1000)
                // }}
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
                                    src={musicMsgState.picUrl}
                                    alt={musicMsgState.name} />
                            </Col>
                            <Col span={3}>
                                <p>
                                    <span className='music-name'>{musicMsgState.name}</span>
                                    {" "}-{" "}
                                    <span className='music-value' style={{ color: 'rgb(128, 128, 128)' }}>
                                        {musicMsgState.artist.join(' / ')}
                                    </span>
                                </p>
                                <p>
                                    <span className='music-value' style={{ color: 'rgb(180, 180, 180)' }}>
                                        {formatDuration(currentTime)} / {formatDuration(musicMsgState.duration)}
                                    </span>
                                </p>
                            </Col>
                        </div>
                        : <Col span={4} /> : <Col span={4} />
                }
                <Col span={4} />
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
                    />
                    <Icon type={flag ? "pause-circle" : "play-circle"} theme="filled"
                        className='music-control-icon music-control-color'
                        style={{ fontSize: '40px' }}
                        onClick={handlePlayClick}
                    />
                    <Icon type="step-forward"
                        className='music-control-icon music-control-color'
                        style={{ fontSize: '24px' }} />
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
}

export default FixedPlayer
