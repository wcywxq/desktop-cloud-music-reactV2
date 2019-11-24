import * as React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'

interface IProps {
  title: string,
  routerLink: string
}

const RecommandTitleWidget = (props: IProps) => {
  return (
    <Link to={props.routerLink} style={{ color: "#333" }}>
      <span style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '5px' }}>{props.title}</span>
      <Icon type="right" />
    </Link>
  )
}

export default RecommandTitleWidget