import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import axios from 'axios';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';
import { useAuth } from '../sections/auth/login/AuthContext';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const { waleedState } = useAuth();

  const inlineStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '2rem',
      backgroundColor: '#f2e0ff', // Light violet background
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    select: {
      marginBottom: '1rem',
      minWidth: '200px'
    },
    button: {
      minWidth: '100px',
      backgroundColor: '#6200ea', // Violet button color
      color: 'white',
      marginTop: '1rem'
    }
  };
  const [count, setCount] = useState(null);

  useEffect(() => {
      // Function to fetch count of documents from backend
      const fetchUserCount = async () => {
          try {
              const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/users/count`);
              setCount(response.data.count);
          } catch (error) {
              console.error('Error fetching user count:', error);
          }
      };

      fetchUserCount();
  }, []);
  const [totalSales, setTotalSales] = useState(null);

  useEffect(() => {
      const fetchSales = async () => {
          try {
              // Fetching DevanModel data
              const devanResponse = await axios.get(`${process.env.REACT_APP_API_HOST}/api/devan/booked`);
              const devanSales = devanResponse.data.reduce((acc, order) => acc + parseFloat(order.sprice), 0);

              // Fetching SleighModel data
              const sleighResponse = await axios.get(`${process.env.REACT_APP_API_HOST}/api/sleigh/booked`);
              const sleighSales = sleighResponse.data.reduce((acc, order) => acc + parseFloat(order.sprice), 0);

              // Calculating total sales
              const total = devanSales + sleighSales;
              setTotalSales(total);
              console.log(total)
          } catch (error) {
              console.error('Error fetching sales:', error);
          }
      };

      fetchSales();
  }, []);

  // Function to format the number according to the specified conditions
  const formatNumber = (num) => num < 1000 ? num.toFixed(2) : `${(num / 1000).toFixed(2)  }k`;


  const stopServer = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_HOST}/stop-server`);
    } catch (error) {
      console.error('Error stopping server:', error.message);
    }
  };

  // Function to show number of Orders This Month
  const [totalItemsOrderedThisMonth, setTotalItemsOrderedThisMonth] = useState(0);

  useEffect(() => {
    // Fetch total number of items ordered this month from the backend API
    const fetchOrders = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_HOST}/api/ordermonthly`)
      .then(response => {
        // Set the total number of items ordered this month to the state
        setTotalItemsOrderedThisMonth(response.data.totalItemsOrderedThisMonth);
        console.log(totalItemsOrderedThisMonth);
      })
    } catch (error){
      console.error('Error fetching total items ordered this month:', error);
    }
  }
    fetchOrders();
  }, [totalItemsOrderedThisMonth]);
  


  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
      {waleedState && (
      <Button
      variant="contained"
      style={inlineStyles.button}
      onClick={stopServer}
    >
      ShutDown Server
    </Button>
      )}
    

        <Grid container spacing={3}>

        <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Monthly Sales" total={totalSales !== null ? formatNumber(totalSales) : null} icon={'ant-design:android-filled'} />
        </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Active Sellers" total={count} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={totalItemsOrderedThisMonth} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title="Booked Orders"
              subheader=""
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppConversionRates
              title="Cancelled Orders"
              subheader=""
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> 

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
