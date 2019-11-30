import * as React from 'react';

// 主播电台
export const Djprogram: React.FC<{ data: any[] }> = (props) => (
    <div className="f-dg djprogram">
        {props.data.map((item: any, index: number) => {
            return (
                <div className="f-df f-ai-center f-cp djprogram-item" key={index}>
                    <div>
                        <img src={item.program.radio.picUrl} alt="" className="img"/>
                    </div>
                    <div>
                        <span className="f-fz12 rcmdText">
                          {
                              item.program.radio.rcmdText ? item.program.radio.rcmdText : item.program.radio.desc
                          }
                        </span><br/>
                        <span className="f-fz12 s-cl-lightgray name">{item.program.radio.name}</span>
                    </div>
                </div>
            )
        })}
    </div>
);
