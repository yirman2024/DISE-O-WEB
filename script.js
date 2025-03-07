// Agregar efecto de animación al botón principal
document.addEventListener("DOMContentLoaded", () => {
    const ctaButtons = document.querySelectorAll(".cta-btn");

    ctaButtons.forEach(button => {
        setInterval(() => {
            button.style.transform = "scale(1.08)";
            setTimeout(() => {
                button.style.transform = "scale(1)";
            }, 300);
        }, 4000);
    });

    iniciarTemporizador(); // Iniciar temporizador de oferta al cargar la página
});

// Variables globales
let redirigirTimeout;
let contadorInterval;

// Función para mostrar el modal y programar la redirección a WhatsApp
function mostrarModal() {
    document.getElementById("modalPago").style.display = "flex";

    let segundos = 30;
    const contador = document.getElementById("contador");

    // Iniciar cuenta regresiva en el modal
    contadorInterval = setInterval(() => {
        segundos--;
        contador.textContent = `⏳ Redirigiendo en ${segundos} segundos...`;

        if (segundos <= 0) {
            clearInterval(contadorInterval);
        }
    }, 1000);

    // Redirección automática después de 30 segundos
    redirigirTimeout = setTimeout(redirigirWhatsApp, 30000);
}

// Función para cerrar el modal y redirigir inmediatamente
function cerrarModal() {
    document.getElementById("modalPago").style.display = "none";
    redirigirWhatsApp(); // Redirigir al cerrar
}

// Función para redirigir a WhatsApp
function redirigirWhatsApp() {
    window.location.href = "https://wa.me/573117947704?text=Hola,%20quiero%20comprar%20el%20Prompt%20por%20$9.99%20USD.";
}

// Función para manejar el temporizador de la oferta (5 horas)
function iniciarTemporizador() {
    const ahora = new Date().getTime();
    let tiempoRestante = localStorage.getItem("tiempoExpiracion");

    // Si no hay tiempo guardado o el tiempo ha expirado, reiniciar el temporizador
    if (!tiempoRestante || tiempoRestante - ahora <= 0) {
        tiempoRestante = ahora + (5 * 60 * 60 * 1000); // 5 horas en milisegundos
        localStorage.setItem("tiempoExpiracion", tiempoRestante);
    }

    // Función de cuenta regresiva
    const cuentaRegresiva = setInterval(() => {
        const ahora = new Date().getTime();
        let tiempo = tiempoRestante - ahora;

        if (tiempo <= 0) {
            clearInterval(cuentaRegresiva);
            localStorage.removeItem("tiempoExpiracion");
            iniciarTemporizador(); // Reiniciar el contador
        } else {
            let horas = Math.floor(tiempo / (1000 * 60 * 60));
            let minutos = Math.floor((tiempo % (1000 * 60 * 60)) / (1000 * 60));
            let segundos = Math.floor((tiempo % (1000 * 60)) / 1000);

            document.getElementById("countdown").innerHTML = `⏳ ${horas}h ${minutos}m ${segundos}s`;
        }
    }, 1000);
}
