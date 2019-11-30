import * as React from "react";
import { useState } from 'reinspect';
import { Button, Modal, List, Typography, Icon, message } from 'antd';
import Sortable from 'sortablejs';

interface IProps {
    getDataMethods: (arr: any) => void
}

export const Adjustment: React.FC<IProps> = (props) => {
    const { getDataMethods } = props;
    const [visible, setVisible] = useState(false, '是否显示排序列表');
    const [dataSource, setDataSource] = useState([
        { k: 0, v: '推荐歌单' },
        { k: 1, v: '独家放送' },
        { k: 2, v: '最新音乐' },
        { k: 3, v: '推荐MV' },
        { k: 4, v: '主播电台' }
    ], '默认数据');

    const { Text } = Typography;

    function adjustHandleClick() {
        setVisible(true);
        /**
         * sortable 插件进行列表排序，首先获取到渲染列表，这里因为列表并不是第一时间加载，
         * 因此给 Modal 组件进行了强制渲染，以用来进行第一时间加载
         */
        let list = document.querySelector('.ant-list-items');

        if (list) {
            new Sortable((list as HTMLElement), {
                animation: 300,
                sort: true,
                ghostClass: 'orange-background-class',
                // handle: '.sort-item-icon',
                onUpdate: (event: Sortable.SortableEvent) => {
                    let newDataSource = Array.from(event.from.children).map((item: any, index: number) => {
                        return {
                            k: item.dataset.index,
                            v: item.innerText
                        };
                    });
                    setDataSource(newDataSource);
                }
            });
        }
    }

    /**
     * 恢复默认顺序的方法
     */
    function recoverHandleClick() {
        setDataSource([
            { k: 0, v: '推荐歌单' },
            { k: 1, v: '独家放送' },
            { k: 2, v: '最新音乐' },
            { k: 3, v: '推荐MV' },
            { k: 4, v: '主播电台' }
        ])
    }

    /**
     * 处理确定的按钮
     * @param {{k: number; v: string}[]} data
     */
    function handleClickOnOk(data: { k: number, v: string }[]) {
        message.success({ content: '调整栏目顺序成功', duration: 0.5 });
        getDataMethods(data);
        setVisible(false);
    }

    /**
     * 处理取消的按钮
     */
    function handleClickOnCancel() {
        message.error({ content: '取消调整栏目顺序', duration: 0.5 });
        setVisible(false)
    }

    return (
        <div className="m-sort f-tac">
            <p className="f-fz12 f-cp s-cl-lightgray intro">现在可以根据个人喜好，自由调整首页栏目顺序啦～</p>
            <Button className="u-btn u-btn-adjust f-fz12 s-cl-default s-bc-default"
                    onClick={adjustHandleClick}>调整栏目顺序</Button>
            <Modal
                title="调整栏目顺序"
                forceRender={true}
                visible={visible}
                onOk={() => handleClickOnOk(dataSource)}
                onCancel={handleClickOnCancel}
                okText="确定"
                cancelText="取消"
                width={400}
                className="f-tac"
            >
                <p className="f-fz12 s-cl-lightgray">
                    想调整首页栏目的顺序?按住右边的按钮拖动即可
                </p>
                <List
                    itemLayout="vertical"
                    dataSource={dataSource}
                    renderItem={(item: { k: number, v: string }, index: number) => (
                        <List.Item
                            key={index}
                            data-index={index}
                            className="m-sort-item f-fz12 f-tal f-cp s-bgc-white"
                            extra={<Icon type="menu" className="icon"/>}
                        >
                            <Text className="text">{item.v}</Text>
                        </List.Item>
                    )}
                />
                <Button type="link" onClick={recoverHandleClick}>恢复默认排序</Button>
            </Modal>
        </div>
    )
};
