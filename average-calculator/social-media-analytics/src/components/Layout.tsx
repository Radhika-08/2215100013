import { Outlet, Link as RouterLink } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, styled } from '@mui/material';

const StyledAppBar = styled(AppBar)({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1100
});

const NavLink = styled(RouterLink)({
  color: 'white',
  textDecoration: 'none',
  marginLeft: '2rem',
  fontSize: '1rem',
  fontWeight: 500,
  opacity: 0.9,
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 1
  }
});

const MainContainer = styled(Box)({
  minHeight: '100vh',
  background: 'radial-gradient(circle, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%)',
  display: 'flex',
  flexDirection: 'column'
});

const Layout = () => {
  return (
    <MainContainer>
      <StyledAppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', minHeight: '56px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '1200px', width: '100%', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 500, color: 'white' }}>
              Social Media Analytics
            </Typography>
            <Box>
              <NavLink to="/">
                Feed
              </NavLink>
              <NavLink to="/top-users">
                Top Users
              </NavLink>
              <NavLink to="/trending-posts">
                Trending Posts
              </NavLink>
            </Box>
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: '100%'
      }}>
        <Outlet />
      </Box>
    </MainContainer>
  );
};

export default Layout;
