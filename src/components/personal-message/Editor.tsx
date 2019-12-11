import * as React from 'react'
import { useState } from "reinspect";
import { Form, Input, Radio, DatePicker, Cascader, Row, Col } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import { useEffect } from "react";
import axios from 'axios';
const WarppedEditorform: React.FC<FormComponentProps> = props => {
    const { form } = props;

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

    // 表单提交修改
    function handleSubmit() {
    }

    useEffect(() => {
        axios.get('http://localhost:5001/regions').then(res => {
            console.log(res.data);
        });
    })

    return (
        <Row>
            <Col span={16}>
                <Form onSubmit={handleSubmit} {...formItemLayout}>
                    <Form.Item hasFeedback label="昵称">
                        {
                            getFieldDecorator('nickname', {
                                rules: [{ required: true, message: '请输入昵称!' }]
                            })(<Input size="small"/>)
                        }
                    </Form.Item>
                    <Form.Item hasFeedback label="介绍">
                        {
                            getFieldDecorator('introduce')(<Input.TextArea/>)
                        }
                    </Form.Item>
                    <Form.Item label="性别">
                        {
                            getFieldDecorator('sex', {
                                rules: [{ required: true, message: '请选择性别!' }],
                                initialValue: '保密'
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
                                rules: [{ type: 'object', required: true, message: '请选择日期!' }]
                            })(<DatePicker placeholder="请选择日期"/>)
                        }
                    </Form.Item>
                    <Form.Item label="地区">
                        {
                            getFieldDecorator('region', {
                                rules: [{ type: 'object', required: true, message: '请选择地区!' }]
                            })(<Cascader/>)
                        }
                    </Form.Item>
                </Form>
            </Col>
            <Col span={8}>

            </Col>
        </Row>
    )
};

export const Editor = Form.create<FormComponentProps>({ name: 'setting_editor' })(WarppedEditorform);
