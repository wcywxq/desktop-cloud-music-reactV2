import * as React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Row, Col } from 'antd';

import { IconFont } from '@/tools';

// 最新音乐
export const NewSong: React.FC<{ data: any[] }> = (props) => (
    <div className="newSong">
        {props.data.map((item: any, index: number) => {
            return (
                <div className="newSong-item" key={index}>
                    <Row style={{ display: 'flex', alignItems: 'center' }}>
                        <Col span={3}>
                            <img src={item.song.album.picUrl} alt=""
                                 style={{ width: '100%', height: '100%', borderRadius: '5px' }}/>
                            <Icon type="play-circle" theme="twoTone" className="icon"/>
                        </Col>
                        <Col span={2} style={{ fontSize: '12px', color: 'rgb(195, 195, 195)' }}>
                            <span style={{ marginLeft: '10px' }}>{(index + 1).toString().padStart(2, '0')}</span>
                        </Col>
                        <Col span={8}>
                            <span className="music-name">{item.name}</span><br/>
                            <span className="artist-name">
                              {item.song.exclusive ?
                                  <span className="exclusive">SQ</span> : null}{" "}{item.song.artists[0].name}
                            </span>
                        </Col>
                        <Col span={9}/>
                        <Col span={2}>
                            {item.song.mvid === 0 ? null :
                                <Link to={`/${item.song.mvid}`}>
                                    <IconFont type='icon-video' style={{ fontSize: '20px' }}/>
                                </Link>
                            }
                        </Col>
                    </Row>
                </div>
            )
        })}
    </div>
)
