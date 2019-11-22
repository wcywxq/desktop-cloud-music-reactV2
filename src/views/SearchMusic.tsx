import React, { useEffect } from 'react'
import { useState } from 'reinspect'
import { useHistory, useParams } from 'react-router-dom';
import { Tabs } from 'antd';

import { Single, Singer, Album, Video, Playlist, Lyric, Radio, User } from '@/components/Search';
import './SearchMusic.scss';

import { useSearchMusic } from '@/hooks';

const SearchMusic: React.FC = () => {
    // 获取 history 对象
    const history = useHistory();

    // 获取参数
    const { keywords } = useParams();

    const [name, setName] = useState('单曲', '显示的名字');

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
                <span className="m-s-name">{keywords}</span>{" "}{" "}{" "}
                找到 {0} {name}
            </header>
            <article>
                <Tabs defaultActiveKey="1" onChange={key => {
                    history.push(`/search/${keywords}/${key}`);
                    if (key === '100') {
                        setName('歌手');
                    } else if (key === '10') {
                        setName('专辑');
                    } else if (key === '1014') {
                        setName('视频');
                    } else if (key === '1000') {
                        setName('歌单');
                    } else if (key === '1006') {
                        setName('歌词');
                    } else if (key === '1009') {
                        setName('电台');
                    } else if (key === '1002') {
                        setName('用户');
                    } else {
                        setName('单曲');
                    }
                    setParams({ keywords, type: key, limit: 100, offset: 0 });
                }}>
                    <TabPane tab="单曲" key="1">
                        <div className="m-s-tab-item m-s-single">
                            <Single {...searchMusicState} {...searchMusicState.dataObj.songs} setParams={setParams} />
                        </div>
                    </TabPane>
                    <TabPane tab="歌手" key="100">
                        <div className="m-s-tab-item m-s-singer">
                            <Singer />
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
