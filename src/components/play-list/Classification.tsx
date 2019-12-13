import * as React from "react";
import { Row, Col, Button, Icon, Breadcrumb, Popover } from 'antd';

import { useCategory } from "@/hooks/usePlayList";

export const Classification: React.FC = () => {
    const { categoryState } = useCategory();

    const title = (
        <Button
            className="u-btn"
            style={{ width: '80px', margin: '10px auto' }}
            size="small"
            type="danger"
        >
            {categoryState.allData.all ? categoryState.allData.all.name : null}
        </Button>
    );

    const content = (
        <div>
            <hr/>

        </div>
    );

    return (
        <Row className="f-df f-ai-center">
            <Col span={6}>
                <Popover
                    title={title}
                    content={content}
                    trigger="click"
                    placement="bottomLeft"
                    overlayStyle={{ width: '50%' }}
                >
                    <Button className="u-btn" style={{ width: '100px' }}>
                        全部歌单{" "}<Icon type="right"/>
                    </Button>
                </Popover>
            </Col>
            <Col span={18} className="f-tar">
                <Breadcrumb separator="">
                    {categoryState.hotData.map((item: any, index: number) => (
                        <Breadcrumb.Item key={index}>
                            <span style={{ margin: '0 15px' }}>
                            {item.name}
                            </span>
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </Col>
        </Row>
    )
};
