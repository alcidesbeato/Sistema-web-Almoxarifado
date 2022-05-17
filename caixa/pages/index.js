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

export default function Caixa(props) {

    const Produtos = JSON.stringify(props);
    const ArrProdutos = JSON.parse(Produtos);
  
    const removeItem = async (item) => {
      var input = document.querySelector("#"+item.nome);

      if(input.value >item.quantidade){
        alert("Valor invalido");
      }
      else{
        let value = parseInt(input.value,10);
        let quantidadeTotal = (item.quantidade - value);
        const qtd = parseInt(quantidadeTotal,10);
        const id = item.id;
        const idString = id.toString();

        const json ={
          id: idString,
          nome: item.nome,
          quantidade: qtd,
        }
        await axios.put('http://localhost:3030/api/local/caixa',json);
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
                      <TableCell align="right">Remover</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ArrProdutos.data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                              <Typography>{item.nome}</Typography>
                        </TableCell>
                        <TableCell align="right">
                        <Typography>quantidade na prateleira={item.quantidade}</Typography>
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
  const { data } = await axios.get('http://localhost:3030/api/local');
  return {
    props: {
      data
    },
  }
}