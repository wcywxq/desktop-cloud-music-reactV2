import * as React from 'react';
import { Row, Col, Icon } from 'antd';
import { Link, useHistory } from 'react-router-dom';

interface IProps {
  related: any[]
}

export const Related: React.FC<IProps> = props => {
  const { related } = props;

  const history = useHistory();

  return (
    <div>
      {related.map((item, index) => {
        return (
          <Row
            key={index} 
            className="f-cp"
            style={{ marginBottom: '15px' }}
            onClick={() => history.push(`/video-detail/${item.vid}`)}
          >
            <Col span={12}>
              <div className="f-pr" style={{ width: '140px', height: '80px' }}>
                <img src={item.coverUrl} alt=""
                  style={{ width: '100%', height: '100%', borderRadius: '10px' }}
                />
                <span className="f-pa f-fz12 s-cl-white" style={{ top: '3px', right: '8px' }}>
                  <Icon type="caret-right" />{" "}
                  81万
              </span>
                <span className="f-pa f-fz12 s-cl-white" style={{ bottom: '3px', right: '8px' }}>
                  09:17
              </span>
              </div>
            </Col>
            <Col span={12}>
              <span className="f-fz12 f-fwb s-cl-black">{item.title}</span><br />
              <span className="f-fz12 s-cl-gray">
                by{" "}
                <Link to={`/${item.creator[0].userId}`} className="s-cl-darkgray">
                  {item.creator[0].userName}
                </Link>
              </span>
            </Col>
          </Row>
        )
      })}
    </div>
  )
}