export interface Iimagen {
    idImagen: number;
    idEmpresa: number;
    nomImagen: string;
    urlImagen: string;
    principal: string;
}


export interface Iarticulo {
    idEmpresa: number;
    idArticulo: string;
    nomArticulo: string;
    descripcion: string;
    precio: number;
    tipo: string;
    idUnidad: string;
    idMarca: string;
    imagenes: Iimagen[]
}

export interface IdatosCliente {
    nomCliente: string;
    telefono: string;
    direccion: string;
}

export interface Ipedido {
    idPedido: number;
    datosCliente: IdatosCliente;
    carrito: Icarrito[];
}

export interface Icarrito {
    articulo: Iarticulo;
    cantidad: number;
    importe: number;

}
