import * as React from 'react';

// 主播电台
export const Djprogram = (props: { data: any[] }) => (
  <div className="djprogram">
    {props.data.map((item: any, index: number) => {
      return (
        <div className="djprogram-item" key={index}>
          <div>
            <img src={item.program.radio.picUrl} alt="" className="img" />
          </div>
          <div>
            <span className="rcmdText">
              {
                item.program.radio.rcmdText ?
                  item.program.radio.rcmdText :
                  item.program.radio.desc
              }
            </span><br />
            <span className="name">{item.program.radio.name}</span>
          </div>
        </div>
      )
    })}
  </div>
)