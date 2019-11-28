import React, { useEffect } from 'react'
import { useState } from 'reinspect'
import { Icon, Row, Col } from 'antd'
import { Link } from 'react-router-dom'

import { compare } from '@/tools'
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
  sortElement: { k: number, v: string }[];
}

interface ArrElementTypes {
  keywords: number
  titleELement: JSX.Element
  contentElement: JSX.Element
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
        <div className="djprogram-item" key={index}>
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
  /**
   * 控制渲染页面的对象数组方法
   * @param arr 
   * @param props 
   * @returns ArrElementTypes[] | any
   */
  function arrELement(arr: ArrElementTypes[] | any, props?: IProps) {
    return arr;
  }

  const [showElement, setShowElement] = useState(arrELement([]), '元素排列方式')

  useEffect(() => {
    let initialArr = [
      {
        keywords: 0,
        titleELement: <RecommandWidgetTitle text='推荐歌单' routerLink='/' />,
        contentElement: <RecommendSongList data={props.recommendSongList} />
      },
      {
        keywords: 1,
        titleELement: <RecommandWidgetTitle text='独家放送' routerLink='/' />,
        contentElement: <ExclusiveBroadcast data={props.exclusiveBroadcast} />
      },
      {
        keywords: 2,
        titleELement: <RecommandWidgetTitle text='最新音乐' routerLink='/' />,
        contentElement: <NewSong data={props.newSong} />
      },
      {
        keywords: 3,
        titleELement: <RecommandWidgetTitle text='推荐MV' routerLink='/' />,
        contentElement: <RecommandMv data={props.recommendMv} />
      },
      {
        keywords: 4,
        titleELement: <RecommandWidgetTitle text='主播电台' routerLink='/' />,
        contentElement: <Djprogram data={props.djprogram} />
      },
    ];

    /**
     * 赋值条件，若由子组件传递过来的数据的 data-index 与初始数组的 keywords 不同， 则将初始数组的 keywords 改变
     */
    props.sortElement.forEach((item, index) => {
      if (Number(item.k) !== initialArr[index].keywords) {
        initialArr[index].keywords = Number(item.k);
      }
    })

    /**
     * 通过 compare 方法对数组对象进行排序
     */
    initialArr.sort(compare("keywords"));

    /**
     * 改变初始化数组的方法，同时在页面 dom 元素全部加载完毕之后将父组件传递过来的 props 数据传递给封装好的 arrElement 函数，
     * 如果不传递 props 直接使用，则无法获取相应的 props
     */
    setShowElement(arrELement(initialArr, props));
  }, [props])

  return (
    <div>
      {showElement.map((item: ArrElementTypes, index: number) => {
        return (
          <div key={index}>
            {item.titleELement}
            {item.contentElement}
          </div>
        )
      })}
    </div>
  )
}