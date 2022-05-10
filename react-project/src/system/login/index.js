import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, Checkbox } from 'antd'

import { login, logout } from '@/store/actions'

export default () => {

  const dispatch = useDispatch()

  const submit = (values) => {
    // console.log('登录', values)
    dispatch(login(values))
  }

  useLayoutEffect(()=>{
    dispatch(logout())
  }, [])

  return (
    <div className='login'>
      <div className='wrap'>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          initialValues={{
            remember: true,
          }}
          onFinish={submit}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '用户名是必填字段!' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密 码"
            name="password"
            rules={[
              { required: true, message: '密码是必填字段!' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 4, span: 16 }}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 4, span: 16 }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
