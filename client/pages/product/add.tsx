import { useMutation } from '@apollo/client';
import { GetStaticProps } from 'next';
import { useReducer } from 'react';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { ADD_PRODUCT_MUTATION } from 'graphql/mutations';
import { CATEGORIES_QUERY } from 'graphql/queries';
import { initializeApollo } from 'utilities/apolloClient';
import theme from 'utilities/theme';

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
});

const initialState = {
  title: '',
  category: '',
  price: undefined,
};

const AddProduct = ({ categories }): React.ReactElement => {
  const classes = useStyles();
  const [state, dispatch] = useReducer((state, { field, value }) => ({ ...state, [field]: value }), initialState);
  const [createPost] = useMutation(ADD_PRODUCT_MUTATION, {
    onCompleted(data) {
      Object.keys(initialState).map(field => dispatch({ field, value: initialState[field] }));
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({ field: event.target.name, value: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>): void => {
    event.preventDefault();
    const { price, ...rest } = state;
    const product = {
      price: +price,
      ...rest,
    };

    createPost({
      variables: { product },
    });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit} className={classes.root}>
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
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Add Product
        </Button>
      </form>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const {
    data: { categories },
    errors,
  } = await apolloClient.query({
    query: CATEGORIES_QUERY,
  });
  if (errors) console.warn(errors);

  return {
    props: {
      categories,
    },
  };
};

export default AddProduct;
