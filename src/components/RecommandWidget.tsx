import * as React from 'react'
import { Icon, Row, Col } from 'antd'
import { Link } from 'react-router-dom'

import './RecommandWidget.scss'

import { getWeekDay, getDay } from '@/tools'

interface RecommandWidgetTitleProps {
  text: string,
  routerLink: string
}

interface IProps {
  recommendSongList: any[];
  exclusiveBroadcast: any[];
  newSong: any[];
  recommendMv: any[];
  djprogram: any[];
}

// 推荐部分标题
const RecommandWidgetTitle = (props: RecommandWidgetTitleProps) => (
  <Link to={props.routerLink} style={{ color: "#333" }}>
    <span style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '5px' }}>{props.text}</span>
    <Icon type="right" />
  </Link>
)

const RecommandWidget = (props: IProps) => {
  return (
    <div>
      <RecommandWidgetTitle text='推荐歌单' routerLink='/' />
      <div className="recommendSongList">
        <div className="recommendSongList-item">
          <div className="img img-first imgBox">
            <span className="top">根据您的音乐口味生成每日更新</span>
            <span className="weekDay">星期{getWeekDay()}</span>
            <span className="day">{getDay()}</span>
            <Icon type="play-circle" theme="filled" className="icon" />
          </div>
          <p style={{ paddingTop: '5px', fontSize: '12px' }}>每日歌曲推荐</p>
        </div>
        {props.recommendSongList.map((item: any, index: number) => {
          return (
            <div className="recommendSongList-item" key={index}>
              <div className="imgBox">
                <img src={item.picUrl} alt="" className="img" />
                <Icon type="play-circle" theme="filled" className="icon" />
              </div>
              <p style={{ paddingTop: '5px', fontSize: '12px' }}>{item.name}</p>
            </div>
          )
        })}
      </div>
      <RecommandWidgetTitle text='独家放送' routerLink='/' />
      <div className="exclusiveBroadcast">
        {props.exclusiveBroadcast.map((item: any, index: number) => {
          return (
            <div className="exclusiveBroadcast-item" key={index}>
              <img src={item.sPicUrl} alt="" style={{ width: '250px', height: '140px', borderRadius: '5px' }} />
              <Icon type="play-circle" theme="filled" className="icon" />
              <p style={{ paddingTop: '5px', fontSize: '12px' }}>{item.name}</p>
            </div>
          )
        })}
      </div>
      <RecommandWidgetTitle text='最新音乐' routerLink='/' />
      <div className="newSong">
        {props.newSong.map((item: any, index: number) => {
          return (
            <div className="newSong-item" key={index}>
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col span={3}>
                  <img src={item.song.album.picUrl} alt="" style={{ width: '100%', height: '100%', borderRadius: '5px' }} />
                  <Icon type="play-circle" theme="twoTone" className="icon" />
                </Col>
                <Col span={2} style={{ fontSize: '12px', color: 'rgb(195, 195, 195)' }}>
                  <span style={{ marginLeft: '10px' }}>{(index + 1).toString().padStart(2, '0')}</span>
                </Col>
                <Col span={8}>
                  <span className="music-name">{item.name}</span><br />
                  <span className="artist-name">{item.song.artists[0].name}</span>
                </Col>
              </Row>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecommandWidget