import React, { useEffect } from 'react'
import { useState } from 'reinspect'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

import {
    SongList,
    ExclusiveBroadcast,
    NewSong,
    Mv,
    Djprogram
} from '@/components/find-music/content';

import { compare } from '@/tools';

interface RecommandWidgetTitleProps {
    text: string,
    routerLink: string
}

interface IProps {
    isLoading: boolean
    recommendSongList: any[]
    exclusiveBroadcast: any[]
    newSong: any[]
    recommendMv: any[]
    djprogram: any[]
    sortElement: { k: number, v: string }[]
}

interface ArrElementTypes {
    keywords: number
    titleELement: JSX.Element
    contentElement: JSX.Element
}

// 推荐部分标题
const RecommandWidgetTitle: React.FC<RecommandWidgetTitleProps> = (props) => (
    <Link to={props.routerLink} className='s-cl-black'>
        <span className='f-fz16 f-fwb' style={{ marginRight: '5px' }}>{props.text}</span>
        <Icon type="right" />
    </Link>
);

export const Recommand = (props: IProps) => {
    /**
     * 控制渲染页面的对象数组方法
     * @param arr
     * @param props
     * @returns ArrElementTypes[] | any
     */
    function arrELement(arr: ArrElementTypes[] | any, props?: IProps) {
        return arr;
    }

    const [showElement, setShowElement] = useState(arrELement([]), '元素排列方式');

    useEffect(() => {
        let initialArr = [
            {
                keywords: 0,
                titleELement: <RecommandWidgetTitle text='推荐歌单' routerLink='/' />,
                contentElement: <SongList data={props.recommendSongList} isLoading={props.isLoading} />
            },
            {
                keywords: 1,
                titleELement: <RecommandWidgetTitle text='独家放送' routerLink='/' />,
                contentElement: <ExclusiveBroadcast data={props.exclusiveBroadcast} isLoading={props.isLoading} />
            },
            {
                keywords: 2,
                titleELement: <RecommandWidgetTitle text='最新音乐' routerLink='/' />,
                contentElement: <NewSong data={props.newSong} isLoading={props.isLoading} />
            },
            {
                keywords: 3,
                titleELement: <RecommandWidgetTitle text='推荐MV' routerLink='/' />,
                contentElement: <Mv data={props.recommendMv} isLoading={props.isLoading} />
            },
            {
                keywords: 4,
                titleELement: <RecommandWidgetTitle text='主播电台' routerLink='/' />,
                contentElement: <Djprogram data={props.djprogram} isLoading={props.isLoading} />
            }
        ];

        /**
         * 赋值条件，若由子组件传递过来的数据的 data-index 与初始数组的 keywords 不同， 则将初始数组的 keywords 改变
         */
        props.sortElement.forEach((item, index) => {
            if (Number(item.k) !== initialArr[index].keywords) {
                initialArr[index].keywords = Number(item.k);
            }
        });

        /**
         * 通过 compare 方法对数组对象进行排序
         */
        initialArr.sort(compare("keywords"));

        /**
         * 改变初始化数组的方法，同时在页面 dom 元素全部加载完毕之后将父组件传递过来的 props 数据传递给封装好的 arrElement 函数，
         * 如果不传递 props 直接使用，则无法获取相应的 props
         */
        setShowElement(arrELement(initialArr, props));
    }, [props]);

    return (
        <div>
            {showElement.map((item: ArrElementTypes, index: number) => {
                return (
                    <div key={index}>
                        {item.titleELement}
                        {item.contentElement}
                    </div>
                )
            })}
        </div>
    )
};
