import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductosService } from "src/app/service/productos.service";
import { ProductoDetalle } from "src/app/interfaces/producto-detalle.interface";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.css"],
})
export class ItemComponent implements OnInit {
  item: ProductoDetalle;
  id: string;

  constructor(
    private route: ActivatedRoute,
    public productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parametros) => {
      this.productosService
        .obtenerProducto(parametros["id"])
        .subscribe((producto: ProductoDetalle) => {
          this.id = parametros["id"];
          this.item = producto;
        });
    });
  }
}
