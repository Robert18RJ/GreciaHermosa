// Referencias a elementos del DOM
const sobreEnvoltura = document.querySelector('.envoltura-sobre');
const carta = document.querySelector('.carta');
const textoCarta = document.getElementById('textoCarta');
const musicaFondo = document.getElementById('musicaFondo');
const controlMusica = document.getElementById('controlMusica');
const abrirGaleriaBtn = document.getElementById('abrirGaleria');
const galeriaModal = document.getElementById('galeriaModal');
const cerrarModal = document.querySelector('.cerrar-modal');
const fotos = document.querySelectorAll('.foto-galeria');
const fotoAnteriorBtn = document.getElementById('fotoAnterior');
const fotoSiguienteBtn = document.getElementById('fotoSiguiente');
const indicadorFoto = document.getElementById('indicadorFoto');
const confetiContenedor = document.getElementById('confeti-contenedor');

// Variables de estado
let musicaReproduciendo = false;
let cartaAbierta = false;
let fotoActual = 0;
const totalFotos = fotos.length;

// Texto completo de la carta
const textoCompletoCarta = `

Mi niña hermosa Grecia Allison 💖...

Hoy cumples 28 años y siento que mi vida se llena de luz al tener la fortuna de celebrarte. No sabes lo agradecido que estoy con la vida por haberte puesto en mi camino, porque llegaste en el momento perfecto y desde entonces todo es distinto, todo es mejor.

Eres la mujer más noble y de buen corazón que he conocido, siempre atenta, siempre tierna, siempre pensando en cómo hacerme sentir bien. Tus mensajes de buenos días, tus preguntas constantes sobre cómo estoy, la forma en que buscas momentos de calidad conmigo, son pruebas de un amor real, puro y tan hermoso que me conmueve.

Admiro cada detalle de ti. Tu inteligencia que me inspira, tu voz que me calma, tu mirada profunda que me da paz y seguridad, tu sonrisa que es capaz de iluminar hasta mis días más oscuros. Tienes un talento único para ver la belleza en todo lo que te rodea, y eso mismo eres tú: belleza, armonía, equilibrio y amor.

Eres arquitecta no solo de espacios, también de emociones. Contigo todo se vuelve más bello, más ordenado, más pleno. Y yo solo puedo agradecerte por construir conmigo una historia donde la paz y el amor son la base de todo.

Grecia Allison, eres mi niña hermosa, mi paz, mi refugio, mi mejor regalo. Celebro tu vida, celebro tu risa, celebro tu corazón inmenso. Amo cada parte de ti, desde lo más pequeño hasta lo más grande, y me siento el hombre más afortunado de poder llamarte mía.

Feliz cumpleaños, amor de mi vida. Que este año te devuelva todo lo bello que entregas al mundo. Yo estaré aquí, siempre orgulloso, siempre sosteniéndote, siempre amándote con todo lo que soy.

Con todo mi amor tu niño bonito
`;

// Función para escribir la carta gradualmente
function escribirCarta() {
    let index = 0;
    textoCarta.innerHTML = '';
    textoCarta.style.opacity = 1;
    
    function escribirCaracter() {
        if (index < textoCompletoCarta.length) {
            // Sustituir saltos de línea por <br>
            if (textoCompletoCarta[index] === '\n') {
                textoCarta.innerHTML += '<br>';
            } else {
                textoCarta.innerHTML += textoCompletoCarta[index];
            }
            index++;
            setTimeout(escribirCaracter, 30); // Velocidad de escritura
        } else {
            // Mostrar botón para abrir la galería cuando se termina de escribir
            abrirGaleriaBtn.style.display = 'block';
        }
    }
    
    escribirCaracter();
}

// Event listener para el sobre
sobreEnvoltura.addEventListener('click', function() {
    if (!cartaAbierta) {
        // Abrir sobre
        sobreEnvoltura.classList.add('abierto');
        carta.classList.add('carta-afuera');
        cartaAbierta = true;
        
        // Comenzar a escribir la carta después de un pequeño retraso
        setTimeout(escribirCarta, 800);
        
        // Generar confeti después de abrir el sobre
        setTimeout(generarConfeti, 1000);
        
        // Reproducir música automáticamente (si está permitido por el navegador)
        try {
            musicaFondo.play();
            musicaReproduciendo = true;
            controlMusica.textContent = "🔇 Pausar música";
        } catch(e) {
            console.log("La reproducción automática está bloqueada. El usuario debe interactuar primero.");
        }
    }
});

// Event listener para la carta
carta.addEventListener('click', function(e) {
    // Evitar que el clic se propague al sobre
    e.stopPropagation();
});

