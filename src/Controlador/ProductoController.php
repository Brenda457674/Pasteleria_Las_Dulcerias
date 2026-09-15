<?php

namespace App\Controlador;

use App\Modelo\Producto;

class ProductoController
{
    private $archivo;

    public function __construct()
    {
        $this->archivo = __DIR__ . '/../../data/productos.json';

        if (!is_dir(dirname($this->archivo))) {
            mkdir(dirname($this->archivo), 0777, true);
        }

        if (!file_exists($this->archivo)) {
            $this->crearProductosIniciales();
        }
    }

    // ==============================
    // OBTENER PRODUCTOS
    // ==============================

    public function obtenerProductos()
    {
        $datos = json_decode(file_get_contents($this->archivo), true) ?? [];
        $productos = [];

        foreach ($datos as $producto) {
            $productos[] = new Producto(
                $producto['nombre'],
                $producto['categoria'],
                $producto['precio'],
                $producto['descripcion'],
                $producto['imagen']
            );
        }

        return $productos;
    }

    // ==============================
    // GET: BUSCAR Y FILTRAR
    // ==============================

    public function buscarProductos($productos)
    {
        $buscar = $_GET['buscar'] ?? '';
        $categoria = $_GET['categoria'] ?? '';

        return array_filter($productos, function ($producto) use ($buscar, $categoria) {

            $nombreCoincide =
                empty($buscar) ||
                stripos($producto->getNombre(), $buscar) !== false;

            $categoriaCoincide =
                empty($categoria) ||
                $producto->getCategoria() === $categoria;

            return $nombreCoincide && $categoriaCoincide;
        });
    }

    // ==============================
    // POST: REGISTRAR PRODUCTO
    // ==============================

    public function registrarProducto()
    {
        $nombre = trim($_POST['nombre'] ?? '');
        $categoria = trim($_POST['categoria'] ?? '');
        $precio = trim($_POST['precio'] ?? '');
        $descripcion = trim($_POST['descripcion'] ?? '');

        if (!$nombre || !$categoria || !$precio || !$descripcion) {
            $mensaje = "Todos los campos son obligatorios.";
            require __DIR__ . '/../Vista/confirmacion.php';
            return;
        }

        if (!isset($_FILES['imagen']) || $_FILES['imagen']['error'] !== UPLOAD_ERR_OK) {
            $mensaje = "Debes seleccionar una imagen.";
            require __DIR__ . '/../Vista/confirmacion.php';
            return;
        }

        $imagen = $_FILES['imagen'];

        $tiposPermitidos = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/gif'
        ];

        if (!in_array($imagen['type'], $tiposPermitidos)) {
            $mensaje = "Solo se permiten imágenes JPG, PNG, WEBP o GIF.";
            require __DIR__ . '/../Vista/confirmacion.php';
            return;
        }

        if ($imagen['size'] > 5 * 1024 * 1024) {
            $mensaje = "La imagen no debe superar los 5 MB.";
            require __DIR__ . '/../Vista/confirmacion.php';
            return;
        }

        // Guardar imagen
        $carpeta = __DIR__ . '/../../public/img/';

        if (!is_dir($carpeta)) {
            mkdir($carpeta, 0777, true);
        }

        $extension = strtolower(pathinfo($imagen['name'], PATHINFO_EXTENSION));
        $nombreImagen = uniqid('producto_') . '.' . $extension;

        if (!move_uploaded_file(
            $imagen['tmp_name'],
            $carpeta . $nombreImagen
        )) {
            $mensaje = "No se pudo guardar la imagen.";
            require __DIR__ . '/../Vista/confirmacion.php';
            return;
        }

        // Guardar producto
        $productos = json_decode(file_get_contents($this->archivo), true) ?? [];

        $productos[] = [
            'nombre' => $nombre,
            'categoria' => $categoria,
            'precio' => (float) $precio,
            'descripcion' => $descripcion,
            'imagen' => $nombreImagen
        ];

        file_put_contents(
            $this->archivo,
            json_encode($productos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );

        $mensaje = "¡Producto registrado correctamente!";
        require __DIR__ . '/../Vista/confirmacion.php';
    }

    // ==============================
    // DELETE: ELIMINAR PRODUCTO
    // ==============================

    public function eliminarProducto()
    {
        $datos = json_decode(file_get_contents("php://input"), true);
        $nombre = trim($datos['nombre'] ?? '');

        if (!$nombre) {
            http_response_code(400);
            echo json_encode(['mensaje' => 'No se indicó el producto.']);
            return;
        }

        $productos = json_decode(file_get_contents($this->archivo), true) ?? [];
        $encontrado = false;

        foreach ($productos as $producto) {

            if ($producto['nombre'] === $nombre) {
                $encontrado = true;

                // Eliminar también su imagen
                $imagen = __DIR__ . '/../../public/img/' . $producto['imagen'];

                if (file_exists($imagen)) {
                    unlink($imagen);
                }
            }
        }

        if (!$encontrado) {
            http_response_code(404);
            echo json_encode(['mensaje' => 'Producto no encontrado.']);
            return;
        }

        $productos = array_filter(
            $productos,
            fn($producto) => $producto['nombre'] !== $nombre
        );

        file_put_contents(
            $this->archivo,
            json_encode(array_values($productos), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );

        header('Content-Type: application/json');

        echo json_encode([
            'mensaje' => 'Producto eliminado correctamente.'
        ]);
    }

    // ==============================
    // PRODUCTOS INICIALES
    // ==============================

    private function crearProductosIniciales()
{
    $productos = [

        [
            'nombre' => 'Torta de Chocolate',
            'categoria' => 'Tortas',
            'precio' => 45,
            'descripcion' => 'Deliciosa torta de chocolate con crema.',
            'imagen' => 'chocolate.jpg'
        ],

        [
            'nombre' => 'Cupcake de Vainilla',
            'categoria' => 'Cupcakes',
            'precio' => 6,
            'descripcion' => 'Cupcake de vainilla con crema dulce.',
            'imagen' => 'vainilla.jpg'
        ],

        [
            'nombre' => 'Cheesecake de Fresa',
            'categoria' => 'Postres',
            'precio' => 12,
            'descripcion' => 'Cheesecake cremoso con salsa de fresa.',
            'imagen' => 'fresa.jpg'
        ],

        [
            'nombre' => 'Galletas con Chispas',
            'categoria' => 'Galletas',
            'precio' => 8,
            'descripcion' => 'Galletas caseras con deliciosas chispas de chocolate.',
            'imagen' => 'galletas.jpg'
        ],

        [
            'nombre' => 'Dona Glaseada',
            'categoria' => 'Donas',
            'precio' => 5,
            'descripcion' => 'Dona suave cubierta con un dulce glaseado.',
            'imagen' => 'dona.jpg'
        ],

        [
            'nombre' => 'Tartaleta de Fresa',
            'categoria' => 'Postres',
            'precio' => 11,
            'descripcion' => 'Tartaleta artesanal con crema y fresas frescas.',
            'imagen' => 'tartaleta.jpg'
        ]

    ];

    file_put_contents(
        $this->archivo,
        json_encode($productos, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
    );
}
}