import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, message } from 'antd';

function UserPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/user') 
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching companies:', error);
        message.error('Failed to fetch companies. Please try again.');
      });
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'LinkedIn', dataIndex: 'linkedin', key: 'linkedin' },
    { title: 'Emails', dataIndex: 'emails', key: 'emails' },
    { title: 'Phones', dataIndex: 'phones', key: 'phones' },
    { title: 'Comments', dataIndex: 'comments', key: 'comments' },
    { title: 'Periodicity', dataIndex: 'periodicity', key: 'periodicity' },
  ];

  return (
    <div>
      <h1>User Page: List of Companies</h1>
      <Table 
        dataSource={companies} 
        columns={columns} 
        rowKey="_id"
      />
    </div>
  );
}

export default UserPage;
