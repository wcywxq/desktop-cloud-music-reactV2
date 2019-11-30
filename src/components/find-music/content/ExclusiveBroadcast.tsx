import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from 'antd';

// 独家放送
export const ExclusiveBroadcast: React.FC<{ data: any[] }> = (props) => {
    const history = useHistory();

    return (
        <div className="exclusiveBroadcast">
            {props.data.map((item: any, index: number) => {
                return (
                    <div
                        className="exclusiveBroadcast-item"
                        key={index}
                        onClick={() => history.push(`/video-detail/${item.videoId}`)}
                    >
                        <img src={item.sPicUrl} alt="" className="img"/>
                        <Icon type="play-circle" theme="filled" className="icon"/>
                        <p style={{ paddingTop: '5px', fontSize: '12px' }}>{item.name}</p>
                    </div>
                )
            })}
        </div>
    )
}
