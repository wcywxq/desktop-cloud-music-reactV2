import * as React from 'react';
import { Icon } from 'antd';

// 推荐 Mv
export const Mv: React.FC<{ data: any[] }> = (props) => (
    <div className="recommandMv">
        {props.data.map((item: any, index: number) => {
            return (
                <div className="recommandMv-item" key={index}>
                    <span className="amount">
                      <Icon type="caret-right"/>{" "}
                      {
                        item.playCount.toString().length > 4 ?
                            item.playCount.toString().substring(0, item.playCount.toString().length - 4) + '万' :
                            item.playCount.toString()
                      }
                    </span>
                    <span className="top">{item.copywriter}</span>
                    <img src={item.picUrl} alt="" className="img"/>
                    <p className="name">{item.name}</p>
                    <p className="artist-name">{item.artistName}</p>
                </div>
            )
        })}
    </div>
)
