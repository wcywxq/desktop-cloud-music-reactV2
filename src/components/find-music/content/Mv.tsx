import * as React from 'react';
import { Icon } from 'antd';

// 推荐 Mv
export const Mv: React.FC<{ data: any[] }> = (props) => (
    <div className="m-rd m-rd-mv f-dg f-gs-mv">
        {props.data.map((item: any, index: number) => {
            return (
                <div className="f-pr f-cp item" key={index}>
                    <span className="f-pa f-fz12 f-fwb s-cl-white amount">
                        <Icon type="caret-right" />{" "}
                        {
                            item.playCount.toString().length > 4 ?
                                item.playCount.toString().substring(0, item.playCount.toString().length - 4) + '万' :
                                item.playCount.toString()
                        }
                    </span>
                    <span className="f-os f-fz12 s-cl-white top">{item.copywriter}</span>
                    <img src={item.picUrl} alt="" className="img" />
                    <p className="f-fz12 f-fwb s-cl-black name">{item.name}</p>
                    <p className="f-fz12 s-cl-lightgray artist-name">{item.artistName}</p>
                </div>
            )
        })}
    </div>
)
