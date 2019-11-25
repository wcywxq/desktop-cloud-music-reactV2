import * as React from 'react'
import { Icon, Row, Col } from 'antd'
import { Link } from 'react-router-dom'

import './RecommandWidget.scss'

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
  props.recommendSongList.unshift({
    picUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAUzSURBVHjavFdbbFRVFF3nPjoz7dTWTittaW0jUDRAUqaNojyqREnEQKgfUj9MqqAmhqRt/OCD4CuY+Kckoh+aiGKC+gMJbdHoRysJ8dkhhmJLNdDKtJU+6GMK87j3Hs85d2Z6HzNtMYWb3Dn3NWftvfba+5xNYDl+e6Fkj6yqb/oDRbWq14vlPBLRKCITkxf0ROLt+hNjp1PPSRK4kA3vF1dXNRcWlyA2OQU9eos9opAkAiKxD+XkKO6t15aRWO7J/MgmAZU8MEgexgZHMX518Dh72sYMmVKShnxWuWHdHtxKIDIYTgMuDzgfmSOIQkYMpdUF8OY92Hytt4/jvkg47czzU16iQovM3QFwmNck+Yyduu7D6NA0Z6JR4THntFs9V4tWQg6Ui3s6MwKDncsFTnXKLJhDSeUK3AgPtyhccDzmVs999buRt/1Vm4i0od+hX7+MRG87jPGB/w1u8FPj9xEw7McVrnYuOCvtpjTth3J/nTg99c8LRhKhr6D3dTB5R24bXFwbMXBsyZzeoXaycEpJ95TB09AGX/NpqLVNtw8urnVzLvHjFNxiFqRy2OOHuqUVnue+ACkoWzo4O6lGzTmuHq6nPvY2m9rVqjrIK2rMEKxqyG5NPAKt+wjo0LklgfNxJkZMA3KJvqRUk3z5UFY3QH14P0h+WUY79HPvgv7VuSg4ZRGY1YgZgqXmORccF17sy2ehnf9AeO085K2HQFbtXBScj0LcpgF2cN+WV+DZ/LJQu6gD4R7oV7pBJwbSgtMvfiPoVp56DySwxm7EtkMs1WdAB7qzggsDJKQYsHucSkOudrkiCPWR/fA2nYCn8SNIK4NptSMyAu3sAdDRkIsJdfth0LzSrODUoPNZ4KI9SxJI5UHk7D4GdQfz2us31c7CoHMjRkKuDPHseCMrONVhNcDJwMJpKFVvg9L4OaTiNWm1x789KCqkrXhVBiEz0WYCT2nAzQAD1/vaETv1GrRfP4Vx5cfMNcDPwvP0h0DhanPym7OIf/+O67vcJ1/PCJ4KgdzaUP6Wz+dU+5yIL6fV+PsHGAOdwlPpvvUOyeeAVGyCdqkDNB6DPjsBSrnndfOGevOh3RhGItxvA+fX1CtbGFhgYUFkFMZPR6F1HnClHq8HyubWtJexX06CRmdt33hrd7nA7SFY4qoGpnYuOKcRykPPgDCBcsHx9Iv+fNL2PueBehCWUfYQIIMGLOCcOmXDXsh1+yCt35tUPfvzGFuSvzvoinXOxqa02qOhM6733nVP2MAdaej2XN11DPKjLZCD+yBvahGCo7JfTKAN9UD7s8Oe9zUNIhz8fWI8DG2k38WCFdxugANcXrvTVd1IEbuv3Jour7Hzn7jLMBNfKs7R3i67gRVrbeCOEDhinmWhAatsqdquM2XzHZINhK2cqTjHr/XZdVJUbgN3MWAVXKbSyg9jesRW2xP9di+lwrL5ojM3m2H/kG9hwcIA37c71W6wJdW2J2S5nrjYbq/t1AHAhJsKQeyfPvf6IMJgghPJhFZ4x0KlfLFvt22du45Au/A1SOlGc0P672XXwhLtOcM0kTTEMMd0qkVmMNXxMd/tsedUjInr4SQDgOfeXMSiN0FCL5WHah4L1qqYXPJOJlttd+a5M+YpcG5poLYKQ5f+6JJ4r8bbJYP47hq4r7QAs9PjYNhHJd4o8l5taiwuOpa7AS4XKqI/5NjJbTnaWK92nLdLuhQAJayRNMiygXPBeQN+Qbvu0zDc3y+aUzhbkGR73sI7ljvUnndx2q3t+X8CDAD66FtrIL864AAAAABJRU5ErkJggg==',
    name: '每日歌曲推荐'
  })
  console.log(props.exclusiveBroadcast.length)
  return (
    <div>
      <RecommandWidgetTitle text='推荐歌单' routerLink='/' />
      <div className="recommendSongList">
        {props.recommendSongList.map((item: any, index: number) => {
          return (
            <div className="recommendSongList-item" key={index}>
              <img src={item.picUrl} alt="" style={{ width: '180px', height: '180px', borderRadius: '10px' }} />
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
                  <img src={item.song.album.picUrl} alt="" style={{ width: '60px', height: '60px', borderRadius: '5px' }} />
                </Col>
                <Col span={1} style={{ fontSize: '12px', color: 'rgb(195, 195, 195)' }}>
                  <span>{(index + 1).toString().padStart(2, '0')}</span>
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