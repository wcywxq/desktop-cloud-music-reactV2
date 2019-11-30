import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, Icon } from 'antd';

import { useVideoDetail } from '@/hooks';

import './VideoDetail.scss';

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
        <div className="video-detail">
            <Row>
                <Col span={16}>
                    <p className="video-detail-title">
                        <Icon type="left" className="back-icon" onClick={() => history.go(-1)}/>视频详情
                    </p>
                    {
                        videoDetailState.movieUrlsData.length !== 0 ?
                            <video src={videoDetailState.movieUrlsData[0].url} controls={true}/> :
                            null
                    }
                </Col>
                <Col span={8}>
                    <p className="video-detail-title">
                        相关推荐
                    </p>
                </Col>
            </Row>
        </div>
    )
};

export default VideoDetail
