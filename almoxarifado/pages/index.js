import {
    Grid,
    Table,
    TableContainer,
    TableHead,
    Typography,
    TableRow,
    TableCell,
    TableBody,
    Link,
    MenuItem,
    Select,
    Button,
    Card,
    ListItem,
    List,
  } from '@material-ui/core';
  import React, { useContext } from 'react';
  import Layout from '../components/Layout';
  import { Store } from '../utils/Store';
  import NextLink from 'next/link';
  import Image from 'next/image';
  import axios from 'axios'
  
  export default function cartScreen() {
      const { state,dispatch } = useContext(Store)
      const {
        cart: { cartItems },
      } = state;
      const updateCartHandler= async (item,quantity) =>{
          const { data } = await axios.get(`localhost:3030/api/produto`);
          if (data.countInStock <  quantity) {
            window.alert('Item fora de estoque');
            return;
          }
          dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity},
          });
      }
      const removeItemHandler = (item) =>{
          dispatch({type:'CART_REMOVE_ITEM', payload: item });
      }
      return (
        <Layout title="Produtos">
          <Typography component="h1" variant="h1">
            Produtos
          </Typography>
            <Grid container spacing={1}>
              <Grid item md={9} xs={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Imagen</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell align="right">Quantidade</TableCell>
                        <TableCell align="right">Remover</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </NextLink>
                          </TableCell>
  
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <Select
                              value={item.quantity}
                              onChange={(e) =>
                                updateCartHandler(item, e.target.value)
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => removeItemHandler(item)}
                            >
                              x
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
        </Layout>
      );
  }