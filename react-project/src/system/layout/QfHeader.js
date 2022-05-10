import { useDispatch } from 'react-redux'
import { Dropdown, Space, Menu, Row, Col } from 'antd'
import { GlobalOutlined }　from '@ant-design/icons'

import { toggleLang } from '@/store/actions'

export default () => {
  const dispatch = useDispatch()

  const toggle = lang => {
    dispatch(toggleLang(lang))
  }

  const menu = (
    <Menu>
      <Menu.Item key='zh' onClick={()=>toggle('zh')}>中文</Menu.Item>
      <Menu.Item key='en' onClick={()=>toggle('en')}>English</Menu.Item>
    </Menu>
  )


  return (
    <div className='header'>
      <Row>
        <Col span={2} offset={22}>
          <div style={{textAlign:'right'}}>
            <Dropdown overlay={menu} placement='bottomRight'>
              <a onClick={e => e.preventDefault()}>
                <Space>
                  <GlobalOutlined style={{fontSize:'18px',color:'white'}} />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </div>
  )
}
