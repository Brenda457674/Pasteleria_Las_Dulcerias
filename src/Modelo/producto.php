<?php

namespace App\Modelo;

class Producto
{
    private $nombre;
    private $categoria;
    private $precio;
    private $descripcion;
    private $imagen;

    public function __construct(
        $nombre,
        $categoria,
        $precio,
        $descripcion,
        $imagen
    ) {
        $this->nombre = $nombre;
        $this->categoria = $categoria;
        $this->precio = $precio;
        $this->descripcion = $descripcion;
        $this->imagen = $imagen;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getCategoria()
    {
        return $this->categoria;
    }

    public function getPrecio()
    {
        return $this->precio;
    }

    public function getDescripcion()
    {
        return $this->descripcion;
    }

    public function getImagen()
    {
        return $this->imagen;
    }
}