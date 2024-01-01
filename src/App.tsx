import { ColumnsType } from 'antd/es/table';
import './App.css'
import { Table } from 'antd';

function App() {

  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }
  
  // Использование
  
  const dataSource: DataType[] = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
      tags: ['good man']
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
      tags: ['bad man']
    },
  ];
  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
    },
  ];
  
  return (
    <Table dataSource={dataSource} columns={columns} />
  )
}

export default App
