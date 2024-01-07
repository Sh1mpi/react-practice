import { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { ColumnsType } from 'antd/es/table';
import { COIN_API_KEY } from '../constants';

interface DataType {
    time: string;
    asset_id_quote: string;
    rate: number;
  }
  
  const LIMIT = 10;
  const MAX_DATA = 100;

  const columns: ColumnsType<DataType> = [
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Asset ID',
      dataIndex: 'asset_id_quote',
      key: 'asset_id_quote',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
    },
  ];
  
  export const Main = () => {
    const [data, setData] = useState<DataType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataSource, setDataSource] = useState<DataType[]>([]);

    const NextPage = () => {
      setCurrentPage((pageValue: number) => pageValue + 1);
    }

    const PreviousPage = () => {
      setCurrentPage((pageValue: number) => Math.max(pageValue - 1, 1));
    }

    const barrier = currentPage * LIMIT >= data.length
  
    const getExchangeRates = async () => {
      try {
        const response = await axios.get('https://rest.coinapi.io/v1/exchangerate/USD', {
          params: { invert: true },
          headers: { 'X-CoinAPI-Key': COIN_API_KEY }
        });
        const limitedData = response.data.rates.slice(0, MAX_DATA).map((rate: DataType) => ({
          key: rate.asset_id_quote,
          time: rate.time,
          asset_id_quote: rate.asset_id_quote,
          rate: rate.rate
        }));
        setData(limitedData);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    }
  
    useEffect(() => {
      getExchangeRates();
    }, []);
  
    useEffect(() => {
      const start = (currentPage - 1) * LIMIT;
      const end = start + LIMIT;
      setDataSource(data.slice(start, end));
    }, [currentPage, data]);

    return (
      <>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <Button onClick={PreviousPage} disabled={currentPage <= 1}>Назад</Button>
        <Button onClick={NextPage} disabled={barrier}>Вперед</Button>
        <div>Текущая страница: {currentPage}</div>
      </>
    )
}

export default Main;