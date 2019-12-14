import * as React from 'react';
import { useState } from 'reinspect';
import { Avatar, Icon, Pagination, Skeleton } from 'antd';

import { ContentListParams } from '@/api/types';

interface IProps {
  isLoading: boolean;
  data: any;
  total: number;
  setParams: React.Dispatch<React.SetStateAction<ContentListParams>>
}

export const ContentList: React.FC<IProps> = props => {
  const { isLoading, data, total, setParams } = props;

  const [currentPage, setCurrentPage] = useState(1, "当前页码")

  return (
    <div className="m-playList f-tac">
      <div className="f-dg f-gs-content-list">
        {data.map((item: any, index: number) => {
          return (
            <Skeleton key={index} loading={isLoading} active title={false} paragraph={{ rows: 4 }}>
              <div className="f-cp item">
                <div className="f-pr">
                  <Avatar src={item.coverImgUrl} shape="square" size={195} className="img" /><br />
                  <span className="f-pa f-fz12 s-cl-white playCount">
                    <Icon type="caret-right" />{" "}{
                      item.playCount.toString().length > 4 ?
                        `${item.playCount.toString().substring(0, item.playCount.toString().length - 4)}万` :
                        item.playCount.toString()
                    }
                  </span>
                  <span className="f-pa f-fz12 s-cl-white nickname">
                    <Icon type="user" />{" "}{item.creator.nickname}
                  </span>
                  <Icon type="play-circle" theme="filled" className="f-pa f-fz36 s-cl-default playIcon" />
                </div>
                <span data-description={item.description} className="f-fz12 f-tac">{item.name}</span>
              </div>
            </Skeleton>
          )
        })}
      </div>
      <div className="pagination">
        <Pagination
          // className="f-fz12 f-tac"
          size="small"
          hideOnSinglePage
          showQuickJumper
          total={total}
          showTotal={total => <span>共 {total} 条</span>}
          pageSize={100}
          current={currentPage}
          style={{ marginBottom: '30px' }}
          onChange={page => {
            setCurrentPage(page);
            setParams({ limit: 100, offset: (page - 1) * 100 });
          }}
        />
      </div>
    </div>
  )
}