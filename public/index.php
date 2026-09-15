<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Controlador\ProductoController;

$controller = new ProductoController();


// ==========================================
// POST: REGISTRAR PRODUCTO
// ==========================================

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $controller->registrarProducto();

    exit;
}


// ==========================================
// DELETE: ELIMINAR PRODUCTO
// ==========================================

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    header('Content-Type: application/json');

    $controller->eliminarProducto();

    exit;
}


// ==========================================
// GET: BUSCAR Y FILTRAR PRODUCTOS
// ==========================================

$productos = $controller->obtenerProductos();

$productos = $controller->buscarProductos($productos);


// ==========================================
// MOSTRAR VISTA
// ==========================================

require_once __DIR__ . '/../src/Vista/menu.php';