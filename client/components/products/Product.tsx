import { useReducer } from 'react';

import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import theme from '../../utilities/theme';
import { ProductPropTypes, ProductType } from './types';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  error: {
    color: 'red',
  },
});

const initialState = {
  title: '',
  category: '',
  price: '',
};

const Product = ({ categories, product, isEdit, submitMutation }: ProductPropTypes): React.ReactElement => {
  const classes = useStyles();
  const [state, setFieldValue] = useReducer(
    (state, { field, value }) => ({ ...state, [field]: value }),
    product || initialState,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFieldValue({ field: event.target.name, value: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
    event.preventDefault();
    const { id, title, price, category } = state;
    const product = {
      title,
      category,
      price: +price,
    };

    const variables = isEdit ? { id, product } : { product };

    submitMutation({
      variables,
    }).then(({ data }) => {
      const { updateProduct } = data as { updateProduct: ProductType };

      Object.keys(initialState).forEach(field => {
        const value = isEdit ? updateProduct[field] : initialState[field];
        setFieldValue({ field, value });
      });
    });
  };

  return (
    <Container maxWidth="sm">
      <form className={classes.root}>
        <TextField required id="title" name="title" label="Product Title" onChange={handleChange} value={state.title} />
        <FormControl>
          <InputLabel required id="category-select-label">
            Category
          </InputLabel>
          <Select id="category" name="category" onChange={handleChange} value={state.category}>
            {!!categories.length &&
              categories.map(({ title }, index) => (
                <MenuItem key={index} value={title}>
                  {title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          required
          id="price"
          name="price"
          type="number"
          label="Price"
          onChange={handleChange}
          value={state.price}
        />
        <Button type="submit" variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
          {isEdit ? 'Edit Product' : 'Add Product'}
        </Button>
      </form>
    </Container>
  );
};

export default Product;
