import React, { useEffect, useRef } from "react";
import Swiper from "swiper";

import './BannerWidget.scss'

interface IProps {
    data: any[]
}

const Banner = (props: IProps) => {
    const sliderRef = useRef(null);
    const { data } = props;

    // 初始化 Swiper
    useEffect(() => {
        // swiper 配置
        // @ts-ignore
        const mySwiper = new Swiper('.swiper-container', {
            init: false, // 是否立即初始化
            speed: 1000, // 速度
            watchSlidesProgress: true, // 开启这个参数来计算每个slide的progress(进度、进程)
            grabCursor: true, // 鼠标覆盖 Swiper 时指针会变成手掌形状
            autoplay: true, // 自动播放
            loop: true, // 循环模式选项
            loopedSlides: 3, // 设置所要用到的loop个数(一般设置大于可视slide个数2个即可)
            parallax: true, // 开启视差效果。
            preloadImages: false, // 是否强制加载所有图片
            updateOnImagesReady: true, // 所有的内嵌图像（img标签）加载完成后 Swiper 会重新初始化。因此需要设置为 true
            spaceBetween: -215, // slider 之间的距离
            slidesPerView: 'auto', // 每页显示数量
            slidesPerGroup: 1, // 定义 slides 的数量多少为一组
            centeredSlides: true, // 默认 active slide 居左，设置为 true 后居中

            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // 回调函数
            on: {
                setTranslate: () => {
                    for (let i = 0; i < mySwiper.slides.length; i++) {
                        let progress = mySwiper.slides[i].progress;
                        (mySwiper.slides[i] as HTMLElement).style.opacity = '';
                        (mySwiper.slides[i] as HTMLElement).style.background = '';
                        (mySwiper.slides[i] as HTMLElement).style.zIndex = `${10 - Math.abs(progress)}`;
                        (mySwiper.slides[i] as HTMLElement).style.transform = `scale(${1 - Math.abs(progress / 8)})`;
                    }
                },
                setTransition: (transition: any) => {
                    for (let i = 0; i < mySwiper.slides.length; i++) {
                        (mySwiper.slides[i] as HTMLElement).style.transition = transition
                    }
                }
            }
        });

        if (data.length !== 0) {
            (mySwiper as any).init(); // 初始化
            mySwiper.el.onmouseover = () => {
                mySwiper.navigation.$nextEl[0].style.opacity = '1';
                mySwiper.navigation.$prevEl[0].style.opacity = '1';
            };
            mySwiper.el.onmouseout = () => {
                mySwiper.navigation.$nextEl[0].style.opacity = '0';
                mySwiper.navigation.$prevEl[0].style.opacity = '0';
            };
        }
    }, [data.length]);

    return (
        <div style={{ marginBottom: '20px' }}>
            <div className="swiper-container" style={{ margin: "0 50px", borderRadius: "10px" }}>
                <div className="swiper-wrapper">
                    {data.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="swiper-slide"
                                ref={sliderRef}
                                style={{
                                    position: 'relative',
                                    width: '500px'
                                }}
                            >
                                <img src={item.imgSrc} style={{ width: "500px", borderRadius: "10px" }} alt='' />
                                <span style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    padding: '2px 8px',
                                    borderRadius: '5px',
                                    fontSize: '12px',
                                    color: '#fff',
                                    backgroundColor: item.titleColor
                                }}>{item.typeTitle}</span>
                            </div>
                        )
                    })}
                </div>

                {/* 分页器 */}
                <div className="swiper-pagination" />
                {/* 导航按钮 */}
                <div className="swiper-button-prev hover" />
                <div className="swiper-button-next hover" />
            </div>

        </div>
    )
};

export default Banner
