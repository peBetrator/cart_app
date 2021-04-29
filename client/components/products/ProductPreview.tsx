import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { DELETE_PRODUCT_MUTATION } from '../../graphql/mutations';
import { useStyles } from './styles';
import { ProductType } from './types';

interface ProductPreviewPropTypes extends ProductType {
  refetch: () => Promise<any>;
}

export default function ProductPreview({
  id,
  title,
  category,
  price,
  refetch,
}: ProductPreviewPropTypes): React.ReactElement {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);
  const [deleteProduct] = useMutation<ProductType>(DELETE_PRODUCT_MUTATION);
  const router: NextRouter = useRouter();

  const toggleModal = (): void => setOpen(!open);

  const handleEditProduct = (): void => {
    router.push(`/product/${id}/edit`);
  };

  const handleDeleteProduct = (): void => {
    deleteProduct({
      variables: { id },
    }).then(data => {
      toggleModal();
      refetch();
    });
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Box className={classes.actions}>
            <IconButton onClick={handleEditProduct}>
              <EditIcon style={{ color: 'orange' }} />
            </IconButton>
            <IconButton onClick={toggleModal}>
              <DeleteIcon style={{ color: 'red' }} />
            </IconButton>
          </Box>
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={toggleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={classes.paper}>
            <h2 id="transition-modal-title">Please confirm your action</h2>
            <Typography id="transition-modal-description">
              Delete {title} ({price}$)?
            </Typography>
            <Box className={classes.modalBtns}>
              <Button variant="contained" onClick={handleDeleteProduct} color="primary">
                Yed, Delete
              </Button>
              <Button onClick={toggleModal} color="primary">
                No
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
