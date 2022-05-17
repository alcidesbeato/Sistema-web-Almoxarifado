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

  export default function Almoxarifado(props) {

      const Produtos=JSON.stringify(props);
      const ArrProdutos = JSON.parse(Produtos);

      const MoverItem = async (item) => {
        var input = document.querySelector("#"+item.nome);

        if(input.value > item.quantidade)
          alert("Valor invalido")
        else{
          let value = parseInt(input.value,10);
          let quantidadetotalAlmoxarifado = (item.quantidade - value);
          const qtdAlm = parseInt(quantidadetotalAlmoxarifado,10);
          const id = item.id;
          const idString = id.toString();        

          const jsonAlmoxarifado = {
            id : idString,
            nome: item.nome,
            quantidade : qtdAlm,
            quantidadeAnterior: value
          };

          await axios.put('http://localhost:3030/api/estoque/deposito',jsonAlmoxarifado);
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
                      {ArrProdutos.data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                                <Typography>{item.nome}</Typography>
                          </TableCell>
                          <TableCell align="right">
                          <Typography>qtd no almoxarifado={item.quantidade}</Typography>
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