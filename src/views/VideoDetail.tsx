import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {  Row, Col, Icon } from 'antd';

import { useVideoDetail } from '@/hooks';
import { Video } from '@/components/video';

const VideoDetail: React.FC = () => {
    const { id } = useParams();
    const history = useHistory();

    /**
     * 获取 setVid 方法，用来传递 videoid 的值，用来发起请求
     */
    const { videoDetailState, setVid } = useVideoDetail();

    useEffect(() => {
        if (id) {
            setVid(id);
        }
    }, [id, setVid]);

    return (
        <div style={{ margin: '10px 255px 0' }}>
            <Row>
                <Col span={16}>
                    <p className="f-fz16 f-fwb">
                        <Icon type="left" className="u-icon u-icon-forward f-fz14" onClick={() => history.go(-1)} />视频详情
                    </p>
                    <Video {...videoDetailState} />
                </Col>
                <Col span={8}>
                    <p className="f-fz16 f-fwb">
                        相关推荐
                    </p>
                </Col>
            </Row>
        </div>
    )
};

export default VideoDetail
