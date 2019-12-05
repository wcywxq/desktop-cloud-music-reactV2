import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, Icon } from 'antd';

import { useVideoDetail } from '@/hooks';
import { Video, Explain, Related } from '@/components/video';
import { TextField, CommentList } from '@/components/comment';

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
                    {/* 视频 */}
                    <Video {...videoDetailState} />
                    {/* 说明内容 */}
                    <Explain {...videoDetailState} />
                    {/* 评论文本域 */}
                    <TextField {...videoDetailState} />
                    {/* 精彩评论 */}
                    {
                        videoDetailState.hotComments.length === 0 ? null :
                            <CommentList title="最新评论" isLoading={videoDetailState.isLoading} data={videoDetailState.hotComments} />
                    }
                    {/* 最新评论 */}
                    <CommentList title="最新评论" isLoading={videoDetailState.isLoading} data={videoDetailState.comments} />
                </Col>
                <Col span={8}>
                    <p className="f-fz16 f-fwb">
                        相关推荐
                    </p>
                    <Related {...videoDetailState} />
                </Col>
            </Row>
        </div>
    )
};

export default VideoDetail
