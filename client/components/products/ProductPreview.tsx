import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import { ProductType } from './types';

const useStyles = makeStyles({
  root: {
    margin: '2em',
    minWidth: 275,
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
    marginBottom: 12,
  },
});

export default function ProductPreview({ id, title, category, price }: ProductType): React.ReactElement {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {category}
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {price}$
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link href={`/product/${id}`}>Learn More</Link>
        </Button>
      </CardActions>
    </Card>
  );
}