import * as React from "react";
import { Row, Col, Button, Icon, Popover } from 'antd';

import { useCategory } from "@/hooks";
import { IconFont } from "@/tools"

export const Classification: React.FC = () => {
    const { categoryState } = useCategory();
    // 图表类型
    const icons = ["icon-yuzhong", "icon-fengge", "icon-changjing", "icon-qinggan", "icon-zhuti"];

    const title = (
        <Button
            className="u-btn"
            style={{ width: '80px', margin: '10px auto' }}
            size="small"
        >
            {categoryState.allData.all.name}
        </Button>
    );

    const content = (
        <>
            {Object.values(categoryState.allData.categories).map((item: any, index: number) => (
                <Row key={index}>
                    <Col span={4}>
                        <p className="f-fz16 s-cl-gray">
                            <IconFont type={icons[index]} style={{ marginRight: '10px' }} />
                            {item}
                        </p>
                    </Col>
                    <Col span={20} className="f-dg f-gs-cl">
                        {categoryState.allData.sub.map((subItem: any, subIndex: number) => (
                            subItem.category === index ?
                                <p key={subIndex}>
                                    <span className="f-pr">{subItem.name}
                                        {subItem.hot ?
                                            <span className="f-pa f-fz12 f-fsi s-cl-default" style={{ transform: 'scale(0.6)', top: -5, right: -20 }}>
                                                HOT
                                            </span> : null}
                                    </span>
                                </p> : null
                        ))}
                    </Col>
                </Row>
            ))}
        </>
    );

    return (
        <Row className="f-df f-ai-center" style={{ marginBottom: '10px' }}>
            <Col span={6}>
                <Popover
                    title={title}
                    content={content}
                    trigger="click"
                    placement="bottomLeft"
                    overlayClassName="f-usn"
                    overlayStyle={{ width: '50%' }}
                >
                    <Button className="u-btn" style={{ width: '100px' }}>
                        全部歌单{" "}<Icon type="right" />
                    </Button>
                </Popover>
            </Col>
            <Col span={18} className="f-tar">
                {categoryState.hotData.map((item: any, index: number) => (
                    <span
                        key={index}
                        style={{
                            padding: '0 15px',
                            borderRight: index === categoryState.hotData.length - 1 ? 'none' : '1px solid #eee'
                        }}>
                        {item.name}
                    </span>
                ))}
            </Col>
        </Row>
    )
};
