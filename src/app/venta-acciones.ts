import { Iarticulo, Icarrito, IdatosCliente, Ipedido } from "./modelo-db";
import { ServiciosService } from "./servicios.service";

export class VentaAcciones {
    private cantidad: number;
    private _articulo: Iarticulo;
    private _carrito: Icarrito[];

    constructor(private pArticulo: Iarticulo, private pCarrito: Icarrito[], private _servicios: ServiciosService){
        this._articulo = pArticulo;
        this._carrito = pCarrito;
    }

    addCarrito(pCantidad: number): Icarrito[] {

        let carritoNuevo :Icarrito = {articulo: null, cantidad: 0, importe: 0.00};

        // busco si ya existe en el listado de carrito.
        carritoNuevo = this.getCarrito();
        if (carritoNuevo) 
            this._carrito = this.updCarrito(pCantidad);        
        else {
            carritoNuevo = {articulo: this._articulo, cantidad: pCantidad, importe: this._articulo.precio * pCantidad};
            this._carrito.push(carritoNuevo);
        }

        /*
        if (this._carrito) {
                // busco si ya existe en el listado de carrito.
                carritoNuevo = this.getCarrito();
                if (carritoNuevo) 
                this._carrito = this.updCarrito(pCantidad);        
                else {
                    carritoNuevo = {articulo: this._articulo, cantidad: pCantidad};
                    this._carrito.push(carritoNuevo);
                }
        } else {
            carritoNuevo = {articulo: this._articulo, cantidad: pCantidad};
            this._carrito.push(carritoNuevo);
        }
        */
        
        return this._carrito;
    }

    getCarrito(): Icarrito {
        return this._carrito.filter(x => x.articulo.idArticulo == this._articulo.idArticulo)[0]
    }

    updCarrito(pCantidad: number): Icarrito[] {
        return this._carrito.map(x => {
            if (x.articulo.idArticulo== this._articulo.idArticulo) {
                x.cantidad = pCantidad;
                x.importe = x.articulo.precio * pCantidad;
            }
                
            return x;
        });
    }

    delCarrito(): Icarrito[] {
        return this._carrito.filter(x => x.articulo.idArticulo != this._articulo.idArticulo);
    }

    importeArticulo(){
        return this._carrito
        .filter(x=> x.articulo.idArticulo == this._articulo.idArticulo)
        .map(x=> x.importe);
    }

    importeVenta() {
        return this._carrito.reduce((total, item) => total + item.importe, 0);
    }

    generarPedido(datosCliente: IdatosCliente): string {
        let pedido: Ipedido = {idPedido: 0, datosCliente: datosCliente, carrito: this._carrito};

        // SE CREA LA CADENA STRING PARA ENVIAR POR WHATSAPP
        let nomCliente: string = pedido.datosCliente.nomCliente;
        let Direccion: string = pedido.datosCliente.direccion;
        let telefono: string = pedido.datosCliente.telefono;

        return telefono +"&text=" + "hola%20" + "Soy%20"+ nomCliente + "%0A"
                                + "Favor%20de%20surtir%20el%20siguiente%20pedido:"+ "%0A";

        // this._servicios.wsWhatsApp(mensaje);


        // GUARDAR PEDIDO EN BASE DE DATOS.
    }

}
