import React, { useEffect } from 'react';
import { Modal, Form, Input, Radio, Icon, Checkbox, Button, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { Link } from 'react-router-dom';

interface UserComponentProps extends FormComponentProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const WrappedLoginForm: React.FC<UserComponentProps> = (props) => {
    const { visible, setVisible, form } = props;
    /**
     * 1. getFieldDecorator 用于和表单进行双向绑定
     * 2. validateFields 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
     */
    const { getFieldDecorator, validateFields } = form;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }

    return (
        <Modal
            visible={visible}
            title={<span className="f-tac">登陆</span>}
            onCancel={() => setVisible(false)}
            width={400}
            footer={null}
        >
            <Form onSubmit={handleSubmit}>
                <Form.Item hasFeedback>
                    {
                        getFieldDecorator('phoneNumber', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入正确的手机号!',
                                    max: 11,
                                    pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
                                }
                            ]
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                addonBefore={
                                    getFieldDecorator('prefix', {
                                        initialValue: '86'
                                    })(
                                        <Select style={{ width: 70 }}>
                                            <Select.Option value="86">+86</Select.Option>
                                            <Select.Option value="87">+87</Select.Option>
                                        </Select>
                                    )
                                }
                                placeholder="请输入手机号"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item hasFeedback>
                    {
                        getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }]
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                                type="password"
                                placeholder="请输入密码"
                            />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    {
                        getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(<Checkbox>记住密码</Checkbox>)
                    }
                    <Link to="" style={{ float: "right" }}>
                        忘记密码？
                    </Link>
                    <Button type="primary" htmlType="submit" block>
                        登陆
                    </Button>
                    或者 <Link to="">去注册！</Link>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export const Login = Form.create<UserComponentProps>({ name: 'login' })(WrappedLoginForm);


// const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
//   // eslint-disable-next-line
//   class extends React.Component {
//     render() {
//       const { visible, onCancel, onCreate, form } = this.props;
//       const { getFieldDecorator } = form;
//       return (
//         <Modal
//           visible={visible}
//           title="Create a new collection"
//           okText="Create"
//           onCancel={onCancel}
//           onOk={onCreate}
//         >
//           <Form layout="vertical">
//             <Form.Item label="Title">
//               {getFieldDecorator('title', {
//                 rules: [{ required: true, message: 'Please input the title of collection!' }],
//               })(<Input />)}
//             </Form.Item>
//             <Form.Item label="Description">
//               {getFieldDecorator('description')(<Input type="textarea" />)}
//             </Form.Item>
//             <Form.Item className="collection-create-form_last-form-item">
//               {getFieldDecorator('modifier', {
//                 initialValue: 'public',
//               })(
//                 <Radio.Group>
//                   <Radio value="public">Public</Radio>
//                   <Radio value="private">Private</Radio>
//                 </Radio.Group>,
//               )}
//             </Form.Item>
//           </Form>
//         </Modal>
//       );
//     }
//   },
// );

// class CollectionsPage extends React.Component {
//   state = {
//     visible: false,
//   };

//   showModal = () => {
//     this.setState({ visible: true });
//   };

//   handleCancel = () => {
//     this.setState({ visible: false });
//   };

//   handleCreate = () => {
//     const { form } = this.formRef.props;
//     form.validateFields((err, values) => {
//       if (err) {
//         return;
//       }

//       console.log('Received values of form: ', values);
//       form.resetFields();
//       this.setState({ visible: false });
//     });
//   };

//   saveFormRef = formRef => {
//     this.formRef = formRef;
//   };

//   render() {
//     return (
//       <div>
//         <Button type="primary" onClick={this.showModal}>
//           New Collection
//         </Button>
//         <CollectionCreateForm
//           wrappedComponentRef={this.saveFormRef}
//           visible={this.state.visible}
//           onCancel={this.handleCancel}
//           onCreate={this.handleCreate}
//         />
//       </div>
//     );
//   }
// }
