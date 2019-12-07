import React, { useEffect } from 'react';
import { useState } from 'reinspect';
import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, Icon, Pagination, ConfigProvider, Switch } from 'antd';
import moment from 'moment';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

import { useVideoDetail, useCommentsDetail } from '@/hooks';
import { Video, Explain, Related, PluginPlayer } from '@/components/video';
import { TextField, CommentList } from '@/components/comment';

moment.locale('zh-cn');

const VideoDetail: React.FC = () => {
    const { id } = useParams();
    const history = useHistory();

    const { detailState, setVid } = useVideoDetail();
    const { commentState, setParams } = useCommentsDetail()

    const [current, setCurrent] = useState(1, "分页器当前页码");
    // 切换视频组件
    const [checked, setChecked] = useState(false, "切换视频组件");

    /**
     * 初始化，将页面id传递，同时将的分页器的默认值修改为第1页
     */
    useEffect(() => {
        if (id) {
            setVid(id);
            setParams({ id });
            setCurrent(1);
        }
    }, [id, setParams, setVid]);

    return (
        <div style={{ margin: '10px 255px 0' }}>
            <Row>
                <Col span={16}>
                    <p className="f-fz16 f-fwb f-df f-ai-center">
                        <Icon type="left" className="u-icon u-icon-forward f-fz14" onClick={() => history.go(-1)} />视频详情{" "}
                        <Switch defaultChecked size="small" style={{ marginLeft: '10px' }} checked={checked} onChange={val => { setChecked(val) }} />
                    </p>
                    {/* 视频 */}
                    {
                        checked ?
                            <PluginPlayer {...detailState} /> :
                            <Video {...detailState} />
                    }
                    {/* 说明内容 */}
                    <Explain {...detailState} />
                    {/* 评论文本域 */}
                    <TextField {...detailState} />
                    {/* 精彩评论 */}
                    {
                        Object.keys(commentState.comments).includes("hotComments") ?
                            commentState.comments.hotComments.length === 0 ? null :
                                <CommentList
                                    title="精彩评论"
                                    isLoading={commentState.isLoading}
                                    data={commentState.comments.hotComments}
                                    total={commentState.comments.hotComments.length}
                                /> : null
                    }
                    {/* 最新评论 */}
                    <CommentList
                        title="最新评论"
                        isLoading={commentState.isLoading}
                        data={commentState.comments.comments}
                        total={commentState.comments.total}
                    />
                    {/* 加上国际化 */}
                    <ConfigProvider locale={zhCN}>
                        <Pagination
                            className="f-fz12 f-tac"
                            size="small"
                            hideOnSinglePage
                            showQuickJumper
                            total={commentState.comments.total}
                            showTotal={total => <span>共 {total} 条</span>}
                            pageSize={20}
                            current={current}
                            style={{ marginBottom: '30px' }}
                            onChange={page => {
                                setCurrent(page);
                                if (id) {
                                    setParams({ id, limit: 20, offset: (page - 1) * 20 });
                                }
                            }}
                        />
                    </ConfigProvider>
                </Col>
                <Col span={8}>
                    <p className="f-fz16 f-fwb">
                        相关推荐
                    </p>
                    <Related {...detailState} />
                </Col>
            </Row>
        </div>
    )
};

export default VideoDetail
