import * as React from 'react';
import { Icon } from 'antd';
import { getWeekDay, getDay } from '@/tools';

// 推荐歌单
export const SongList: React.FC<{ data: any }> = (props) => (
    <div className="f-dg f-tac f-cp recommendSongList">
        <div className="recommendSongList-item">
            <div className="f-df f-pr f-oh f-jc-center img img-first imgBox">
                <span className="f-pa f-oh f-fz12 s-cl-white top">根据您的音乐口味生成每日更新</span>
                <span className="f-fz20 s-cl-white">星期{getWeekDay()}</span>
                <span className="f-fz24 f-fwb s-cl-default">{getDay()}</span>
                <Icon type="play-circle" theme="filled" className="f-pa f-fz32 s-cl-default icon"/>
            </div>
            <p style={{ paddingTop: '5px', fontSize: '12px' }}>每日歌曲推荐</p>
        </div>
        {props.data.map((item: any, index: number) => {
            return (
                <div className="recommendSongList-item" key={index}>
                    <div className="f-pr f-oh imgBox">
                        <span className="f-pa f-fz12 f-fwb s-cl-white amount">
                            <Icon type="caret-right"/>{" "}
                            {
                                item.playCount.toString().length > 4 ?
                                    item.playCount.toString().substring(0, item.playCount.toString().length - 4) + '万' :
                                    item.playCount.toString()
                            }
                        </span>
                        <img src={item.picUrl} alt="" className="img"/>
                        <Icon type="play-circle" theme="filled" className="f-pa f-fz32 s-cl-default icon"/>
                    </div>
                    <p style={{ paddingTop: '5px', fontSize: '12px' }}>{item.name}</p>
                </div>
            )
        })}
    </div>
);
