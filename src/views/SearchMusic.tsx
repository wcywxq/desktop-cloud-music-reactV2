import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';

import { Single, Singer, Album, Video, Playlist, Lyric, Radio, User } from '@/components/Search';
import './SearchMusic.scss';

import { useSearchMusic } from "@/hooks";

const SearchMusic: React.FC = () => {
    // 获取参数
    const { keywords } = useParams();

    // 获取数据请求方法
    const { state, setParams } = useSearchMusic({
        keywords: '',
        limit: 100,
        offset: 0
    }, []);

    // 组件
    const { TabPane } = Tabs;

    // 数据请求
    useEffect(() => {
        setParams({ keywords, limit: 100, offset: 0 })
    }, [keywords, setParams])

    return (
        <div>
            <header>
                <span className="m-s-name">{keywords}</span>{" "}{" "}{" "}
                找到 {state.count} 单曲
            </header>
            <article>
                <Tabs defaultActiveKey="1" onChange={key => console.log(key)}>
                    <TabPane tab="单曲" key="1">
                        <div className="m-s-tab-item m-s-single">
                            <Single {...state} setParams={setParams} />
                        </div>
                    </TabPane>
                    <TabPane tab="歌手" key="2">
                        <div className="m-s-tab-item m-s-singer">
                            <Singer />
                        </div>
                    </TabPane>
                    <TabPane tab="专辑" key="3">
                        <div className="m-s-single">
                            <Album />
                        </div>
                    </TabPane>
                    <TabPane tab="视频" key="4">
                        <Video />
                    </TabPane>
                    <TabPane tab="歌单" key="5">
                        <Playlist />
                    </TabPane>
                    <TabPane tab="歌词" key="6">
                        <Lyric />
                    </TabPane>
                    <TabPane tab="主播电台" key="7">
                        <Radio />
                    </TabPane>
                    <TabPane tab="用户" key="8">
                        <User />
                    </TabPane>
                </Tabs>
            </article>
        </div>
    )
}

export default SearchMusic
