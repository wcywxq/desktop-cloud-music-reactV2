import * as React from 'react';
import { useState } from 'reinspect';
import { Row, Col, Input, Button } from 'antd';
import { IconFont } from '@/tools';

interface IProps {
  dataSource: any;
}

export const TextField: React.FC<IProps> = (props) => {
  const { dataSource } = props;

  const [inputLength, setInputLength] = useState<number>(0, '输入内容的长度');

  const { TextArea } = Input;

  return (
    <div>
      <Row>
        <Col span={24}>
          <span className="f-fz20 fwb s-cl-black">听友评论</span>
          <span className="f-fz12 s-cl-gray">（已有{dataSource.commentCount}条评论）</span>
        </Col>
      </Row>
      <Row>
        <Col span={24} className="f-pr" style={{ marginTop: '10px' }}>
          <TextArea rows={3} maxLength={140} onChange={event => setInputLength(event.target.value.length)} />
          <span className="f-pa f-fz12 s-cl-gray" style={{ right: '10px', bottom: '10px' }}>{140 - inputLength}</span>
        </Col>
      </Row>
      <Row style={{ margin: '10px auto 30px' }}>
        <Col span={4} className="f-fz18">
          <IconFont type="icon-smile" className="f-cp" style={{ marginRight: '10px' }} />
          <IconFont type="icon-aite" className="f-cp" style={{ marginRight: '10px' }} />
          <IconFont type="icon-number" className="f-cp" />
        </Col>
        <Col span={18} />
        <Col span={2}>
          <Button className="u-btn f-fz12 f-fwb s-cl-black">
            评论
          </Button>
        </Col>
      </Row>
    </div>
  )
}