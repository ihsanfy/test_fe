import './App.css';
import { Button, Form, Table, Row } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalForm from './components/Modal';


function App() {

  const [show, setShow] = useState(false);
  const [formData] = Form.useForm();
  const [filter, setFilter] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const [flag, setFlag] = useState(1);

  const fetchData = async() => {
    const response = await axios.get(`http://localhost:8080/getDataUser/all`);
    setDataUser(response.data);
  }

  useEffect (() => {
    fetchData()
  },[flag])

  async function handleDelete(id) {
    axios.delete(`http://localhost:8080/delDataUser/${id}`)
      .then(response => {
        console.log(response.data);
        setFlag((prev) => prev + 1)
      })
      .catch(error => {
        console.error('Error:', error.message);
      });

    formData.resetFields();
    setShow(false)
  }

  const columns = [
    {
      title: 'Nama Panjang',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (data, record, index) => {
        return(
          <>
            <Button
              className={`${record?.status?.toLowerCase()}`}
            >
              {data}
            </Button>
          </>
        )
      }
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      render: (data, record, index) => {
        return (
          <>
            <Button
              type="primary"
              danger
              onClick={() => handleDelete(record.user_id)}
            >
              Delete
            </Button>
          </>
        )
      }
    },
  ];

  async function handleSubmit() {
    const values = await formData.validateFields();
    const payload = {
      namalengkap: values.namalengkap,
      username: values.username,
      password: values.password,
      status: values.status ,
    };
    axios.post(`http://localhost:8080/setDataUser`, payload)
      .then(response => {
        console.log(response.data);
        setFlag((prev) => prev + 1)
      })
      .catch(error => {
        console.error('Error:', error.message);
      });

    formData.resetFields();
    setShow(false)
  }

  const handleCancel = () => {
    setShow(false)
    formData.resetFields();
  }

  const onShow = () => {
    setShow(true);
    formData.resetFields();
  }

  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  
  const filteredData = !filter
    ? dataUser
    : dataUser.filter((data) =>
        data?.name?.toLowerCase().includes(filter?.toLowerCase())
      );
      
  return (
    <>
      <ModalForm formData={formData} handleCancel={handleCancel} handleSubmit={handleSubmit} show={show} />
      <div className="App">
        <Row justify={'space-between'} style={{marginBottom: "14px"}}>
          <input
            type="text"
            placeholder="Search"
            value={filter}
            onChange={handleChange}
            className="search-btn"
          />
          <Button type="primary" onClick={onShow}>Add Data</Button>
        </Row>
        <Table dataSource={filteredData} columns={columns} />
      </div>
    </>
  );
}

export default App;
