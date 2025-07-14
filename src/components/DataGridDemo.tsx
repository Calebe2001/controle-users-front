import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { UserRolesPermissionsService } from '../services/rolesperimissaoService';

export default function UserPermissionsList() {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const resultado = await UserRolesPermissionsService.getAll();
        setDados(resultado);
      } catch (err: any) {
        console.error(err);
        setErro(err.message || 'Erro ao carregar os dados');
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  const columns: GridColDef[] = [
    { field: 'Nome', headerName: 'Nome', width: 180 },
    { field: 'Email', headerName: 'Email', width: 180 },
    { field: 'Roles', headerName: 'Roles', width: 120 },
    { field: 'Permissao', headerName: 'Permissão', width: 140 }
  ];

  const rows = dados.map((item: any, index: number) => ({
    id: index,
    Nome: item.nome,
    Email: item.email,
    Roles: item.role_nome,
    Permissao: item.permissao
  }));

  const paginationModel: GridPaginationModel = {
    page: 0,
    pageSize: 5,
  };

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <Paper sx={{ height: 400, width: '65%', mx: 'auto', p: 1, backgroundColor: 'transparent', boxShadow: 'none' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          backgroundColor: "transparent",
          border: "none",
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            color: "white",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "white",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "white",
            fontWeight: "600",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            color: "white",
          },
          "& .MuiTablePagination-root": {
            color: "white",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "transparent",
          },
        }}
      />
    </Paper>
  );
}
