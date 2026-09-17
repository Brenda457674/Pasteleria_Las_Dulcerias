<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Las Dulcerias · Pastelería artesanal</title>

    <link rel="stylesheet" href="css/estilos.css">

    <script src="js/script.js" defer></script>

</head>

<body>

<header>

    <h1>Las Dulcerias</h1>

    <p>Pastelería artesanal</p>

</header>


<main>

    <h2>Nuestros postres</h2>


    <!-- ==========================================
         BÚSQUEDA (GET)
         ========================================== -->

    <form method="GET" action="index.php" class="form-busqueda" role="search">

        <div class="buscador">

            <label for="buscar" class="visualmente-oculto">Buscar postre</label>

            <input
                type="text"
                id="buscar"
                name="buscar"
                placeholder="Buscar un postre por nombre"
                value="<?php echo htmlspecialchars($_GET['buscar'] ?? ''); ?>"
                autocomplete="off"
            >

            <div id="sugerencias" class="sugerencias"></div>

        </div>


        <label for="categoria" class="visualmente-oculto">Filtrar por categoría</label>

        <select name="categoria" id="categoria">

            <option value="">Todas las categorías</option>

            <?php

            $categorias = ['Tortas', 'Cupcakes', 'Galletas', 'Donas', 'Postres'];

            foreach ($categorias as $categoria):

                $seleccionada = (($_GET['categoria'] ?? '') === $categoria)
                    ? 'selected'
                    : '';
            ?>

                <option value="<?php echo $categoria; ?>" <?php echo $seleccionada; ?>>
                    <?php echo $categoria; ?>
                </option>

            <?php endforeach; ?>

        </select>


        <button type="submit">Buscar</button>

    </form>


    <!-- ==========================================
         VITRINA
         ========================================== -->

    <div class="productos">

        <?php if (empty($productos)): ?>

            <p class="productos-vacio">
                No hay postres que coincidan con esa búsqueda.
                Prueba con otro nombre o quita el filtro de categoría.
            </p>

        <?php else: ?>

            <?php foreach ($productos as $producto): ?>

                <article class="producto">

                    <img
                        src="img/<?php echo htmlspecialchars($producto->getImagen()); ?>"
                        alt="<?php echo htmlspecialchars($producto->getNombre()); ?>"
                        loading="lazy"
                    >

                    <p class="categoria">
                        <?php echo htmlspecialchars($producto->getCategoria()); ?>
                    </p>

                    <h3>
                        <?php echo htmlspecialchars($producto->getNombre()); ?>
                    </h3>

                    <p>
                        <?php echo htmlspecialchars($producto->getDescripcion()); ?>
                    </p>

                    <strong>
                        S/ <?php echo number_format($producto->getPrecio(), 2); ?>
                    </strong>

                    <button
                        type="button"
                        class="btn-eliminar"
                        data-nombre="<?php echo htmlspecialchars($producto->getNombre()); ?>"
                    >
                        Retirar del menú
                    </button>

                </article>

            <?php endforeach; ?>

        <?php endif; ?>

    </div>


    <!-- ==========================================
         ALTA DE PRODUCTO
         ========================================== -->

    <a href="../src/Vista/formulario.php">Agregar producto</a>


</main>

</body>

</html>