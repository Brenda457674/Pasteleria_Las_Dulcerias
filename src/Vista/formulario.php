<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Agregar Producto - Las Dulcerias</title>

    <link rel="stylesheet" href="../../public/css/estilos.css">

</head>

<body>

<header>

    <h1>🍰 Las Dulcerias </h1>

    <p>Agrega una nueva delicia a nuestro menú ♡</p>

</header>


<main>

    <div class="formulario-contenedor">

        <div class="formulario-titulo">

            <span>🧁</span>

            <div>

                <h2>Registrar Producto</h2>

                <p>Completa los datos de tu nueva creación</p>

            </div>

        </div>


        <!-- ==========================================
             FORMULARIO POST
             ========================================== -->

        <form
            action="../../public/index.php"
            method="POST"
            enctype="multipart/form-data"
        >

            <div class="campo">

                <label for="nombre">
                    🍰 Nombre del producto
                </label>

                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Ej. Torta de Fresa"
                    required
                >

            </div>


            <div class="campo">

                <label for="categoria">
                    🏷️ Categoría
                </label>

                <select
                    id="categoria"
                    name="categoria"
                    required
                >

                    <option value="">
                        Seleccionar categoría
                    </option>

                    <option value="Tortas">
                        🎂 Tortas
                    </option>

                    <option value="Cupcakes">
                        🧁 Cupcakes
                    </option>

                    <option value="Galletas">
                        🍪 Galletas
                    </option>

                    <option value="Donas">
                        🍩 Donas
                    </option>

                    <option value="Postres">
                        🍓 Postres
                    </option>

                    <option value="Bebidas">
                        🥤 Bebidas
                    </option>

                </select>

            </div>


            <div class="campo">

                <label for="precio">
                    💰 Precio
                </label>

                <div class="precio-input">

                    <span>S/</span>

                    <input
                        type="number"
                        id="precio"
                        name="precio"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        required
                    >

                </div>

            </div>


            <div class="campo">

                <label for="descripcion">
                    💌 Descripción
                </label>

                <textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Cuéntanos un poquito sobre este delicioso producto..."
                    required
                ></textarea>

            </div>


            <!-- ==========================================
                 IMAGEN DEL PRODUCTO
                 ========================================== -->

            <div class="campo">

                <label for="imagen">
                    🖼️ Imagen del producto
                </label>

                <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    accept="image/*"
                    required
                >

            </div>


            <button
                type="submit"
                class="btn-registrar"
            >
                🧁 Registrar Producto
            </button>


            <a
                href="../../public/index.php"
                class="btn-volver"
            >
                ← Volver al menú
            </a>

        </form>

    </div>

</main>

</body>

</html>