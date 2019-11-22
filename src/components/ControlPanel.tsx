import * as React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Input, Icon, Badge, Popover, Tag, Spin } from 'antd'

import './ControlPanel.scss'
import { useSearchHot } from "@/hooks";

const ControlPanel: React.FC = () => {
    // react-router 提供的 HOOKS
    const history = useHistory();

    // 获取热搜列表
    const { state } = useSearchHot([]);

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
                <Icon className="forward" type="left" onClick={() => history.go(-1)} />
                <Icon className="go" type="right" onClick={() => history.go(1)} />
            </aside>
            <aside>
                <Popover
                    placement="bottom"
                    content={suggestContent}
                    trigger="click"
                >
                    <Input
                        allowClear
                        placeholder="搜索"
                        style={{ width: '200px' }}
                        prefix={<Icon type="search" style={{ color: '#333' }} />}
                        onChange={(e) => {
                            console.log(e.target.value)
                        }}
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
                <Icon className="control-panel-icon" type="switcher" />
            </aside>
        </div>
    )
}

export default ControlPanel


