import React from 'react';
import { user } from 'api';
import { Form, Input, Button, Checkbox } from 'antd';
import './index.scss';

const SignUp = () => {
  const onFinish = async (values) => {
    try {
      user.create(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='root'>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
        >
          <Input
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="username"
        >
          <Input
            placeholder="Username"
          />
        </Form.Item>

        <Form.Item
          name="password"
        >
          <Input.Password
            placeholder='Password'
          />
        </Form.Item>

        <Form.Item
          name="confirm"
        >
          <Input.Password
            placeholder='Confirm password'
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
