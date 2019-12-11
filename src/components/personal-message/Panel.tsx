import * as React from "react";
import { Modal, Row, Col, Button, Icon, List } from 'antd';
import { useHistory } from 'react-router-dom';

import { useLogout } from '@/hooks';
import { IconFont } from '@/tools';

interface IProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Panel: React.FC<IProps> = (props) => {
    const { visible, setVisible } = props;
    const history = useHistory();

    const dataFirst = [
        {
            icon: <Icon type="user"/>,
            text: '会员中心',
            mark: '未订阅'
        },
        {
            icon: <IconFont type="icon-huiyuan"/>,
            text: '等级',
            mark: 'Lv.7'
        },
        {
            icon: <Icon type="shopping-cart"/>,
            text: '商城'
        },
        {
            icon: <Icon type="setting"/>,
            text: '个人信息设置',
            path: '/setting'
        },
        {
            icon: <Icon type="mobile"/>,
            text: '绑定社交账号',
            mark: (
                <>
                    <Icon type="weibo-circle"/>{" "}
                    <Icon type="wechat"/>
                </>
            )
        },
        {
            icon: <Icon type="logout"/>,
            text: '退出登陆'
        }
    ];

    return (
        <div>
            <Modal
                visible={visible}
                title={null}
                onCancel={() => setVisible(false)}
                width={400}
                footer={null}
            >
                <Row className="f-tac">
                    <Col span={8}>
                        <span className="f-fz24 f-fwb">{JSON.parse(localStorage.getItem("userInfo") as any).eventCount}</span><br/>
                        <span className="f-fz12">动态</span>
                    </Col>
                    <Col span={8}>
                        <span className="f-fz24 f-fwb">{JSON.parse(localStorage.getItem("userInfo") as any).follows}</span><br/>
                        <span className="f-fz12">关注</span>
                    </Col>
                    <Col span={8}>
                        <span className="f-fz24 f-fwb">{JSON.parse(localStorage.getItem("userInfo") as any).followeds}</span><br/>
                        <span className="f-fz12">粉丝</span>
                    </Col>
                </Row>
                <Row className="f-tac" style={{ marginTop: '20px' }}>
                    <Col span={24}>
                        <Button className="u-btn f-fz14" style={{ width: '100px' }}>
                            <Icon type="carry-out" className="s-cl-gray"/>签到
                        </Button>
                    </Col>
                </Row>
                <List
                    size="small"
                    itemLayout="vertical"
                    dataSource={dataFirst}
                    style={{ marginTop: '20px' }}
                    renderItem={item =>
                        <List.Item
                            extra={
                                <>
                                    <span className="f-fz12">{item.mark}</span>{" "}
                                    <Icon type="right" className="f-fz12"/>
                                </>
                            }
                            className="f-cp"
                            onClick={() => {
                                if(item.path) {
                                    history.push(item.path);
                                    setVisible(false);
                                }
                            }}
                        >
                            <Row>
                                <Col span={2}><span>{item.icon}</span></Col>
                                <Col span={22}><span>{item.text}</span></Col>
                            </Row>


                        </List.Item>
                    }
                />
            </Modal>
        </div>
    )
};
