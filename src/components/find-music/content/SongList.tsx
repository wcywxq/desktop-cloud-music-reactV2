import * as React from 'react';
import { Icon } from 'antd';
import { getWeekDay, getDay } from '@/tools';

// 推荐歌单
export const SongList: React.FC<{ data: any }> = (props) => (
    <div className="recommendSongList">
        <div className="recommendSongList-item">
            <div className="img img-first imgBox">
                <span className="top">根据您的音乐口味生成每日更新</span>
                <span className="weekDay">星期{getWeekDay()}</span>
                <span className="day">{getDay()}</span>
                <Icon type="play-circle" theme="filled" className="icon"/>
            </div>
            <p style={{ paddingTop: '5px', fontSize: '12px' }}>每日歌曲推荐</p>
        </div>
        {props.data.map((item: any, index: number) => {
            return (
                <div className="recommendSongList-item" key={index}>
                    <div className="imgBox">
                        <span className="amount">
                            <Icon type="caret-right"/>{" "}
                            {
                                item.playCount.toString().length > 4 ?
                                    item.playCount.toString().substring(0, item.playCount.toString().length - 4) + '万' :
                                    item.playCount.toString()
                            }
                        </span>
                        <img src={item.picUrl} alt="" className="img"/>
                        <Icon type="play-circle" theme="filled" className="icon"/>
                    </div>
                    <p style={{ paddingTop: '5px', fontSize: '12px' }}>{item.name}</p>
                </div>
            )
        })}
    </div>
);
