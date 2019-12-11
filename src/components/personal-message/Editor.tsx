import * as React from 'react'
import { useState } from "reinspect";
import { useHistory } from 'react-router-dom';
import { Form, Input, Radio, DatePicker, Cascader, Avatar, Button, Row, Col } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import moment from "moment";

import { options } from '@/tools';

const WarppedEditorform: React.FC<FormComponentProps> = props => {
    const { form } = props;
    const history = useHistory();
    const { getFieldDecorator, validateFields } = form;
    const [value, setValue] = useState('保密', '性别设置');

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
        }
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0
            },
            sm: {
                span: 16,
                offset: 6
            }
        }
    };

    // 保存用户设置
    function handleOnSave() {

    }

    // 表单提交修改
    function handleSubmit() {
    }

    return (
        <Row>
            <Col span={16}>
                <Form onSubmit={handleSubmit} {...formItemLayout}>
                    <Form.Item hasFeedback label="昵称">
                        {
                            getFieldDecorator('nickname', {
                                rules: [{ required: true, message: '请输入昵称!' }],
                                initialValue: JSON.parse(localStorage.getItem("userInfo") as any).nickname
                            })(<Input size="small"/>)
                        }
                    </Form.Item>
                    <Form.Item hasFeedback label="介绍">
                        {
                            getFieldDecorator('introduce', {
                                initialValue: (JSON.parse(localStorage.getItem("userInfo") as any).signature)
                            })(<Input.TextArea/>)
                        }
                    </Form.Item>
                    <Form.Item label="性别">
                        {
                            getFieldDecorator('sex', {
                                rules: [{ required: true, message: '请选择性别!' }],
                                initialValue:
                                    JSON.parse(localStorage.getItem("userInfo") as any).gender === 0 ?
                                        "保密" :
                                        JSON.parse(localStorage.getItem("userInfo") as any).gender === 1 ?
                                            "男" :
                                            JSON.parse(localStorage.getItem("userInfo") as any).gender === 2 ?
                                                "女" : null
                            })(
                                <Radio.Group onChange={e => {
                                    setValue(e.target.value)
                                }}>
                                    <Radio value="保密">保密</Radio>
                                    <Radio value="男">男</Radio>
                                    <Radio value="女">女</Radio>
                                </Radio.Group>
                            )
                        }
                    </Form.Item>
                    <Form.Item label="生日">
                        {
                            getFieldDecorator('birthday', {
                                rules: [{ type: 'object', required: true, message: '请选择日期!' }],
                                initialValue: moment(JSON.parse(localStorage.getItem("userInfo") as any).birthday)
                            })(<DatePicker placeholder="请选择日期"/>)
                        }
                    </Form.Item>
                    <Form.Item label="地区">
                        {
                            getFieldDecorator('region', {
                                rules: [{ required: true, message: '请选择地区!' }]
                            })(<Cascader expandTrigger='click' options={options} placeholder='请选择地区'/>)
                        }
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button
                            className="u-btn"
                            style={{ width: "90px", marginRight: "20px" }}
                            type="danger"
                            disabled
                            onClick={handleOnSave}
                        >
                            保存
                        </Button>
                        <Button className="u-btn" style={{ width: "90px" }} onClick={() => history.go(-1)}>取消</Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={8}>
                <Avatar shape="square" size={150}
                        src={JSON.parse(localStorage.getItem("userInfo") as any).avatarUrl}/><br/>
                <p className="f-tac" style={{ width: '150px', marginTop: '20px' }}>
                    <Button className="u-btn" style={{ width: '100px' }}>修改头像</Button>
                </p>
            </Col>
        </Row>
    )
}
    ;

    export const Editor = Form.create<FormComponentProps>({ name: 'setting_editor' })(WarppedEditorform);
