import * as React from 'react'
import { useState } from 'reinspect'
import { useHistory, Link } from 'react-router-dom'
import { Input, Icon, Badge, Popover, Tag, Spin, Row, Col, Modal } from 'antd'

import './Top.scss'
import { useSearchHot } from "@/hooks";

export const Top: React.FC = () => {
    // react-router 提供的 HOOKS
    const history = useHistory();

    // 获取热搜列表
    const { state } = useSearchHot([]);

    // 控制是否全屏
    const [isFull, setIsFull] = useState(false, '是否全屏');

    // 点击显示登陆模态窗
    const [visible, setVisible] = useState(false, '登陆模态窗口')

    // 热搜标签
    const suggestContent = (
        <div style={{ width: '400px' }}>
            <div style={{ marginBottom: '30px' }}>
                <div className='control-panel-suggest-title'>
                    热门搜索
                </div>
                {
                    state.isLoading ? <Spin /> :
                        state.data.map((item, index) => {
                            return (
                                <Tag style={{
                                    margin: '3px 8px 3px 0',
                                    padding: '3px 10px',
                                    borderRadius: '20px'
                                }} key={index}>
                                    <Link to={`/search/${item.searchWord}/1`}>{item.searchWord}</Link>
                                </Tag>
                            )
                        })
                }
            </div>
            <div>
                <div className='control-panel-suggest-title'>
                    搜索历史
                </div>
            </div>
        </div>
    )

    return (
        <div className="control-panel">
            <aside>
                <Row onClick={() => setVisible(true)}>
                    <Col span={16}>
                        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="" />
                        <span style={{ cursor: 'pointer' }}>
                            暮雨1微凉{" "}
                            <Icon type="caret-right" />
                        </span>
                    </Col>
                    <Col span={8}>
                        <Icon className="forward" type="left" onClick={() => history.go(-1)} />
                        <Icon className="go" type="right" onClick={() => history.go(1)} />
                    </Col>
                </Row>
                <Modal visible={visible} onCancel={() => setVisible(false)}>
                    modal
                </Modal>
            </aside>
            <aside>
                <Popover placement="bottom" content={suggestContent} trigger="click">
                    <Input
                        allowClear
                        placeholder="搜索"
                        style={{ width: '200px' }}
                        prefix={<Icon type="search" style={{ color: '#333' }} />}
                        onChange={(e) => console.log(e.target.value)}
                        onPressEnter={event => {
                            const target = event.target as HTMLInputElement;
                            if (target.value) {
                                history.push(`/search/${target.value}/1`)
                            }
                        }}
                    />
                </Popover>
            </aside>
            <aside>
                <Icon className="control-panel-icon" type="setting" />
                {" "}
                <Badge count={90} offset={[-4, 4]}>
                    <Icon className="control-panel-icon" type="mail" />
                </Badge>
                {" "}
                <Icon className="control-panel-icon" type="skin" />
                {" "}
                <Icon
                    className="control-panel-icon"
                    type="switcher"
                    onClick={() => {
                        let doc = document.documentElement as Element;
                        if (!isFull) {
                            doc.requestFullscreen();
                        } else {
                            document.exitFullscreen();
                        }
                        setIsFull(!isFull);
                    }}
                />
            </aside>
        </div>
    )
}


