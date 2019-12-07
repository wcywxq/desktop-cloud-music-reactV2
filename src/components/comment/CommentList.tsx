import * as React from 'react';
import { Link } from 'react-router-dom';
import { Comment, Icon, Tooltip, Avatar, List, Skeleton } from 'antd';
import moment from 'moment';

interface IProps {
  title: string
  isLoading: boolean,
  data: any[]
  total: number
}

export const CommentList: React.FC<IProps> = (props) => {
  const { title, isLoading, data, total } = props;

  /**
   * 获取点赞具体评论的数量
   * @param item 
   */
  function actionsHandle(item: any) {
    return [
      <span>举报</span>,
      <span>
        <Tooltip title="点赞">
          <Icon type="like" className="f-fz14" />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{item.likedCount}</span>
      </span>,
      <span>
        <Tooltip title="分享">
          <Icon type="share-alt" className="f-fz14" />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }} />
      </span>,
      <span>
        <Tooltip title="回复">
          <Icon type="message" className="f-fz14" />
          <span style={{ paddingLeft: 8, cursor: 'auto' }} />
        </Tooltip>
      </span>
    ]
  }

  return (
    <div>
      <List
        loading={isLoading}
        header={
          <div>
            <span className="f-fz14 f-fwb s-cl-black">{title}</span>{" "}
            <span className="f-fz12 s-cl-gray">（{total}）</span>
          </div>
        }
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <Skeleton loading={isLoading} active avatar>
            <Comment
              actions={actionsHandle(item)}
              author={<Link to={`${item.user.userId}`} className="s-cl-steelblue">{item.user.nickname}</Link>}
              avatar={<Avatar src={item.user.avatarUrl} alt={item.user.nickname} />}
              content={<p className="f-fz12 f-fwb">{item.content}</p>}
              children={
                item.beReplied.length === 0 ? null :
                  <div className="f-fz12 f-fwb s-bgc-floralwhite s-cl-black" style={{ padding: '8px', borderRadius: '5px' }}>
                    <List
                      dataSource={item.beReplied}
                      renderItem={(subItem: any) => (
                        <>
                          <Link to={`/${subItem.user.userId}`} className="s-cl-steelblue">
                            <span className="f-fz12">@{subItem.user.nickname}：</span>
                          </Link>
                          <span className="f-fz12 f-fwb s-cl-darkgray">{subItem.content}</span>
                        </>
                      )}
                    />
                  </div>
              }
              datetime={
                <Tooltip title={moment(item.time).format('YYYY-MM-DD HH:mm:ss')} >
                  <span>{moment(item.time).fromNow()}</span>
                </Tooltip >
              }
            />
          </Skeleton>
        )}
        style={{ marginBottom: '20px' }}
      />
    </div>
  );
}