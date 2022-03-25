export interface Iimagen {
    idImagen: number;
    idEmpresa: number;
    nomImagen: string;
    urlImagen: string;
    principal: string;
}


export interface Iarticulo {
    idArticulo: string;
    idEmpresa: number;
    idCategoria: string;
    idMarca: string;
    numCatalogo: string;
    estatus: string;
    nomArticulo: string;
    descripcion: string;
    precio: number;
    tipo: string;
    idUnidad: string;
    visitas: number;
    fechaUltimaVisita: Date;
    ctdCompartido: number;
    fecha: Date;
    idUsuario: string;
    indice: number;
    estrella: string;
    rebaja: string;
    relevancia: string;
    promo: string;
    imagen: string;
}


export interface Ipedido {
    idUsuario: string;
    telefono: string;
	direccion: string;
	notas: string;
    carrito: Icarrito[];
}

export interface Icarrito {
    articulo: Iarticulo;
    precio: number;
    cantidad: number;
    importe: number;

}

/* DATOS DE LA EMPRESA */

export interface Iempresa {
    idEmpresa: number;
    SKU: string;
    razonsocial: string;
    rfc: string;
    direccion: string;
    delegacion: string;
    ciudad: string; 
    estado: string;
    pais: string;
    nomContacto: string
    telefono: string;
    celular: string;
    email: string;
    nomBanco: string;
    numTarjeta: string;
    clabe: string;
    urlTinda: string;
    urlSitioWeb: string; 
    urlFaceBook: string;
    urlYouTube: string;
    urlInstagram: string;
    urlTwitter: string;
    fecha: Date;
    estatus: string;
    visitas: number;
    fechaUtimaVisita: Date;
    descNegocio: string;
    urlImagen: string;
    ctdArticulos: number;
    ctdUsuarios: number;
}
