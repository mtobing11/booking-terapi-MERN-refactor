import { createTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// import components
import { Grid, Avatar, Box } from '@mui/material';
// import Raleway from '../../data/fontFamilies/Raleway-Bold.ttf';
// import CormorantGaramond from '../../data/fontFamilies/CormorantGaramond-MediumItalic.ttf';
// import Roboto from '../../data/fontFamilies/Roboto-Regular.ttf';

const themeCustom = createTheme();

themeCustom.typography.h1 = {
    fontFamily: 'Raleway, Arial', fontSize: '4rem', color: 'white', letterSpacing: '5px',
    [themeCustom.breakpoints.down('md')]:{
        fontSize: '3rem',
    },
    [themeCustom.breakpoints.down('sm')]:{
        fontSize: '2rem',
    },
}
themeCustom.typography.h2 = {
    fontFamily: 'CormorantGaramond', fontStyle: 'italic', fontSize: '2.5rem', letterSpacing: '2px', color: 'white',
    [themeCustom.breakpoints.down('md')]:{
        fontSize: '1.8rem',
    },
    [themeCustom.breakpoints.down('sm')]:{
        fontSize: '1.5rem',
    },
}
themeCustom.typography.body1 = {
    fontFamily: 'Roboto', fontSize: '1rem', letterSpacing: '2px', color: 'white',
    [themeCustom.breakpoints.down('md')]:{
        fontSize: '0.9rem',
    },
    [themeCustom.breakpoints.down('sm')]:{
        fontSize: '0.8rem',
    },
}
themeCustom.typography.body2 = {
    fontFamily: 'Roboto', fontSize: '0.7rem', fontWeight: '100', letterSpacing: '2px', color: 'white',
}

function SimpleMediaQuery(){
    const matches = useMediaQuery('(min-width:600px)');

    return <span>{`{min-width:600px} matches: ${matches}`}</span>
}

const ResponsiveBGGrid = styled(Grid)(({ theme }) => ({
    background: 'rgb(54, 91, 109)',
    minHeight: '90vh',
    [theme.breakpoints.down('md')]: {
        maxWidth: '300px',
        background: 'linear-gradient(to bottom, rgba(183, 201, 207, 1) 0%, rgba(54, 91, 109, 1) 40%)',
        marginRight: 'auto',
        marginLeft: 'auto',
        display: 'flex',
        justifyContent: 'center'
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: '250px',
        background: 'linear-gradient(to bottom, rgba(183, 201, 207, 1) 0%, rgba(54, 91, 109, 1) 40%)',
    }
}));

const ResponsiveTitleGrid = styled(Grid)(({ theme }) => ({
    display: 'flex', justifyContent: 'center', alignItems: 'center', mx: '2rem',
    [theme.breakpoints.up('md')]: {
        background: 'linear-gradient(to bottom, rgba(183, 201, 207, 1) 0%, rgba(54, 91, 109, 1) 70%)',
        marginRight: '2rem'
    }
}));

const ResponsiveAvatar = styled(Avatar)(({ theme }) => ({
    position: 'absolute', right: '50%', marginRight: '-305px', bottom: '35%', zIndex: 100, 
    width:'60px', height: '60px',
    [theme.breakpoints.down('md')]: {
        marginRight: '-260px'
    },
    [theme.breakpoints.down('sm')]: {
        marginRight: '0',
        right: '0'
    }
}))

const ResponsiveBox = styled(Box)(({ theme }) => ({
    minWidth:'400px', maxWidth: '500px',
    [theme.breakpoints.down('sm')]: {
        minWidth: '350px'
    }
}))

const CustomBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        marginTop: '5rem', 
        marginBottom: '1rem'
    }
}))

export { themeCustom, SimpleMediaQuery, ResponsiveBGGrid, ResponsiveTitleGrid, ResponsiveAvatar, ResponsiveBox, CustomBox };
