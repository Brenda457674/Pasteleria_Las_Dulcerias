<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Producto registrado - Dulce Encanto</title>

    <!-- CSS -->
    <link rel="stylesheet" href="/DulceEncanto/public/css/estilos.css">

</head>

<body>

<header>

    <h1>🍰 Dulce Encanto</h1>

    <p>Pastelería artesanal</p>

</header>


<main>

    <div class="confirmacion">

        <!-- ICONO DE CONFIRMACIÓN -->

        <div class="confirmacion-icono">
            ✓
        </div>


        <!-- MENSAJE -->

        <h2>
            ¡Producto registrado!
        </h2>


        <p class="confirmacion-mensaje">

            <?php echo htmlspecialchars(
                $mensaje ?? 'El producto se registró correctamente.'
            ); ?>

            💗

        </p>


        <!-- DATOS DEL PRODUCTO -->

        <div class="datos-producto">


            <div>

                <span>🍰 Producto</span>

                <strong>
                    <?php echo htmlspecialchars($nombre ?? ''); ?>
                </strong>

            </div>


            <div>

                <span>🏷️ Categoría</span>

                <strong>
                    <?php echo htmlspecialchars($categoria ?? ''); ?>
                </strong>

            </div>


            <div>

                <span>💰 Precio</span>

                <strong>

                    S/
                    <?php echo number_format(
                        (float)($precio ?? 0),
                        2
                    ); ?>

                </strong>

            </div>


            <div>

                <span>💌 Descripción</span>

                <strong>
                    <?php echo htmlspecialchars($descripcion ?? ''); ?>
                </strong>

            </div>


        </div>


        <!-- BOTONES -->

        <div class="confirmacion-botones">


            <a
                href="/DulceEncanto/src/Vista/formulario.php"
                class="btn-registrar"
            >
                🧁 Registrar otro producto
            </a>


            <a
                href="/DulceEncanto/public/index.php"
                class="btn-volver"
            >
                ← Volver al menú
            </a>


        </div>

    </div>

</main>

</body>

</html>