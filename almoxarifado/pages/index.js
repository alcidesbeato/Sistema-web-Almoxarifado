import {
    Grid,
    Table,
    TableContainer,
    TableHead,
    Typography,
    TableRow,
    TableCell,
    TableBody,
    MenuItem,
    Select,
    Button,
  } from '@material-ui/core';
  import * as React from 'react';
  import Layout from '../components/Layout';
  import axios from 'axios'
  
  export default function cartScreen(props) {
      const [Quantidade,setQuantidade] =  React.useState();
      const cartItems=JSON.stringify(props);
      const teste = JSON.parse(cartItems);
    
      const updateCartHandler = async (item, quantity) => {
        const  data2  = await axios.get('http://localhost:3030/api/produtos');
        console.log(data2);
        if (data2.quantidade < quantity) {
          window.alert('Item fora de estoque');
          return;
        }
        else{
          setQuantidade(quantity);
        }

    }
      const removeItem = async (item) => {
        var input = document.querySelector("#"+item.nome);
        item.quantidade = input.value;
        await axios.put('http://localhost:3030/api/local/'+item.id,item);
      };
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
                        <TableCell>Nome</TableCell>
                        <TableCell align="right">Quantidade</TableCell>
                        <TableCell align="right">Remover</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teste.data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                                <Typography>{item.nome}</Typography>
                          </TableCell>
                          <TableCell align="right">
                          <Typography>{[Array(item.quantidade)]}</Typography>
                          <input
                           className="mb-4 border-b-2"
                           id={item.nome}
                           name="quantidade"
                           type="text"
                           autocomplete="quantidade"
                           required
                          />

                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => removeItem(item)}
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

  export async function getServerSideProps() {
    const { data } = await axios.get('http://localhost:3030/api/produtos');
    return {
      props: {
        data
      },
    }
  }