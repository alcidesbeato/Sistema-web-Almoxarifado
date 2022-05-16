import {
    Grid,
    Table,
    TableContainer,
    TableHead,
    Typography,
    TableRow,
    TableCell,
    TableBody,
    Button,
  } from '@material-ui/core';
  import * as React from 'react';
  import Layout from '../components/Layout';
  import axios from 'axios'
  
  export default function cartScreen(props) {

      const cartItems=JSON.stringify(props);
      const teste = JSON.parse(cartItems);

      const MoverItem = async (item) => {
        var input = document.querySelector("#"+item.nome);
        var auxQuantidade = item.quantidade;
        if(input.value > auxQuantidade)
        alert("Valor invalido")
        else{
          let value = parseInt(input.value,10);
          let quantidadetotalAlmoxarifado = (item.quantidade - value);
          console.log('quantidade total:',quantidadetotalAlmoxarifado);

          const qtdPt = parseInt(quantidadetotalAlmoxarifado,10);
          const id = item.id;
          const sla = id.toString();

          const { data2 } = await axios.get('http://localhost:3030/api/local/id',id);
          const teste1=JSON.stringify(data2);
          const teste2 = JSON.parse(teste1);
          console.log('teste='+teste2);
        

        const jsonPrateleira = {
          id : sla,
          nome: item.nome,
          quantidade : qtdPt,
        };

        const jsonAlmoxarifado = {
          id : sla,
          nome: item.nome,
          quantidade : qtdAlm,
        };

        await axios.put('http://localhost:3030/api/estoque/',jsonAlmoxarifado);
        await axios.put('http://localhost:3030/api/local/',jsonPrateleira);
      }
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
                        <TableCell align="right">Mover</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {teste.data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                                <Typography>{item.nome}</Typography>
                          </TableCell>
                          <TableCell align="right">
                          <Typography>{item.quantidade}</Typography>
                          <input
                           className="mb-4 border-b-2"
                           id={item.nome}
                           name="quantidade"
                           type="text"
                           autoComplete="quantidade"
                           required
                          />

                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => MoverItem(item)}
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
    const { data } = await axios.get('http://localhost:3030/api/estoque');
    return {
      props: {
        data
      },
    }
  }