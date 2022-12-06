import React from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBagShopping, faCartShopping, faPeopleGroup, faUserCheck, faCalendar, faSquarePollVertical, faPenToSquare, faFillDrip, faChartLine, faChartArea, faChartColumn, faChartPie, faCoins, faChartSimple, faTriangleExclamation, faChartBar, faMicrophone, faGear } from '@fortawesome/free-solid-svg-icons'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Groups2Icon from '@mui/icons-material/Groups2';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'Overview',
        icon: <LocalMallIcon />,
        link: 'overview',
      },
    ],
  },
  {
    title: 'Pages',
    links: [
      {
        name: 'Date Control',
        icon: <CalendarMonthIcon />,
        link: 'datecontrol',
      },
      {
        name: 'List today',
        icon: <PeopleAltIcon />,
        link: 'display1',
      },
      {
        name: 'List tomorrow',
        icon: <Groups2Icon />,
        link: 'display2',
      },
      {
        name: 'Message Control',
        icon: <CampaignIcon />,
        link: 'messagecontrol',
      },
      {
        name: 'Initial Setup',
        icon: <SettingsSuggestIcon />,
        link: 'initialsetup',
      },
    ],
  },
];

// export const linksOriginal = [
//   {
//     title: 'Dashboard',
//     links: [
//       {
//         name: 'ecommerce',
//         icon: <FontAwesomeIcon icon={faBagShopping} />,
//       },
//     ],
//   },

//   {
//     title: 'Pages',
//     links: [
//       {
//         name: 'orders',
//         icon: <FontAwesomeIcon icon={faCartShopping} />,
//       },
//       {
//         name: 'employees',
//         icon: <FontAwesomeIcon icon={faPeopleGroup} />,
//       },
//       {
//         name: 'customers',
//         icon: <FontAwesomeIcon icon={faUserCheck} />,
//       },
//     ],
//   },
//   {
//     title: 'Apps',
//     links: [
//       {
//         name: 'calendar',
//         icon: <FontAwesomeIcon icon={faCalendar} />,
//       },
//       {
//         name: 'kanban',
//         icon: <FontAwesomeIcon icon={faSquarePollVertical} />,
//       },
//       {
//         name: 'editor',
//         icon: <FontAwesomeIcon icon={faPenToSquare} />,
//       },
//       {
//         name: 'color-picker',
//         icon: <FontAwesomeIcon icon={faFillDrip} />,
//       },
//     ],
//   },
//   {
//     title: 'Charts',
//     links: [
//       {
//         name: 'line',
//         icon: <FontAwesomeIcon icon={faChartLine} />,
//       },
//       {
//         name: 'area',
//         icon: <FontAwesomeIcon icon={faChartArea} />,
//       },

//       {
//         name: 'bar',
//         icon: <FontAwesomeIcon icon={faChartColumn} />,
//       },
//       {
//         name: 'pie',
//         icon: <FontAwesomeIcon icon={faChartPie} />,
//       },
//       {
//         name: 'financial',
//         icon: <FontAwesomeIcon icon={faCoins} />,
//       },
//       {
//         name: 'color-mapping',
//         icon: <FontAwesomeIcon icon={faChartSimple} />,
//       },
//       {
//         name: 'pyramid',
//         icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
//       },
//       {
//         name: 'stacked',
//         icon: <FontAwesomeIcon icon={faChartBar} />,
//       },
//     ],
//   },
// ];