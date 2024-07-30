import PropTypes from 'prop-types';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import BookedOrders from '../../../pages/Booked/BookedOrders';
// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppWebsiteVisits({ title, subheader, ...other }) {

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <BookedOrders/>
        </Box>
    </Card>
  );
}
