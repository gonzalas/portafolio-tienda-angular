import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Products } from "../interfaces/products.interface";

@Injectable({
  providedIn: "root",
})
export class ProductosService {
  cargando: boolean = true;
  productos: Products[] = [];
  productosFiltrados: Products[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http
        .get("https://angular-curso-udemy.firebaseio.com/productos_idx.json")
        .subscribe((resp: Products[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }

  obtenerProducto(id: string) {
    return this.http.get(
      `https://angular-curso-udemy.firebaseio.com/productos/${id}.json`
    );
  }

  buscarProducto(termino: string) {
    if (termino.length < 1) {
      this.cargarProductos().then(() => {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    this.productosFiltrados = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach((prod) => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      const categoriaLower = prod.categoria.toLocaleLowerCase();
      if (
        categoriaLower.indexOf(termino) >= 0 ||
        tituloLower.indexOf(termino) >= 0
      ) {
        this.productosFiltrados.push(prod);
      }
    });
  }
}
