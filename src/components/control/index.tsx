import * as React from 'react'
import { useState } from 'reinspect'
import { useHistory, Link } from 'react-router-dom'
import { Input, Icon, Badge, Popover, Tag, Spin, Row, Col, Avatar } from 'antd'

import { useSearchHot } from "@/hooks";
import { Login, Register } from '@/components/auth';

export const Control: React.FC = () => {
    // react-router 提供的 HOOKS
    const history = useHistory();

    // 获取热搜列表
    const { state } = useSearchHot([]);

    // 控制是否全屏
    const [isFull, setIsFull] = useState(false, '是否全屏');

    // 点击显示登陆模态窗
    const [visible, setVisible] = useState(false, '登陆模态窗口');

    // 热搜标签
    const suggestContent = (
        <div className="m-hot">
            <div className='f-fwb s-cl-black title'>
                热门搜索
            </div>
            <div className='ct'>
                {
                    state.isLoading ? <Spin /> :
                        state.data.map((item, index) => {
                            return (
                                <Tag key={index} className="u-tag-hot">
                                    <Link to={`/search/${item.searchWord}/1`}>{item.searchWord}</Link>
                                </Tag>
                            )
                        })
                }
            </div>
            <div className='f-fwb s-cl-black title'>
                搜索历史
            </div>
        </div>
    );

    return (
        <div className="g-hd f-dg f-ai-center s-bgc-whitesmoke">
            <aside className="f-tar first">
                <Row>
                    <Col span={16} onClick={() => setVisible(true)}>
                        <Avatar className="f-cp img" icon={<Icon type="user" />} />
                        <span className="f-cp">
                            暮雨1微凉{" "}
                            <Icon type="caret-right" />
                        </span>
                    </Col>
                    <Col span={8}>
                        <Icon className="u-icon u-icon-forward f-fz14" type="left" onClick={() => history.go(-1)} />
                        <Icon className="u-icon u-icon-go f-fz14" type="right" onClick={() => history.go(1)} />
                    </Col>
                </Row>
                {/* 登陆 */}
                <Login visible={visible} setVisible={setVisible} />
            </aside>
            <div className="f-js-end">
                <Popover placement="bottom" content={suggestContent} trigger="click">
                    <Input
                        allowClear
                        placeholder="搜索"
                        width={200}
                        prefix={<Icon type="search" className="s-cl-darkgray" />}
                        onChange={(e) => console.log(e.target.value)}
                        onPressEnter={event => {
                            const target = event.target as HTMLInputElement;
                            if (target.value) {
                                history.push(`/search/${target.value}/1`)
                            }
                        }}
                    />
                </Popover>
            </div>
            <div className="f-js-end last">
                <Icon className="u-icon u-icon-other f-fz16 f-cp" type="setting" />
                {" "}
                <Badge count={90} offset={[-4, 4]}>
                    <Icon className="u-icon u-icon-other f-fz16 f-cp" type="mail" />
                </Badge>
                {" "}
                <Icon className="u-icon u-icon-other f-fz16 f-cp" type="skin" />
                {" "}
                <Icon
                    className="u-icon u-icon-other f-fz16 f-cp"
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
            </div>
        </div>
    )
};


