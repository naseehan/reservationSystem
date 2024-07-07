import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
const { Option } = Select;
import '../stylePages/adminDashboard/App.css'

const AdminDashboard = () => {
  const [form] = Form.useForm();
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState('');

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  const disabledDate = (current) => {
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  const onFinish = async (values) => {
    try {
      const { DatePicker: selectedDate, Select: status, roomNumber } = values;
      const date = selectedDate.format('YYYY-MM-DD');

      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/rooms/${roomNumber}/status-by-date`,
        { date, status }
      );

      toast({
        title: 'Success',
        description: 'Room status updated successfully!',
        status: 'success',
        isClosable: true,
        position: 'top-right',
      });

      form.resetFields();
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 500) {
        setErrorMessage('Internal server error');
      } else {
        setErrorMessage('An error occurred. Please check your internet connection');
      }

      toast({
        title: errorMessage,
        description: 'Failed to update room status.',
        status: 'error',
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '0 20px',
        backgroundColor: '#f0f2f5',
      }}
    >
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Form
          {...formItemLayout}
          form={form}
          name="adminForm"
          onFinish={onFinish}
          initialValues={{
            DatePicker: null,
            Select: undefined,
            roomNumber: undefined,
            employeeName: '',
            employeeId: '',
          }}
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h1 style={{ marginBottom: '20px', fontSize: '24px', textAlign: 'center' }}>
            Update Room Status
          </h1>

          <FormControl mb="4">
            <FormLabel>Select a Date</FormLabel>
            <Form.Item
              name="DatePicker"
              rules={[
                {
                  required: true,
                  message: 'Please select a date!',
                },
              ]}
            >
              <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
            </Form.Item>
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Room Number</FormLabel>
            <Form.Item
              name="roomNumber"
              rules={[
                {
                  required: true,
                  message: 'Please select a Room Number!',
                },
              ]}
            >
              <Select placeholder="Select Room Number" allowClear>
                {[...Array(10)].map((_, index) => (
                  <Option key={index + 1} value={`${index + 1}`}>
                    {index + 1}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Room Status</FormLabel>
            <Form.Item
              name="Select"
              rules={[
                {
                  required: true,
                  message: 'Please select a status!',
                },
              ]}
            >
              <Select placeholder="Select Room Status" allowClear>
                <Option value="Available">Available</Option>
                <Option value="Booked">Booked</Option>
                <Option value="Closed For Maintenance">Closed For Maintenance</Option>
              </Select>
            </Form.Item>
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Employee Name</FormLabel>
            <Form.Item
              name="employeeName"
              rules={[
                {
                  required: true,
                  message: 'Please enter the employee name!',
                },
                {
                  pattern: /^[a-zA-Z ]{2,30}$/,
                  message: 'Employee name must be 2-30 characters and only letters!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Employee ID</FormLabel>
            <Form.Item
              name="employeeId"
              rules={[
                {
                  required: true,
                  message: 'Please enter the employee ID!',
                },
                {
                  pattern: /^[0-9]{6,10}$/,
                  message: 'Employee ID must be 6-10 characters and numbers!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </FormControl>

          <Button type="primary" htmlType="submit" mb="4" style={{ width: '100%' }}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AdminDashboard;
