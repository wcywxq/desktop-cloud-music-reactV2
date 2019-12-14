import * as React from 'react'
import { useState } from 'reinspect'
import { Tabs } from 'antd'

import { Banner, Recommand, Adjustment } from "@/components/find-music";
import { Classification, ContentList } from '@/components/play-list';
import { useBanner, useRecommand, useContentList } from '@/hooks'

const FindMusic: React.FC = () => {
    const [sortElement, setSortElement] = useState([
        { k: 0, v: '推荐歌单' },
        { k: 1, v: '独家放送' },
        { k: 2, v: '最新音乐' },
        { k: 3, v: '推荐MV' },
        { k: 4, v: '主播电台' }
    ], '元素排序方式');

    // banner 数据
    const { bannerState } = useBanner();
    // 推荐数据
    const { recommandState } = useRecommand();
    // 歌单分类内容列表数据
    const { contentListState, setParams: setContentListParams } = useContentList();

    const { TabPane } = Tabs;

    function getDataMethods(arr: { k: number, v: string }[]) {
        setSortElement(arr);
    }

    return (
        <div className="find-music">
            <header>
                <aside>
                    <Tabs
                        defaultActiveKey="1"
                        onChange={key => console.log(key)}
                    >
                        <TabPane tab="个性推荐" key="2">
                            {/* 轮播图 */}
                            <Banner data={bannerState.bannerUrl} />
                            {/* 推荐内容 */}
                            <Recommand
                                isLoading={recommandState.isLoading}
                                {...recommandState.variety}
                                sortElement={sortElement}
                            />
                            {/* 调整排版控件 */}
                            <Adjustment getDataMethods={getDataMethods} />
                        </TabPane>
                        <TabPane tab="歌单" key="1">
                            {/* 分类 */}
                            <Classification />
                            {/* 内容 */}
                            <ContentList {...contentListState} setParams={setContentListParams} />
                        </TabPane>
                        <TabPane tab="主播电台" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                        <TabPane tab="排行" key="4">
                            Content of Tab Pane 4
                        </TabPane>
                        <TabPane tab="歌手" key="5">
                            Content of Tab Pane 5
                        </TabPane>
                        <TabPane tab="最新音乐" key="6">
                            Content of Tab Pane 6
                        </TabPane>
                    </Tabs>
                </aside>
            </header>
        </div>
    )
};

export default FindMusic
