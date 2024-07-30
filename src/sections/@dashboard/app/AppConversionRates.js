import PropTypes from 'prop-types';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
// Project Import
import CancelledOrders from '../../../pages/Cancelled/CancelledOrders';

// ----------------------------------------------------------------------

AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function AppConversionRates({ title, subheader, ...other }) {
  

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        <CancelledOrders />
      </Box>
    </Card>
  );
}
