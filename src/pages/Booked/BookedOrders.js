import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SleighHeadTable from './SleighHeadTable';
import DevanHeadTable from './DevanHeadTable';
import MattressHeadTable from './MattressHeadTable';

const BookedOrders = () => {
  const [orderType, setOrderType] = useState('sleigh');
  const [timeRange, setTimeRange] = useState('weekly');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/orders/booked/${orderType}/${timeRange}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [orderType, timeRange]);

  const handleProductTypeChange = (event, newProductType) => {
    if (newProductType !== null) {
      setOrderType(newProductType);
    }
  };

  const handleTimeRangeChange = (event, newTimeRange) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  return (
    <div>
      <ToggleButtonGroup value={orderType} exclusive onChange={handleProductTypeChange}>
        <ToggleButton value="divan">Divan</ToggleButton>
        <ToggleButton value="sleigh">Sleigh</ToggleButton>
        <ToggleButton value="mattress">Mattress</ToggleButton>
      </ToggleButtonGroup>

      <ToggleButtonGroup value={timeRange} exclusive onChange={handleTimeRangeChange}>
        <ToggleButton value="weekly">Weekly</ToggleButton>
        <ToggleButton value="monthly">Monthly</ToggleButton>
        <ToggleButton value="all">All</ToggleButton>
      </ToggleButtonGroup>

      {orderType === 'divan' && <DevanHeadTable orders={orders} />}
      {orderType === 'sleigh' && <SleighHeadTable orders={orders} />}
      {orderType === 'mattress' && <MattressHeadTable orders={orders} />}
    </div>
  );
};

export default BookedOrders;
