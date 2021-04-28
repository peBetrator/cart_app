import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utilities/theme';

export const useStyles = makeStyles({
  root: {
    margin: '2em',
    minWidth: 240,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    marginLeft: 'auto',
    '& > *': {
      cursor: 'pointer',
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center',
  },
  modalBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(3),
  },
});
