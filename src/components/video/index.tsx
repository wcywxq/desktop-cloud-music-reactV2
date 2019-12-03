import * as React from 'react';
import { useState } from 'reinspect';
import { Slider, Row, Col, Tag, Icon, Tooltip, Radio, Spin } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

import { formatDuration, IconFont } from '@/tools';

interface IProps {
  isLoading: boolean
  isError: boolean
  dataSource: any
  movieUrlsData: any[]
}

export const Video: React.FC<IProps> = (props) => {
  const { isLoading, isError, dataSource, movieUrlsData } = props;

  const [value, setValue] = useState("超 清", "清晰度");

  return (
    <div className="m-video f-pr s-bgc-black">
      {isLoading ? <Spin className="s-cl-white" /> :
        <>
          {
            movieUrlsData.length !== 0 ?
              <video src={movieUrlsData[0].url} width={'100%'} height={'100%'} /> :
              null
          }
          <Row className="f-pa f-fz12 progress-content">
            <Col span={6}>
              <Tag color="geekblue" className="f-cp">
                <span className="s-cl-gray">00:03</span>
                <span className="s-cl-darkgray">{" "}/{" "}</span>
                <span className="s-cl-darkgray">{
                  formatDuration(dataSource.durationms)
                }</span>
              </Tag>
            </Col>
            <Col span={12} />
            <Col span={6} className="f-dg f-gs-pg f-tac s-cl-white">
              <span className="f-pr f-cp item">
                <Tooltip
                  title={
                    <Slider
                      vertical
                      defaultValue={30}
                      max={100}
                      style={{ height: '100px' }}
                    />
                  }
                >
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
          <Slider defaultValue={30} className="f-pa progress-bar" />
        </>
      }
    </div>
  )
}