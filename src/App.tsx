import React from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import {Layout, Menu, Icon} from "antd";

// 路由的导入
import router from "@/routers";

// 导入 iconfont 图标库中的图标
import {IconFont} from '@/tools/IconFontSetting'

// 控制面板
import ControlPanel from '@/components/ControlPanel'

// 浮动播放器
import FixedPlayer from '@/components/FixedPlayer'

const App: React.FC = () => {
    const {Header, Sider, Content, Footer} = Layout;
    const {SubMenu} = Menu;

    return (
        <Router>
            <Layout>
                <Header style={{
                    height: "auto",
                    padding: "0",
                    lineHeight: "1.5",
                    background: "#001529"
                }}>
                    <ControlPanel/>
                </Header>
                <Layout style={{background: "#fff"}} className='ref-content'>
                    <Sider width={255} style={{height: '100%'}}>
                        <Menu
                            onClick={e => {
                                console.log("click ", e)
                            }}
                            defaultSelectedKeys={["1"]}
                            defaultOpenKeys={["sub1", "sub2", "sub3"]}
                            mode="inline"
                        >
                            <SubMenu
                                key="sub1"
                                title="推荐"
                            >
                                <Menu.Item key="1">
                                    <Link to="/">
                                        <IconFont type="icon-Music" />
                                        发现音乐
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to="/fm">
                                        <IconFont type="icon-tubiaozhizuomobanyihuifu-"/>
                                        私人FM
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to="/videos">
                                        <IconFont type="icon-shipin"/>
                                        视频
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Link to="/penpal">
                                        <IconFont type="icon-pengyou"/>
                                        朋友
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title="我的音乐"
                            >
                                <Menu.Item key="5">
                                    <IconFont type="icon-download-fill"/>
                                    下载管理
                                </Menu.Item>
                                <Menu.Item key="6">
                                    <IconFont type="icon-yun"/>
                                    我的音乐云盘
                                </Menu.Item>
                                <Menu.Item key="7">
                                    <IconFont type="icon-shoucang"/>
                                    我的收藏
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub3"
                                title={
                                    <span>
                                        <Icon type="setting"/>
                                        <span>创建的歌单</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="8">
                                    <IconFont type="icon-xihuan"/>
                                    我喜欢的音乐
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{padding: "0 40px"}}>
                        <Switch>
                            {router.map((route, key) => {
                                if (route.exact) {
                                    return (
                                        <Route
                                            exact
                                            key={key}
                                            path={route.path}
                                            component={route.component}
                                        />
                                    );
                                } else {
                                    return (
                                        <Route
                                            key={key}
                                            path={route.path}
                                            component={route.component}
                                        />
                                    );
                                }
                            })}
                        </Switch>
                    </Content>
                </Layout>
                <Footer
                    style={{
                        position: 'fixed',
                        padding: '10px 0',
                        zIndex: 1,
                        width: '100%',
                        bottom: '0',
                        backgroundColor: 'white',
                        border: '1px solid #9C9C9C',
                        boxShadow: '0px -2px 8px #9C9C9C'
                    }}>
                    <FixedPlayer/>
                </Footer>
            </Layout>
        </Router>
    );
};

export default App;
