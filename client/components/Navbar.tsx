import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Home from '@material-ui/icons/Home';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navbarDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`,
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `white`,
    },
  }),
);

export default function Navbar({ children }): React.ReactElement {
  const classes = useStyles();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="md" className={classes.navbarDisplayFlex}>
            <Link href="/" passHref>
              <IconButton edge="start" color="inherit" aria-label="home">
                <Home fontSize="large" />
              </IconButton>
            </Link>
            <List component="nav" aria-labelledby="main navigation" className={classes.navbarDisplayFlex}>
              <Link href="/product/add" passHref>
                <Button className={classes.linkText}>Add Product</Button>
              </Link>
              <Link href="/category/add" passHref>
                <Button className={classes.linkText}>Add Category</Button>
              </Link>
            </List>
          </Container>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
}
