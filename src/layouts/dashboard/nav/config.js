// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Todays Orders',
    path: '/dashboard/today',
    icon: icon('ic_cart'),
  },
  {
    title: 'This Months Orders',
    path: '/dashboard/month',
    icon: icon('ic_cart'),
  },
  {
    title: 'All Orders',
    path: '/dashboard/all',
    icon: icon('ic_cart'),
  },
  {
    title: 'Search Result',
    path: '/dashboard/result',
    icon: icon('ic_search'),
  },
  {
    title: 'Commission',
    path: '/dashboard/commission',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Prices',
    path: '/dashboard/price',
    icon: icon('ic_disabled'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
