import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from 'antd';

// 独家放送
export const ExclusiveBroadcast: React.FC<{ data: any[] }> = (props) => {
    const history = useHistory();

    return (
        <div className="m-rd m-rd-eb f-dg f-gs-eb f-jc-sb f-cp eb">
            {props.data.map((item: any, index: number) => {
                return (
                    <div
                        className="f-pr item"
                        key={index}
                        onClick={() => history.push(`/video-detail/${item.videoId}`)}
                    >
                        <img src={item.sPicUrl} alt="" className="img" />
                        <Icon type="play-circle" theme="filled" className="f-pa f-fz20 icon" />
                        <p style={{ paddingTop: '5px', fontSize: '12px' }}>{item.name}</p>
                    </div>
                )
            })}
        </div>
    )
}
