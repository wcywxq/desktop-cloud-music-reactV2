import * as React from 'react'
import { Table, Tag, Divider } from 'antd';

export const Radio: React.FC = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: React.ReactNode) => <a>{text}</a>
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags: { map: (arg0: (tag: any) => JSX.Element) => React.ReactNode; }) => (
                <span>
          {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                  color = 'volcano';
              }
              return (
                  <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                  </Tag>
              );
          })}
        </span>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_text: any, record: { name: React.ReactNode; }) => (
                <span>
          <a>Invite {record.name}</a>
          <Divider type="vertical"/>
          <a>Delete</a>
        </span>
            )
        }
    ];

    const dataText = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer']
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser']
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher']
        }
    ];

    return (
        <Table columns={columns} dataSource={dataText}/>
    )
}
