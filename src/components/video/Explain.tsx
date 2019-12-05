import * as React from 'react';
import { Row, Col, Button, Icon } from 'antd';

import { format } from '@/tools';

interface IProps {
  dataSource: any
}

export const Explain: React.FC<IProps> = (props) => {
  const { dataSource } = props;

  return (
    <div className="m-explain">
      <Row className="f-df f-ai-center start">
        <Col span={18} className="f-fz12 img-box">
          {
            dataSource.creator ?
              <>
                <img src={dataSource.creator.avatarUrl} alt="" />
                <span>{dataSource.creator.nickname}</span>
              </>
              : null
          }
        </Col>
        <Col span={6} className="attention-box">
          <Button
            type="link"
            className="f-fz12 s-bgc-mistyrose attention-btn"
            icon="plus"
          >
            <span>关注</span>
          </Button>
        </Col>
      </Row>
      <Row className="middle">
        <Col span={24}>
          <h2>{dataSource.title}</h2>
          <span className="f-fz12 s-cl-lightgray publish-time">发布：{format(dataSource.publishTime, 'YYYY-MM-DD')}</span>
          <span className="f-fz12 s-cl-lightgray">播放：{dataSource.playTime}次</span>
        </Col>
      </Row>
      <Row className="end">
        <Col span={21} className="btn-box">
          <Button className="u-btn u-btn-comment f-fz12">
            <Icon type="like" className="f-fz16 icon" /> 赞（{151}）
            </Button>
          <Button className="u-btn u-btn-comment f-fz12">
            <Icon type="folder-add" className="f-fz16 icon" /> 收藏（{136}）
            </Button>
          <Button className="u-btn u-btn-comment f-fz12">
            <Icon type="share-alt" className="f-fz16 icon" /> 分享（{14}）
          </Button>
        </Col>
        <Col span={3} className="btn-box">
          <Button type="link" className="f-fz12 s-cl-gray">举报</Button>
        </Col>
      </Row>
    </div>
  )
}