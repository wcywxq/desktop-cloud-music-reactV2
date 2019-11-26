import React, { useEffect } from 'react'
import { useState } from 'reinspect'
import { useHistory, useParams } from 'react-router-dom';
import { Tabs, Tag } from 'antd';

import { Single, Singer, Album, Video, Playlist, Lyric, Radio, User } from '@/components/search';
import './SearchMusic.scss';

import { useSearchMusic } from '@/hooks';

const SearchMusic: React.FC = () => {
    // 获取 history 对象
    const history = useHistory();

    // 获取参数
    const { keywords } = useParams();

    // 显示的名字 
    const [name, setName] = useState(['单曲', '首'], '显示的名字');

    // 获取数据请求方法
    const { searchMusicState, setParams } = useSearchMusic({ keywords: '', limit: 100, offset: 0 });

    // 数据请求
    useEffect(() => {
        setParams({ keywords, limit: 100, offset: 0 })
    }, [keywords, setParams])

    // 组件
    const { TabPane } = Tabs;

    return (
        <div>
            <header>
                <Tag color="gold" style={{
                    height: '30px',
                    lineHeight: '30px',
                    fontSize: '14px'
                }}>{keywords}</Tag>
                <Tag color="cyan">找到{" "}{searchMusicState.dataCount}{" "}{name[1]}{name[0]}</Tag>
            </header>
            <article>
                <Tabs defaultActiveKey="1" onChange={key => {
                    history.push(`/search/${keywords}/${key}`);
                    setParams({ keywords, type: key, limit: 100, offset: 0 });
                    if (key === '100') {
                        setName(['歌手', '位']);
                    } else if (key === '10') {
                        setName(['专辑', '张']);
                    } else if (key === '1014') {
                        setName(['视频', '个']);
                    } else if (key === '1000') {
                        setName(['歌单', '个']);
                    } else if (key === '1006') {
                        setName(['歌词', '首']);
                    } else if (key === '1009') {
                        setName(['电台', '个']);
                    } else if (key === '1002') {
                        setName(['用户', '位']);
                    } else {
                        setName(['单曲', '首']);
                    }
                }}>
                    <TabPane tab="单曲" key="1">
                        <div className="m-s-tab-item m-s-single">
                            <Single
                                {...searchMusicState}
                                data={searchMusicState.dataObj.songs}
                                count={searchMusicState.dataCount}
                                setParams={setParams}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab="歌手" key="100">
                        <div className="m-s-tab-item m-s-singer">
                            <Singer />
                            {/* <Singer 
                                {...searchMusicState}
                                data={searchMusicState.dataObj.artists}
                                count={searchMusicState.dataCount}
                                setParams={setParams}
                            /> */}
                        </div>
                    </TabPane>
                    <TabPane tab="专辑" key="10">
                        <div className="m-s-single">
                            <Album />
                        </div>
                    </TabPane>
                    <TabPane tab="视频" key="1014">
                        <Video />
                    </TabPane>
                    <TabPane tab="歌单" key="1000">
                        <Playlist />
                    </TabPane>
                    <TabPane tab="歌词" key="1006">
                        <Lyric />
                    </TabPane>
                    <TabPane tab="主播电台" key="1009">
                        <Radio />
                    </TabPane>
                    <TabPane tab="用户" key="1002">
                        <User />
                    </TabPane>
                </Tabs>
            </article>
        </div>
    )
};

export default SearchMusic
