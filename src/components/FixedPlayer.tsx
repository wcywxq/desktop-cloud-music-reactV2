import * as React from "react"
import { useState } from 'reinspect'
import { Row, Col, Button, Icon, Slider, Popover, Table } from 'antd'

import './FixedPlayer.scss'

import { IconFont } from '@/tools'

// 删除
import { MUSIC_PROJECT_DELETE } from "../redux/constants";
import { MusicProjectState } from "../redux";
import { useMusicPlayList } from "../hooks/useMusicPlayList";

const FixedPlayer: React.FC = () => {
    const [like, setLike] = useState(false, '是否喜欢')
    const [flag, setFlag] = useState(false, '控制播放暂停')
    const [mute, setMute] = useState(false, '是否静音')
    const [isPlayList, setIsPlayList] = useState(true, '是否是播放音乐列表，否则是历史记录列表')

    // 获取添加到音乐播放列表的歌曲
    const { state, dispatch } = useMusicPlayList()

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

    // 渲染
    return (
        <div className='fixed-player'>
            <Slider
                defaultValue={30}
                style={{
                    position: "absolute",
                    width: '100%',
                    top: '-32px',
                    left: 0,
                }} />
            <Row>
                <Col span={1}>
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmCAMAAAAOARRQAAAA4VBMVEUbFRUaFxcwMDAaFRX///8iHh79/f0dGBhUUFDT0tK4t7cwKyuysbHNy8syLS34+PhoZWUrJiYfGhrw8PDu7e3Z2Nivrq6npaVxbm5jYGDe3d3DwsKamJh7eHhtampXU1NCPj76+vr39vbg39/b29vR0NDBv7+Cf39aVlZNSUklICDy8vLq6enk5OTi4eHa2dnHxsa1s7NfW1s0Ly/o6OjV1NS8u7utq6ukoqKem5uSj491cnJdWVlXVFRRTU1IREQ+OTk4NDQuKionIiL09PS2tLSVkpKPjY2Kh4eHhISpp6evBPJsAAAAA3RSTlPmhwVTsZLPAAADoklEQVRo3u3aaVMaMRzHcWx+e7EHN+U+CoigghTv+6hV+/5fUOsITeIsm38WatuZ/T5TGT4SkrAEUp+2UuwPl9r6lNpiH9BWKsU+IJqyfgmTMCyshEmYv8t0WuczZ1LMZIoT5/G80mFs48y4Ut7Du4pe5WGjzE75C0LLeJcbY7IOIiq1rE0w7SkU1S7XZlwPhNLz9ZhqAaS+Zddg8g2QOzXiMuM6NPJz8RjXgVb9eRzGrUGz/bk+M3agXT+ny+TriJFvaDINxOqzHlPl/+Cw4ZuIyBw0hgdY1tJhXL4qv77++HKIFe09B4wxm6/TOw3G41vw22gbQw5nMli2+/L2Z2sXy47pTBu/G7BF9ydmzxtedQLjFxp02sNyzZwFbBEfNVTJzFTYFPlv5Vkk/+IEv5tYRCYLXpmROgWvQmQcaYaSOgOvZpGYHQjVaUwaQlUSU4bQIY3pQ+iYwozlq4tbihJArHtPYCoQ244xaGgSGHnMcjTmoSeNGoGRrvouGLEshHYtJdOBUM9i1I4gNFIyLQg9M3JN6clRMucQuqEztxA6UzIz8ApMo8PV8zMVvdOUdBgfvJ6SmSh2GtLSKSqZInhpHeYEvK6SychDTO8RQnkVI+5ovg6zDSFLxeyDt6/DTKUpqmIG4Jl5MiIPQ03FyI/dpis3EPKVzAmEvtOZZwillUwDQg6dOYDQqZLJQuyOqrhd6fVDybgQ86jMZ/mVXcmwGsRGNKVjShfWTM2cQmxgUBTjQB4DAtOC1DZh7VhpaF9y5L5AKj1WPpYypMyAwLDPkNu/ilbsHuRmTMnw9Vw49peT9NGOQDwT77JJDPOXF/b3Z1hUerLzIaPVPi+FHElpvfEovL4drPKXn8yRJ83uUXraRVgXRMYq8R0tC55vSbeqI7SeQWTY9WK4X+QJcROxJHmXjMbw+zZtxoz+yn10gJA8RmdyRf5sBst7a7B3PYUou64Gw1rCqYDRPDJhlr7Pw28k14x1mHKwmLm5sC1nh3yYory6izpcvMb76pYuYzhvhyPXGkz/Icax3dul1Jfh6n0Gcnt3cQ4hA2dxNfQ0mueN251AwUzvYh6ppiH2NZqpP8Q9ILbOIpm2NMesNY67K8WIw4srYVU21zu8z/3gzOp147lrfxRhLze17Cpmov4oglC+4kQN2tGFwZQMrVG5i4IbssGaM5tt8kMvt30f8sS1X9fSf/pJYcIkTMIkTMJsivlXvqCW+qAv9X3QVxR/AveXsgHzlAQ9AAAAAElFTkSuQmCC"
                        alt="" />
                </Col>
                <Col span={3}>
                    <p>
                        <span className='music-name'>小满</span>
                        {" "}-{" "}
                        <span className='music-value' style={{ color: 'rgb(128, 128, 128)' }}>
                            音阙视听 / 王梓珏
                        </span>
                    </p>
                    <p>
                        <span className='music-value' style={{ color: 'rgb(180, 180, 180)' }}>
                            00:03 / 03:26
                        </span>
                    </p>
                </Col>
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
                        onClick={() => setFlag(!flag)}
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
                    <Popover content={MusicPlayList} placement='top'>
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
