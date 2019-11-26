import * as React from 'react'
import { Icon, Row, Col } from 'antd'
import { Link } from 'react-router-dom'

import './Recommand.scss'

import { getWeekDay, getDay, IconFont } from '@/tools'

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

// 推荐歌单
const RecommendSongList = (props: { data: any[] }) => (
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
    {props.data.map((item: any, index: number) => {
      return (
        <div className="recommendSongList-item" key={index}>
          <div className="imgBox">
            <span className="amount">
              <Icon type="caret-right" />{" "}{
                item.playCount.toString().length > 4 ?
                  item.playCount.toString().substring(0, item.playCount.toString().length - 4) + '万' :
                  item.playCount.toString()
              }
            </span>
            <img src={item.picUrl} alt="" className="img" />
            <Icon type="play-circle" theme="filled" className="icon" />
          </div>
          <p style={{ paddingTop: '5px', fontSize: '12px' }}>{item.name}</p>
        </div>
      )
    })}
  </div>
)

// 独家放送
const ExclusiveBroadcast = (props: { data: any[] }) => (
  <div className="exclusiveBroadcast">
    {props.data.map((item: any, index: number) => {
      return (
        <div className="exclusiveBroadcast-item" key={index}>
          <img src={item.sPicUrl} alt="" className="img" />
          <Icon type="play-circle" theme="filled" className="icon" />
          <p style={{ paddingTop: '5px', fontSize: '12px' }}>{item.name}</p>
        </div>
      )
    })}
  </div>
)

// 最新音乐
const NewSong = (props: { data: any[] }) => (
  <div className="newSong">
    {props.data.map((item: any, index: number) => {
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
              <span className="artist-name">
                {item.song.exclusive ?
                  <span className="exclusive">SQ</span> : null
                }{" "}
                {item.song.artists[0].name}
              </span>
            </Col>
            <Col span={9}></Col>
            <Col span={2}>
              {item.song.mvid === 0 ? null :
                <Link to={`/${item.song.mvid}`}>
                  <IconFont type='icon-video' style={{ fontSize: '20px' }} />
                </Link>
              }
            </Col>
          </Row>
        </div>
      )
    })}
  </div>
)

// 推荐 Mv
const RecommandMv = (props: { data: any[] }) => (
  <div className="recommandMv">
    {props.data.map((item: any, index: number) => {
      return (
        <div className="recommandMv-item" key={index}>
          <span className="amount">
            <Icon type="caret-right" />{" "}{
              item.playCount.toString().length > 4 ?
                item.playCount.toString().substring(0, item.playCount.toString().length - 4) + '万' :
                item.playCount.toString()
            }
          </span>
          <span className="top">{item.copywriter}</span>
          <img src={item.picUrl} alt="" className="img" />
          <p className="name">{item.name}</p>
          <p className="artist-name">{item.artistName}</p>
        </div>
      )
    })}
  </div>
)

// 主播电台
const Djprogram = (props: { data: any[] }) => (
  <div className="djprogram">
    {props.data.map((item: any, index: number) => {
      return (
        <div className="djprogram-item">
          <div>
            <img src={item.program.radio.picUrl} alt="" className="img" />
          </div>
          <div>
            <span className="rcmdText">
              {
                item.program.radio.rcmdText ?
                  item.program.radio.rcmdText :
                  item.program.radio.desc
              }
            </span><br />
            <span className="name">{item.program.radio.name}</span>
          </div>
        </div>
      )
    })}
  </div>
)

export const Recommand = (props: IProps) => {
  return (
    <div>
      <RecommandWidgetTitle text='推荐歌单' routerLink='/' />
      <RecommendSongList data={props.recommendSongList} />
      <RecommandWidgetTitle text='独家放送' routerLink='/' />
      <ExclusiveBroadcast data={props.exclusiveBroadcast} />
      <RecommandWidgetTitle text='最新音乐' routerLink='/' />
      <NewSong data={props.newSong} />
      <RecommandWidgetTitle text='推荐MV' routerLink='/' />
      <RecommandMv data={props.recommendMv} />
      <RecommandWidgetTitle text='主播电台' routerLink='/' />
      <Djprogram data={props.djprogram} />
    </div>
  )
}