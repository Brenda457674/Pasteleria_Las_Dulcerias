<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Las Dulcerias - Menú Digital</title>

    <link rel="stylesheet" href="css/estilos.css">

    <script src="js/script.js" defer></script>

</head>

<body>

<header>

    <h1>🍰 Las Dulcerias</h1>

    <p>Pastelería artesanal</p>

</header>


<main>

    <h2>Nuestro Menú</h2>


    <!-- ==========================================
         FORMULARIO GET
         ========================================== -->

    <form method="GET" action="index.php" class="form-busqueda">

        <div class="buscador">

            <input
                type="text"
                id="buscar"
                name="buscar"
                placeholder="🔎 Buscar producto..."
                value="<?php echo htmlspecialchars($_GET['buscar'] ?? ''); ?>"
                autocomplete="off"
            >

            <!-- Sugerencias del buscador -->

            <div id="sugerencias" class="sugerencias"></div>

        </div>


        <select name="categoria">

            <option value="">
                Todas las categorías
            </option>

            <option
                value="Tortas"
                <?php echo (($_GET['categoria'] ?? '') === 'Tortas') ? 'selected' : ''; ?>
            >
                🎂 Tortas
            </option>

            <option
                value="Cupcakes"
                <?php echo (($_GET['categoria'] ?? '') === 'Cupcakes') ? 'selected' : ''; ?>
            >
                🧁 Cupcakes
            </option>

            <option
                value="Galletas"
                <?php echo (($_GET['categoria'] ?? '') === 'Galletas') ? 'selected' : ''; ?>
            >
                🍪 Galletas
            </option>

            <option
                value="Donas"
                <?php echo (($_GET['categoria'] ?? '') === 'Donas') ? 'selected' : ''; ?>
            >
                🍩 Donas
            </option>

            <option
                value="Postres"
                <?php echo (($_GET['categoria'] ?? '') === 'Postres') ? 'selected' : ''; ?>
            >
                🍓 Postres
            </option>

        </select>


        <button type="submit">

            🔎 Buscar

        </button>

    </form>


    <br>


    <!-- ==========================================
         PRODUCTOS
         ========================================== -->

    <div class="productos">

        <?php if (empty($productos)): ?>

            <p>No se encontraron productos. 💔</p>

        <?php else: ?>

            <?php foreach ($productos as $producto): ?>

                <div class="producto">

                    <img
                        src="img/<?php echo htmlspecialchars($producto->getImagen()); ?>"
                        alt="<?php echo htmlspecialchars($producto->getNombre()); ?>"
                    >


                    <h3>

                        <?php echo htmlspecialchars($producto->getNombre()); ?>

                    </h3>


                    <p class="categoria">

                        <?php echo htmlspecialchars($producto->getCategoria()); ?>

                    </p>


                    <p>

                        <?php echo htmlspecialchars($producto->getDescripcion()); ?>

                    </p>


                    <strong>

                        S/
                        <?php echo number_format($producto->getPrecio(), 2); ?>

                    </strong>


                    <!-- ==========================================
                         BOTÓN ELIMINAR
                         ========================================== -->

                    <button
                        type="button"
                        class="btn-eliminar"
                        data-nombre="<?php echo htmlspecialchars($producto->getNombre()); ?>"
                    >

                        🗑️ Eliminar

                    </button>

                </div>

            <?php endforeach; ?>

        <?php endif; ?>

    </div>


    <br><br>


    <!-- ==========================================
         BOTÓN REGISTRAR
         ========================================== -->

    <a href="../src/Vista/formulario.php">

        🧁 Agregar producto

    </a>


</main>

</body>

</html>