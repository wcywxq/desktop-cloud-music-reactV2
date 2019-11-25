import * as React from 'react'
import { Tabs } from 'antd'

import BannerWidget from "@/components/BannerWidget";
import RecommandWidget from '@/components/RecommandWidget';
import { useBanner, useRecommand } from '@/hooks'

const FindMusic: React.FC = () => {
  const { state } = useBanner();
  const { recommandState } = useRecommand();

  const { TabPane } = Tabs;

  return (
    <div className="find-music">
      <header>
        <aside>
          <Tabs
            defaultActiveKey="1"
            onChange={key => console.log(key)}
          >
            <TabPane tab="个性推荐" key="1">
              <BannerWidget data={state.bannerUrl} />
              <RecommandWidget {...recommandState.variety} />
            </TabPane>
            <TabPane tab="歌单" key="2">
              Content of Tab Pane 2
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
}

export default FindMusic
