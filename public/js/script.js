/* =========================================================
   LAS DULCERIAS
   Interacción del menú digital
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const reducirMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const productos = document.querySelectorAll(".producto");


    /* ---------------------------------------------------------
       Utilidades
       --------------------------------------------------------- */

    const escaparHTML = (texto) =>
        String(texto).replace(/[&<>"']/g, (caracter) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[caracter]));


    const retardar = (funcion, espera = 120) => {

        let temporizador;

        return (...argumentos) => {
            clearTimeout(temporizador);
            temporizador = setTimeout(() => funcion(...argumentos), espera);
        };
    };


    /* =========================================================
       1. APARICIÓN DE LAS TARJETAS AL HACER SCROLL
       ---------------------------------------------------------
       El CSS define el estado inicial y la transición.
       Aquí solo se añade la clase y un retardo escalonado,
       nunca estilos en línea de transform: eso rompería
       el hover de la tarjeta.
       ========================================================= */

    if (!reducirMovimiento && "IntersectionObserver" in window) {

        const observador = new IntersectionObserver((entradas, observer) => {

            entradas.forEach((entrada) => {

                if (!entrada.isIntersecting) return;

                const posicion = Number(entrada.target.dataset.orden || 0);

                entrada.target.style.transitionDelay = `${Math.min(posicion, 6) * 70}ms`;
                entrada.target.classList.add("producto-visible");

                observer.unobserve(entrada.target);
            });

        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });


        productos.forEach((producto, indice) => {
            producto.dataset.orden = indice % 4;
            producto.classList.add("producto-reveal");
            observador.observe(producto);
        });

    } else {

        productos.forEach((producto) => {
            producto.classList.add("producto-visible");
        });
    }


    /* =========================================================
       2. BUSCADOR CON SUGERENCIAS
       ========================================================= */

    const buscador = document.getElementById("buscar");
    const sugerencias = document.getElementById("sugerencias");


    if (buscador && sugerencias) {

        const formulario = buscador.closest("form");

        let resultadosActuales = [];
        let indiceActivo = -1;


        buscador.setAttribute("role", "combobox");
        buscador.setAttribute("aria-autocomplete", "list");
        buscador.setAttribute("aria-expanded", "false");
        buscador.setAttribute("aria-controls", "sugerencias");
        sugerencias.setAttribute("role", "listbox");


        const catalogo = () => {

            const nombres = [];

            document.querySelectorAll(".producto h3").forEach((titulo) => {
                const nombre = titulo.textContent.trim();
                if (nombre) nombres.push(nombre);
            });

            return [...new Set(nombres)];
        };


        const cerrarLista = () => {
            sugerencias.innerHTML = "";
            sugerencias.style.display = "none";
            buscador.setAttribute("aria-expanded", "false");
            resultadosActuales = [];
            indiceActivo = -1;
        };


        const marcarActivo = (nuevoIndice) => {

            const opciones = sugerencias.querySelectorAll(".sugerencia");
            if (!opciones.length) return;

            indiceActivo = (nuevoIndice + opciones.length) % opciones.length;

            opciones.forEach((opcion, i) => {
                const activa = i === indiceActivo;
                opcion.classList.toggle("sugerencia-activa", activa);
                opcion.setAttribute("aria-selected", activa ? "true" : "false");
            });

            opciones[indiceActivo].scrollIntoView({ block: "nearest" });
        };


        const elegir = (nombre) => {
            buscador.value = nombre;
            cerrarLista();
            if (formulario) formulario.submit();
        };


        const resaltar = (nombre, consulta) => {

            const posicion = nombre.toLowerCase().indexOf(consulta);
            if (posicion === -1) return escaparHTML(nombre);

            const antes = escaparHTML(nombre.slice(0, posicion));
            const medio = escaparHTML(nombre.slice(posicion, posicion + consulta.length));
            const despues = escaparHTML(nombre.slice(posicion + consulta.length));

            return `${antes}<span class="sugerencia-coincidencia">${medio}</span>${despues}`;
        };


        const abrirLista = () => {

            const consulta = buscador.value.trim().toLowerCase();

            if (consulta === "") {
                cerrarLista();
                return;
            }

            resultadosActuales = catalogo()
                .filter((nombre) => nombre.toLowerCase().includes(consulta))
                .slice(0, 6);

            sugerencias.innerHTML = "";
            indiceActivo = -1;

            if (resultadosActuales.length === 0) {

                const vacio = document.createElement("div");
                vacio.className = "sugerencia-vacia";
                vacio.textContent = "Ningún postre coincide con esa búsqueda";
                sugerencias.appendChild(vacio);

            } else {

                resultadosActuales.forEach((nombre, i) => {

                    const opcion = document.createElement("div");
                    opcion.className = "sugerencia";
                    opcion.setAttribute("role", "option");
                    opcion.setAttribute("aria-selected", "false");
                    opcion.innerHTML = resaltar(nombre, consulta);

                    opcion.addEventListener("mouseenter", () => marcarActivo(i));
                    opcion.addEventListener("mousedown", (evento) => {
                        evento.preventDefault();
                        elegir(nombre);
                    });

                    sugerencias.appendChild(opcion);
                });
            }

            sugerencias.style.display = "block";
            buscador.setAttribute("aria-expanded", "true");
        };


        buscador.addEventListener("input", retardar(abrirLista));

        buscador.addEventListener("focus", () => {
            if (buscador.value.trim() !== "") abrirLista();
        });


        buscador.addEventListener("keydown", (evento) => {

            const abierta = sugerencias.style.display === "block";

            switch (evento.key) {

                case "ArrowDown":
                    if (!abierta) { abrirLista(); return; }
                    evento.preventDefault();
                    marcarActivo(indiceActivo + 1);
                    break;

                case "ArrowUp":
                    if (!abierta) return;
                    evento.preventDefault();
                    marcarActivo(indiceActivo - 1);
                    break;

                case "Enter":
                    evento.preventDefault();
                    if (abierta && indiceActivo >= 0) {
                        elegir(resultadosActuales[indiceActivo]);
                    } else if (formulario) {
                        formulario.submit();
                    }
                    break;

                case "Escape":
                    cerrarLista();
                    break;
            }
        });


        document.addEventListener("click", (evento) => {
            if (!buscador.contains(evento.target) &&
                !sugerencias.contains(evento.target)) {
                cerrarLista();
            }
        });
    }


    /* =========================================================
       3. AVISOS
       ========================================================= */

    let avisoActivo = null;

    const mostrarAviso = (mensaje, tipo = "exito") => {

        if (avisoActivo) avisoActivo.remove();

        const aviso = document.createElement("div");
        aviso.className = `toast-dulce toast-${tipo}`;
        aviso.setAttribute("role", tipo === "error" ? "alert" : "status");

        aviso.innerHTML = `
            <span class="toast-icono" aria-hidden="true">${tipo === "error" ? "!" : "✓"}</span>
            <span class="toast-mensaje">${escaparHTML(mensaje)}</span>
            <button type="button" class="toast-cerrar" aria-label="Cerrar aviso">×</button>
        `;

        document.body.appendChild(aviso);
        avisoActivo = aviso;

        const cerrar = () => {
            aviso.classList.add("toast-saliendo");
            setTimeout(() => {
                aviso.remove();
                if (avisoActivo === aviso) avisoActivo = null;
            }, 300);
        };

        aviso.querySelector(".toast-cerrar").addEventListener("click", cerrar);

        requestAnimationFrame(() => aviso.classList.add("toast-visible"));

        setTimeout(cerrar, 4000);

        return aviso;
    };


    /* =========================================================
       4. ELIMINAR PRODUCTO
       ========================================================= */

    const crearModal = (nombre) => {

        const modal = document.createElement("div");
        modal.className = "modal-eliminar";

        modal.innerHTML = `
            <div class="modal-fondo" data-cerrar></div>

            <div class="modal-contenido"
                 role="dialog"
                 aria-modal="true"
                 aria-labelledby="titulo-modal-eliminar">

                <div class="modal-icono" aria-hidden="true">🗑️</div>

                <h2 id="titulo-modal-eliminar">Retirar del menú</h2>

                <p class="modal-texto">
                    El producto dejará de mostrarse en la carta.
                    Esta acción no se puede deshacer.
                </p>

                <p class="modal-producto">${escaparHTML(nombre)}</p>

                <div class="modal-botones">
                    <button type="button" class="modal-cancelar">Cancelar</button>
                    <button type="button" class="modal-confirmar">Retirar</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        return modal;
    };


    document.querySelectorAll(".btn-eliminar").forEach((boton) => {

        boton.addEventListener("click", () => {

            const nombre = boton.dataset.nombre;
            if (!nombre) return;

            const modal = crearModal(nombre);
            const cancelar = modal.querySelector(".modal-cancelar");
            const confirmar = modal.querySelector(".modal-confirmar");
            const enfocables = modal.querySelectorAll("button");

            document.body.style.overflow = "hidden";


            const cerrarModal = () => {
                modal.classList.remove("modal-visible");
                document.removeEventListener("keydown", manejarTeclas);
                document.body.style.overflow = "";
                setTimeout(() => modal.remove(), 250);
                boton.focus();
            };


            const manejarTeclas = (evento) => {

                if (evento.key === "Escape") {
                    cerrarModal();
                    return;
                }

                /* el foco no se escapa del diálogo */
                if (evento.key === "Tab") {

                    const primero = enfocables[0];
                    const ultimo = enfocables[enfocables.length - 1];

                    if (evento.shiftKey && document.activeElement === primero) {
                        evento.preventDefault();
                        ultimo.focus();
                    } else if (!evento.shiftKey && document.activeElement === ultimo) {
                        evento.preventDefault();
                        primero.focus();
                    }
                }
            };


            cancelar.addEventListener("click", cerrarModal);
            modal.querySelector("[data-cerrar]").addEventListener("click", cerrarModal);
            document.addEventListener("keydown", manejarTeclas);


            confirmar.addEventListener("click", async () => {

                confirmar.disabled = true;
                cancelar.disabled = true;
                confirmar.textContent = "Retirando…";

                try {

                    const respuesta = await fetch("index.php", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ nombre })
                    });

                    const resultado = await respuesta.json();

                    if (!respuesta.ok) {
                        throw new Error(resultado.mensaje || "No se pudo retirar el producto.");
                    }

                    cerrarModal();

                    /* la tarjeta desaparece antes de recargar:
                       el cambio se ve, no solo se anuncia */
                    const tarjeta = boton.closest(".producto");

                    if (tarjeta && !reducirMovimiento) {
                        tarjeta.classList.add("producto-saliendo");
                    }

                    mostrarAviso(`${nombre} se retiró del menú`, "exito");

                    setTimeout(() => window.location.reload(), 900);

                } catch (error) {

                    console.error(error);

                    confirmar.disabled = false;
                    cancelar.disabled = false;
                    confirmar.textContent = "Retirar";

                    mostrarAviso(
                        error.message || "No se pudo conectar con el servidor.",
                        "error"
                    );
                }
            });


            requestAnimationFrame(() => modal.classList.add("modal-visible"));
            setTimeout(() => cancelar.focus(), 120);
        });
    });

});