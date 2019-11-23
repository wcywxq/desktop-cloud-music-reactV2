import * as React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

// 路由的导入
import router from "@/routers";

// 导入 iconfont 图标库中的图标
import { IconFont } from '@/tools/IconFontSetting';

// 控制面板
import ControlPanelWidget from '@/components/ControlPanelWidget';

// 浮动播放器
import FixedPlayerWidget from '@/components/FixedPlayerWidget';

// 获取音乐信息
import { useMusicMessage } from "@/hooks";

// 内联样式
const styles: { [propName: string]: React.CSSProperties } = {
    Header: {
        height: "auto",
        padding: "0",
        lineHeight: "1.5",
        background: "#001529",
        zIndex: 10
    },
    Layout: {
        background: "#fff"
    },
    Sider: {
        height: "100%"
    },
    Content: {
        padding: "0 40px"
    },
    Footer: {
        position: 'fixed',
        padding: '10px 0',
        zIndex: 10,
        width: '100%',
        bottom: '0',
        backgroundColor: 'white',
        border: '1px solid #9C9C9C',
        boxShadow: '0px -2px 8px #9C9C9C'
    }
};

// 菜单栏信息
const menuMessage = [
    {
        key: "sub1",
        title: "推荐",
        menuItem: [
            { k: 1, routerLink: "/", iconType: "icon-Music", text: "发现音乐" },
            { k: 2, routerLink: "/fm", iconType: "icon-tubiaozhizuomobanyihuifu-", text: "私人FM" },
            { k: 3, routerLink: "/videos", iconType: "icon-shipin", text: "视频" },
            { k: 4, routerLink: "/penpal", iconType: "icon-pengyou", text: "朋友" }
        ]
    },
    {
        key: "sub2",
        title: "我的音乐",
        menuItem: [
            { k: 5, routerLink: "", iconType: "icon-download-fill", text: "下载管理" },
            { k: 6, routerLink: "", iconType: "icon-yun", text: "我的音乐云盘" },
            { k: 7, routerLink: "", iconType: "icon-shoucang", text: "我的收藏" },
        ]
    },
    {
        key: "sub3",
        title: (
            <span>
                <Icon type="setting" />
                <span>创建的歌单</span>
            </span>
        ),
        menuItem: [
            { k: 8, routerLink: "", iconType: "icon-xihuan", text: "我喜欢的音乐" }
        ]
    }
];

const App: React.FC = () => {
    const { Header, Sider, Content, Footer } = Layout;
    const { SubMenu } = Menu;

    // 获取音乐信息, 包括url
    const { musicMsgState, setListIndex, setID, setDuration } = useMusicMessage();

    return (
        <Router>
            <Layout>
                <Header style={styles.Header}>
                    <ControlPanelWidget />
                </Header>
                <Layout style={styles.Layout} className='ref-content'>
                    <Sider width={255} style={styles.Sider}>
                        <Menu
                            onClick={e => console.log("click ", e)}
                            defaultSelectedKeys={["1"]}
                            defaultOpenKeys={["sub1", "sub2", "sub3"]}
                            mode="inline"
                        >
                            {menuMessage.map(item => {
                                return (
                                    <SubMenu key={item.key} title={item.title}>
                                        {
                                            item.menuItem.map(sub_item => {
                                                return (
                                                    <Menu.Item key={sub_item.k}>
                                                        <Link to={sub_item.routerLink}>
                                                            <IconFont type={sub_item.iconType} />
                                                            {sub_item.text}
                                                        </Link>
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            })}
                        </Menu>
                    </Sider>
                    <Content style={styles.Content}>
                        <Switch>
                            {router.map((route, key) => {
                                if (route.exact) {
                                    return <Route exact key={key} path={route.path} component={route.component} />
                                } else {
                                    return <Route key={key} path={route.path} component={route.component} />
                                }
                            })}
                        </Switch>
                    </Content>
                </Layout>
                <Footer style={styles.Footer}>
                    <FixedPlayerWidget
                        musicMsgState={musicMsgState}
                        setListIndex={setListIndex}
                        setID={setID}
                        setDuration={setDuration}
                    />
                </Footer>
            </Layout>
        </Router>
    );
};

export default App;