// Control de música
controlMusica.addEventListener('click', function() {
    if (musicaReproduciendo) {
        musicaFondo.pause();
        musicaReproduciendo = false;
        controlMusica.textContent = "▶️ Reproducir música";
    } else {
        musicaFondo.play();
        musicaReproduciendo = true;
        controlMusica.textContent = "🔇 Pausar música";
    }
});

// Funciones para la galería de fotos
function mostrarFoto(indice) {
    // Ocultar todas las fotos
    fotos.forEach(foto => foto.classList.remove('activa'));
    
    // Mostrar la foto actual
    fotos[indice].classList.add('activa');
    
    // Actualizar indicador
    indicadorFoto.textContent = `${indice + 1}/${totalFotos}`;
}

abrirGaleriaBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    galeriaModal.style.display = 'flex';
    mostrarFoto(0);
});

cerrarModal.addEventListener('click', function() {
    galeriaModal.style.display = 'none';
});

// Cerrar modal si se hace clic fuera del contenido
window.addEventListener('click', function(e) {
    if (e.target === galeriaModal) {
        galeriaModal.style.display = 'none';
    }
});

// Navegación de fotos
fotoAnteriorBtn.addEventListener('click', function() {
    fotoActual = (fotoActual - 1 + totalFotos) % totalFotos;
    mostrarFoto(fotoActual);
});

fotoSiguienteBtn.addEventListener('click', function() {
    fotoActual = (fotoActual + 1) % totalFotos;
    mostrarFoto(fotoActual);
});

// Función para generar confeti
function generarConfeti() {
    // Crear 50 partículas de confeti
    for (let i = 0; i < 50; i++) {
        crearParticulaConfeti();
    }
}

function crearParticulaConfeti() {
    const confeti = document.createElement('div');
    confeti.classList.add('confeti');
    
    // Posición inicial aleatoria
    const posX = Math.random() * window.innerWidth;
    const delay = Math.random() * 2;
    const initialY = -Math.random() * 100; // Posición inicial arriba de la pantalla
    
    // Estilo aleatorio
    confeti.style.left = `${posX}px`;
    confeti.style.top = `${initialY}px`;
    confeti.style.backgroundColor = getRandomColor();
    confeti.style.width = `${Math.random() * 10 + 5}px`;
    confeti.style.height = `${Math.random() * 10 + 5}px`;
    confeti.style.animationDelay = `${delay}s`;
    
    // Formas aleatorias (cuadrado, círculo, corazón)
    const shapes = ['square', 'circle', 'heart'];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    if (randomShape === 'circle') {
        confeti.style.borderRadius = '50%';
    } else if (randomShape === 'heart') {
        confeti.style.transform = 'rotate(45deg)';
        confeti.style.borderRadius = '50% 0 0 50%';
    }
    
    confetiContenedor.appendChild(confeti);
    
    // Eliminar el confeti después de la animación
    confeti.addEventListener('animationend', function() {
        confeti.remove();
    });
}

// Función para limpiar el confeti
function limpiarConfeti() {
    confetiContenedor.innerHTML = '';
}

// Generar color aleatorio para el confeti
function getRandomColor() {
    const colores = [
        '#e91e63', // Rosa
        '#9c27b0', // Morado
        '#3f51b5', // Índigo
        '#2196f3', // Azul
        '#4caf50', // Verde
        '#ffeb3b', // Amarillo
        '#ff9800', // Naranja
        '#ff5722'  // Rojo anaranjado
    ];
    
    return colores[Math.floor(Math.random() * colores.length)];
}

// Para dispositivos móviles, permitir tocar para abrir el mensaje hover
if ('ontouchstart' in window) {
    const mensajesHover = document.querySelectorAll('.mensaje-hover');
    
    mensajesHover.forEach(mensaje => {
        mensaje.addEventListener('click', function(e) {
            // Toggle clase para mostrar/ocultar el mensaje en móviles
            if (this.classList.contains('mostrar-movil')) {
                this.classList.remove('mostrar-movil');
            } else {
                // Ocultar todos los mensajes anteriores
                mensajesHover.forEach(m => m.classList.remove('mostrar-movil'));
                this.classList.add('mostrar-movil');
            }
        });
    });
    
    // Añadir CSS para mostrar el mensaje en móviles
    const style = document.createElement('style');
    style.textContent = `
        .mensaje-hover.mostrar-movil::after {
            opacity: 1;
            visibility: visible;
            bottom: 125%;
        }
    `;
    document.head.appendChild(style);
}
