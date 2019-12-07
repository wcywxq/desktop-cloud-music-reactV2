import React, { useEffect, useRef } from 'react';
import { useState } from 'reinspect';
import { Slider, Row, Col, Tag, Icon, Tooltip, Radio, Spin } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

import { formatDuration, IconFont } from '@/tools';

interface IProps {
  isLoading: boolean
  dataSource: any
  movieUrlsData: any[]
}

export const Video: React.FC<IProps> = (props) => {
  const { isLoading, dataSource, movieUrlsData } = props;

  const [value, setValue] = useState("超 清", "清晰度");
  const [flag, setFlag] = useState(false, '控制视频播放暂停');
  const [currentTime, setCurrentTime] = useState<any>(0, '视频播放当前事件');
  const videoRef = useRef<any>(null);
  const video = videoRef.current as unknown as HTMLVideoElement;

  /**
   * 处理播放暂停的回调
   * @param event 
   */
  function handlePlayClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    const video = videoRef.current as unknown as HTMLVideoElement;
    if (video) {
      if (video.src) {
        if (video.paused) {
          setFlag(true);
          video.play();
        } else {
          setFlag(false);
          video.pause();
        }
      }
    }
  }

  /**
   * 进度条控制回调函数
   * @param value 
   */
  function onSliderChange(value: any) {
    video.currentTime = value / 1000;
    setCurrentTime(value);
  }

  // 初始化立即播放
  useEffect(() => {
    const video = videoRef.current as unknown as HTMLVideoElement;
    if (video) {
      // 客户端开始请求数据，直接将播放时间设置为0 
      video.addEventListener('loadstart', () => {
        setCurrentTime(0);
      })
      // 元数据已加载
      video.addEventListener('loadedmetadata', () => {
        setFlag(true);
        video.play();
      })
    }
  })

  // 监听 video 事件
  useEffect(() => {
    if (video) {
      console.log(video)
      // 监听播放事件
      video.addEventListener('timeupdate', () => {
        setCurrentTime(video.currentTime * 1000);
      })
    }
  }, [video])

  return (
    <div
      className="m-video f-pr f-cp s-bgc-black"
    // onClick={handlePlayClick}
    >
      {isLoading ? <Spin className="s-cl-white" /> :
        <>
          {
            movieUrlsData.length !== 0 ?
              <video ref={videoRef} src={movieUrlsData[0].url} width={'100%'} height={'100%'} onClick={handlePlayClick} /> :
              null
          }
          <Row className="f-pa f-fz12 progress-content">
            <Col span={6}>
              <Tag color="geekblue" className="f-cp">
                <span className="s-cl-gray">
                  {formatDuration(currentTime)}
                </span>
                <span className="s-cl-darkgray">{" "}/{" "}</span>
                <span className="s-cl-darkgray">{
                  formatDuration(dataSource.durationms)
                }</span>
              </Tag>
            </Col>
            <Col span={12} />
            <Col span={6} className="f-dg f-gs-pg f-tac s-cl-white">
              <span className="f-pr f-cp item">
                <Tooltip title={<Slider vertical defaultValue={30} max={100} style={{ height: '100px' }} />} >
                  <IconFont type='icon-shengyin-white' />
                </Tooltip>
              </span>
              <span className="f-pr f-cp item">
                <Tooltip
                  trigger="click"
                  title={
                    <Radio.Group
                      defaultValue="超 清"
                      // buttonStyle="solid"
                      value={value}
                      size="small"
                      onChange={(event: RadioChangeEvent) => {
                        setValue(event.target.value);
                      }}
                    >
                      {["1080P", "超 清", "高 清", "标 清"].map((item: string, index: number) => {
                        return (
                          <Radio.Button
                            className="f-db s-bgc-black s-cl-white s-bc-black"
                            value={item}
                            key={index}
                            style={{ width: '72px' }}
                          >
                            <div className="f-df f-jc-center f-ai-center f-fz12 f-fwb">
                              <span style={{ flex: 1 }}>
                                {value === item ? <Icon type="check" /> : null}
                              </span>{" "}
                              <span style={{ flex: 2 }}>{item}</span>
                            </div>
                          </Radio.Button>
                        )
                      })}
                    </Radio.Group>
                  }
                >
                  {value}
                </Tooltip>
              </span>
              <span className="f-pr f-cp item">
                <Icon type="arrows-alt" className="scale" />
              </span>
            </Col>
          </Row>
          <Slider
            className="f-pa progress-bar"
            value={currentTime}
            max={dataSource.durationms}
            tipFormatter={value => formatDuration(value)}
            onChange={onSliderChange}
          />
          {/* 暂停播放控制 */}
          {
            flag ? null :
              <Icon
                type="play-circle"
                theme="filled"
                className="f-pa f-fz40 s-cl-default paused"
                onClick={handlePlayClick}
              />
          }
        </>
      }
    </div>
  )
}