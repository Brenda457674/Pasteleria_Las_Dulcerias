document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // DULCE ENCANTO
    // JavaScript moderno + kawaii
    // =========================================================


    // =========================================================
    // 1. PRODUCTOS
    // =========================================================

    const productos = document.querySelectorAll(".producto");

    const reducirMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    // =========================================================
    // 2. ANIMACIÓN DE ENTRADA
    // =========================================================

    if (!reducirMovimiento) {

        productos.forEach((producto, index) => {

            producto.style.opacity = "0";
            producto.style.transform =
                "translateY(25px) scale(0.98)";

            setTimeout(() => {

                producto.style.transition =
                    "opacity 0.65s ease, transform 0.65s cubic-bezier(.2,.8,.2,1)";

                producto.style.opacity = "1";
                producto.style.transform =
                    "translateY(0) scale(1)";

            }, 100 + index * 100);

        });

    }


    // =========================================================
    // 3. HOVER PREMIUM + TILT 3D
    // =========================================================

    const esMovil =
        window.matchMedia("(max-width: 768px)").matches;


    if (!reducirMovimiento) {

        productos.forEach(producto => {

            const imagen = producto.querySelector("img");


            // ---------------------------------------------
            // Entrada del mouse
            // ---------------------------------------------

            producto.addEventListener("mouseenter", () => {

                producto.style.transition =
                    "transform 0.25s ease, box-shadow 0.25s ease";

                producto.style.zIndex = "2";

                if (imagen) {

                    imagen.style.transition =
                        "transform 0.45s ease";

                    imagen.style.transform =
                        "scale(1.04)";
                }

            });


            // ---------------------------------------------
            // Movimiento del mouse
            // ---------------------------------------------

            if (!esMovil) {

                producto.addEventListener("mousemove", (evento) => {

                    const rect =
                        producto.getBoundingClientRect();


                    const x =
                        evento.clientX - rect.left;

                    const y =
                        evento.clientY - rect.top;


                    const centroX =
                        rect.width / 2;

                    const centroY =
                        rect.height / 2;


                    const rotacionY =
                        ((x - centroX) / centroX) * 2.5;

                    const rotacionX =
                        ((centroY - y) / centroY) * 2.5;


                    producto.style.transform =
                        `translateY(-7px) scale(1.015) rotateX(${rotacionX}deg) rotateY(${rotacionY}deg)`;

                });

            }


            // ---------------------------------------------
            // Salida del mouse
            // ---------------------------------------------

            producto.addEventListener("mouseleave", () => {

                producto.style.transition =
                    "transform 0.4s ease, box-shadow 0.4s ease";

                producto.style.transform =
                    "translateY(0) scale(1) rotateX(0) rotateY(0)";

                producto.style.zIndex = "1";


                if (imagen) {

                    imagen.style.transform =
                        "scale(1)";

                }

            });

        });

    }


    // =========================================================
    // 4. BUSCADOR
    // =========================================================

    const buscador =
        document.getElementById("buscar");

    const sugerencias =
        document.getElementById("sugerencias");


    if (buscador && sugerencias) {


        // -----------------------------------------------------
        // Obtener productos reales del HTML
        // -----------------------------------------------------

        const obtenerNombresProductos = () => {

            const nombres = [];

            document
                .querySelectorAll(".producto h3")
                .forEach(titulo => {

                    const nombre =
                        titulo.textContent.trim();

                    if (nombre) {

                        nombres.push(nombre);

                    }

                });


            return [...new Set(nombres)];

        };


        // -----------------------------------------------------
        // Mostrar sugerencias
        // -----------------------------------------------------

        const mostrarSugerencias = () => {

            const texto =
                buscador.value
                    .trim()
                    .toLowerCase();


            sugerencias.innerHTML = "";


            if (texto === "") {

                sugerencias.style.display =
                    "none";

                return;

            }


            const productosDisponibles =
                obtenerNombresProductos();


            const resultados =
                productosDisponibles.filter(producto =>
                    producto
                        .toLowerCase()
                        .includes(texto)
                );


            if (resultados.length === 0) {

                const vacio =
                    document.createElement("div");

                vacio.className =
                    "sugerencia-vacia";

                vacio.textContent =
                    "No se encontraron productos 💔";

                sugerencias.appendChild(vacio);

                sugerencias.style.display =
                    "block";

                return;

            }


            resultados
                .slice(0, 6)
                .forEach((producto, index) => {

                    const elemento =
                        document.createElement("div");

                    elemento.className =
                        "sugerencia";

                    elemento.textContent =
                        "🧁 " + producto;


                    if (!reducirMovimiento) {

                        elemento.style.opacity = "0";

                        elemento.style.transform =
                            "translateY(-5px)";

                        elemento.style.transition =
                            "opacity 0.2s ease, transform 0.2s ease";

                    }


                    elemento.addEventListener(
                        "click",
                        () => {

                            buscador.value =
                                producto;

                            sugerencias.innerHTML =
                                "";

                            sugerencias.style.display =
                                "none";

                            // Enviar automáticamente
                            // la búsqueda GET
                            const formulario =
                                buscador.closest("form");

                            if (formulario) {

                                formulario.submit();

                            }

                        }
                    );


                    sugerencias.appendChild(
                        elemento
                    );


                    if (!reducirMovimiento) {

                        setTimeout(() => {

                            elemento.style.opacity =
                                "1";

                            elemento.style.transform =
                                "translateY(0)";

                        }, index * 45);

                    }

                });


            sugerencias.style.display =
                "block";

        };


        // -----------------------------------------------------
        // Escribir
        // -----------------------------------------------------

        buscador.addEventListener(
            "input",
            mostrarSugerencias
        );


        // -----------------------------------------------------
        // Focus
        // -----------------------------------------------------

        buscador.addEventListener(
            "focus",
            () => {

                if (
                    buscador.value.trim() !== ""
                ) {

                    mostrarSugerencias();

                }

            }
        );


        // -----------------------------------------------------
        // Click fuera
        // -----------------------------------------------------

        document.addEventListener(
            "click",
            (evento) => {

                if (
                    !buscador.contains(evento.target) &&
                    !sugerencias.contains(evento.target)
                ) {

                    sugerencias.innerHTML =
                        "";

                    sugerencias.style.display =
                        "none";

                }

            }
        );

    }


    // =========================================================
    // 5. TOAST / NOTIFICACIONES
    // =========================================================

    const mostrarToast = (
        mensaje,
        tipo = "exito"
    ) => {

        const toast =
            document.createElement("div");

        toast.className =
            `toast-dulce ${tipo}`;


        toast.innerHTML = `
            <span class="toast-icono">
                ${tipo === "exito" ? "🧁" : "♡"}
            </span>

            <span class="toast-mensaje">
                ${mensaje}
            </span>

            <button
                type="button"
                class="toast-cerrar"
                aria-label="Cerrar notificación"
            >
                ×
            </button>
        `;


        document.body.appendChild(toast);


        const cerrar =
            toast.querySelector(".toast-cerrar");


        const eliminarToast = () => {

            toast.classList.add(
                "toast-saliendo"
            );


            setTimeout(() => {

                toast.remove();

            }, 300);

        };


        cerrar.addEventListener(
            "click",
            eliminarToast
        );


        requestAnimationFrame(() => {

            toast.classList.add(
                "toast-visible"
            );

        });


        setTimeout(
            eliminarToast,
            3500
        );

    };


    // =========================================================
    // 6. MODAL PARA ELIMINAR
    // =========================================================

    const crearModalEliminar = () => {

        const modal =
            document.createElement("div");

        modal.className =
            "modal-eliminar";


        modal.innerHTML = `
            <div
                class="modal-fondo"
                data-cerrar-modal
            ></div>

            <div
                class="modal-contenido"
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-modal-eliminar"
            >

                <div class="modal-icono">
                    🐾
                </div>

                <h2 id="titulo-modal-eliminar">
                    ¿Eliminar producto?
                </h2>

                <p class="modal-texto">
                    ¿Seguro que deseas retirar
                    este producto del menú?
                </p>

                <p class="modal-producto"></p>

                <div class="modal-botones">

                    <button
                        type="button"
                        class="modal-cancelar"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        class="modal-confirmar"
                    >
                        Eliminar
                    </button>

                </div>

            </div>
        `;


        document.body.appendChild(modal);

        return modal;

    };


    // =========================================================
    // 7. DELETE
    // =========================================================

    const botonesEliminar =
        document.querySelectorAll(
            ".btn-eliminar"
        );


    botonesEliminar.forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                const nombre =
                    boton.getAttribute(
                        "data-nombre"
                    );


                const modal =
                    crearModalEliminar();


                const productoTexto =
                    modal.querySelector(
                        ".modal-producto"
                    );


                productoTexto.textContent =
                    `🧁 ${nombre}`;


                const cerrarModal = () => {

                    modal.classList.add(
                        "modal-saliendo"
                    );


                    setTimeout(() => {

                        modal.remove();

                    }, 250);

                };


                const cancelar =
                    modal.querySelector(
                        ".modal-cancelar"
                    );


                const confirmar =
                    modal.querySelector(
                        ".modal-confirmar"
                    );


                cancelar.addEventListener(
                    "click",
                    cerrarModal
                );


                const fondo =
                    modal.querySelector(
                        "[data-cerrar-modal]"
                    );


                fondo.addEventListener(
                    "click",
                    cerrarModal
                );


                // -------------------------------------------------
                // ESC
                // -------------------------------------------------

                const manejarEscape =
                    (evento) => {

                        if (
                            evento.key ===
                            "Escape"
                        ) {

                            cerrarModal();

                            document.removeEventListener(
                                "keydown",
                                manejarEscape
                            );

                        }

                    };


                document.addEventListener(
                    "keydown",
                    manejarEscape
                );


                // -------------------------------------------------
                // Confirmar eliminación
                // -------------------------------------------------

                confirmar.addEventListener(
                    "click",
                    async () => {

                        confirmar.disabled =
                            true;

                        confirmar.textContent =
                            "Eliminando...";


                        try {

                            const respuesta =
                                await fetch(
                                    "index.php",
                                    {
                                        method: "DELETE",

                                        headers: {
                                            "Content-Type":
                                                "application/json"
                                        },

                                        body:
                                            JSON.stringify({
                                                nombre:
                                                    nombre
                                            })
                                    }
                                );


                            const resultado =
                                await respuesta.json();


                            if (!respuesta.ok) {

                                throw new Error(
                                    resultado.mensaje ||
                                    "No se pudo eliminar el producto."
                                );

                            }


                            cerrarModal();


                            mostrarToast(
                                "Producto eliminado correctamente ♡",
                                "exito"
                            );


                            setTimeout(() => {

                                window.location.reload();

                            }, 900);


                        } catch (error) {

                            console.error(
                                error
                            );


                            confirmar.disabled =
                                false;

                            confirmar.textContent =
                                "Eliminar";


                            mostrarToast(
                                error.message ||
                                "Ocurrió un error al eliminar.",
                                "error"
                            );

                        }

                    }
                );


                // -------------------------------------------------
                // Mostrar modal
                // -------------------------------------------------

                requestAnimationFrame(() => {

                    modal.classList.add(
                        "modal-visible"
                    );

                });


                // Enfocar cancelar
                setTimeout(() => {

                    cancelar.focus();

                }, 100);

            }

        );

    });


    // =========================================================
    // 8. BOTONES
    // =========================================================

    const botones =
        document.querySelectorAll(
            "button, .btn-registrar, .btn-volver"
        );


    if (!reducirMovimiento) {

        botones.forEach(boton => {

            boton.addEventListener(
                "pointerdown",
                () => {

                    boton.style.transform =
                        "scale(0.96)";

                }
            );


            boton.addEventListener(
                "pointerup",
                () => {

                    boton.style.transform =
                        "";

                }
            );


            boton.addEventListener(
                "pointerleave",
                () => {

                    boton.style.transform =
                        "";

                }
            );

        });

    }


    // =========================================================
    // 9. SCROLL REVEAL
    // =========================================================

    if (
        !reducirMovimiento &&
        "IntersectionObserver" in window
    ) {

        const observador =
            new IntersectionObserver(
                (entradas, observer) => {

                    entradas.forEach(entrada => {

                        if (
                            entrada.isIntersecting
                        ) {

                            entrada.target.classList.add(
                                "producto-visible"
                            );


                            observer.unobserve(
                                entrada.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        productos.forEach(producto => {

            producto.classList.add(
                "producto-reveal"
            );


            observador.observe(
                producto
            );

        });

    }


    // =========================================================
    // 10. DETALLE KAWAII SUTIL
    // =========================================================

    const crearDetalleKawaii = () => {

        if (reducirMovimiento) {
            return;
        }


        const detalle =
            document.createElement("span");

        detalle.className =
            "detalle-kawaii";

        detalle.textContent =
            Math.random() > 0.5
                ? "♡"
                : "✦";


        detalle.style.left =
            `${Math.random() * 90 + 5}%`;

        detalle.style.top =
            `${Math.random() * 70 + 15}%`;


        document.body.appendChild(
            detalle
        );


        setTimeout(() => {

            detalle.classList.add(
                "detalle-kawaii-visible"
            );

        }, 20);


        setTimeout(() => {

            detalle.classList.remove(
                "detalle-kawaii-visible"
            );


            setTimeout(() => {

                detalle.remove();

            }, 500);

        }, 1800);

    };


    // Solo un detalle ocasional
    // para no saturar la página.

    if (!reducirMovimiento) {

        setTimeout(
            crearDetalleKawaii,
            1800
        );

    }


    // =========================================================
    // FIN
    // =========================================================

});