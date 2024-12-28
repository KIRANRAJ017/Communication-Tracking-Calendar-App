import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, message } from 'antd';
import axios from 'axios';

const AdminDashboard = () => {
  const [companyData, setCompanyData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Fetch company data on load
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = () => {
    axios.get('http://localhost:8000/admin').then((response) => {
      setCompanyData(response.data);
    });
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      if (values.periodicity) {
        values.periodicity = values.periodicity.toISOString();
      }

      axios.post('http://localhost:8000/admin', values).then((response) => {
        setCompanyData((prev) => [...prev, response.data]);
        setIsModalOpen(false);
        message.success('Company added successfully');
      });
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/admin/${id}`).then(() => {
      setCompanyData((prev) => prev.filter((item) => item._id !== id));
      message.success('Company deleted successfully');
    });
  };

  const handleAdd = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'LinkedIn Profile', dataIndex: 'linkedin', key: 'linkedin' },
    {
      title: 'Emails',
      dataIndex: 'emails',
      key: 'emails',

    },
    {
      title: 'Phones',
      dataIndex: 'phones',
      key: 'phones',
    },
    { title: 'Comments', dataIndex: 'comments', key: 'comments' },
    {
      title: 'Communication Periodicity',
      dataIndex: 'periodicity',
      key: 'periodicity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" danger onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Company Management</h1>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Company
      </Button>
      <Table columns={columns} dataSource={companyData} rowKey="_id" />

      <Modal
        title="Add Company"
        visible={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter the company name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="location" label="Location">
            <Input />
          </Form.Item>
          <Form.Item name="linkedin" label="LinkedIn Profile">
            <Input />
          </Form.Item>
          <Form.Item name="emails" label="Emails">
            <Input placeholder="Separate multiple emails with commas" />
          </Form.Item>
          <Form.Item name="phones" label="Phones">
            <Input placeholder="Separate multiple phone numbers with commas" />
          </Form.Item>
          <Form.Item name="comments" label="Comments">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="periodicity"
            label="Communication Periodicity"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
