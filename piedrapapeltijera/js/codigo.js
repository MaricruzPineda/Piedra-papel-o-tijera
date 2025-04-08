/* // Funciones
//Función mayor de edad
function mayorEdad(nacimiento) {
    //El split separa la fecha en día mes y año
    let fecha = nacimiento.split("/");
    //Se coloca para verificra que haya tres datos
    if (fecha.length !== 3) {
        return false;
    }
    //Especificar que son los arreglos de números, 0=dia 1=mes 2=año de nacimiento del usuario
    let dia = parseInt(fecha[0]);
    let mes = parseInt(fecha[1]);
    let añoUsuario = parseInt(fecha[2]);
    // isNan y el or para ver que sean números lo que se ingreso
    if (isNaN(dia) || isNaN(mes) || isNaN(añoUsuario)) {
        return false;
    }
    //Obtener la fecha actual y obtener unicamente el año para saber la edad, usando new Date para
    // traer la fecha actual y con el getFullYear se extrae solo el año en el que estamos
    let fechaActual = new Date();
    let añoActual = fechaActual.getFullYear();
    let edad = añoActual - añoUsuario;
    // Verificar si ya cumplió años este año, extrayendo el dia y mes, en el mes se le añade +1
    // ya que en js los meses van del 0 al 11
    let mesActual = fechaActual.getMonth() + 1;
    let diaActual = fechaActual.getDate();
    if (mes > mesActual || (mes == mesActual && dia > diaActual)) {
        //Se coloca para restar uno a la edad en caso de que no cimpla ninguna de lad oncidiciones anteriores
        edad--;
    }
    //Compara la edad obtenida y verifica que sea mayor o menor que 18
    return edad >= 18;
}

// Preguntar nombre y fecha de nacimiento al usuario
let nombre = prompt("Ingrese su nombre:");
let nacimiento = prompt("Ingrese su fecha de nacimiento en formato DD/MM/AAAA:");

// Validar si es mayor de 18 años
if (mayorEdad(nacimiento) == true) {
    alert("Hola,  " + nombre + ". Puedes jugar 😊");
    // Función para obtener un número aleatorio
    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // Función para convertir la elección numérica en texto
    function eleccion(opcion) {
        if (opcion == 1) return "piedra 💎";
        if (opcion == 2) return "papel 📝";
        if (opcion == 3) return "tijera ✂";
        return "elección inválida";
    }
    // Función para el combate entre jugador y PC
    function mostrarResultado(mensaje) {
        document.getElementById("resultado").textContent = mensaje;
    }

    // Modifica la función combate para usar mostrarResultado
    function combate(pc, jugador) {
        if (pc == jugador) {
            mostrarResultado("PC eligió " + eleccion(pc) + ". Hay un EMPATE.");
            return "EMPATE";
        }
        if (jugador == 1 && pc == 3 || jugador == 2 && pc == 1 || jugador == 3 && pc == 2) {
            triunfos++;
            mostrarResultado("GANASTE. PC eligió " + eleccion(pc));
            return "GANASTE";
        } else {
            perdidas++;
            mostrarResultado("PERDISTE. PC eligió " + eleccion(pc));
            return "PERDISTE";
        }
    }
    //Declarar variables para poder iniciar el while
    let triunfos = 0;
    let perdidas = 0;
    //Empieza el while para verificar que triunfos o pérdidas no sean 3
    while (triunfos < 3 && perdidas < 3) {
        let jugador;
        while (isNaN(jugador) || jugador < 1 || jugador > 3) {
            jugador = parseInt(prompt(nombre + ", elige: 1 para piedra, 2 para papel, 3 para tijera"));
        }
        //La PC hace el aletorio
        let pc = aleatorio(1, 3);
        //Dice que escogió cad quipen y realiza el combate
        alert("Jugador elige: " + eleccion(jugador));
        alert("PC elige: " + eleccion(pc));
        alert(combate(pc, jugador));
    }
    //El alert para que cuando acabe se mencione cuantas veces perdió o ganó
    alert(nombre + ", ganaste: " + triunfos + " veces. Perdiste: " + perdidas + " veces.");
}
else {
    alert("No puedes jugar, eres menor de edad o verifica que hayas ingresado correctamente la fecha");
} */













  // Configurar el campo de fecha con el año actual como máximo
document.addEventListener('DOMContentLoaded', function() {
    const fechaInput = document.getElementById("nacimiento");
    fechaInput.max = new Date().toISOString().split("T")[0];
    
    // Establecer fecha mínima razonable (100 años atrás)
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    fechaInput.min = minDate.toISOString().split("T")[0];

    // Event listener para el formulario
    document.getElementById("formulario").addEventListener("submit", function(e) {
        e.preventDefault();
        validarYComenzar();
    });

    // Event listener para el botón comenzar
    document.getElementById("comenzar").addEventListener("click", validarYComenzar);
});

// Función para validar datos y comenzar el juego
function validarYComenzar() {
    const nombre = document.getElementById("nombre").value.trim();
    const nacimiento = document.getElementById("nacimiento").value;
    const formulario = document.getElementById("formulario");

    // Validación mejorada
    if (!nombre || nombre.length < 2) {
        mostrarAlerta("Por favor, ingresa un nombre válido (mínimo 2 caracteres).", "error");
        return;
    }

    if (!nacimiento) {
        mostrarAlerta("Por favor, selecciona tu fecha de nacimiento.", "error");
        return;
    }

    const fechaNacimiento = new Date(nacimiento);
    if (isNaN(fechaNacimiento.getTime())) {
        mostrarAlerta("Por favor, ingresa una fecha válida.", "error");
        return;
    }

    if (!mayorEdad(nacimiento)) {
        mostrarAlerta("Lo siento, debes ser mayor de edad para jugar.", "error");
        return;
    }

    mostrarAlerta(`¡Bienvenido ${nombre}! 🎮`, "success");
    document.getElementById("registro").style.display = "none";
    document.getElementById("juego").style.display = "block";
    formulario.reset();
    iniciarJuego(nombre);
}

// Función para mostrar alertas estilizadas
function mostrarAlerta(mensaje, tipo) {
    const alertaExistente = document.querySelector('.alerta');
    if (alertaExistente) {
        alertaExistente.remove();
    }

    const alerta = document.createElement('div');
    alerta.className = `alerta alerta-${tipo}`;
    alerta.textContent = mensaje;
    alerta.setAttribute('role', 'alert');
    document.body.appendChild(alerta);

    setTimeout(() => {
        alerta.style.opacity = '0';
        setTimeout(() => alerta.remove(), 500);
    }, 3000);
}

// Función para verificar si es mayor de edad
function mayorEdad(nacimiento) {
    const fechaNacimiento = new Date(nacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    
    return edad >= 18;
}

// Función principal del juego
function iniciarJuego(nombre) {
    let triunfos = 0;
    let perdidas = 0;
    let jugando = true;

    const contadorTriunfos = document.getElementById("contador-triunfos");
    const contadorPerdidas = document.getElementById("contador-perdidas");
    const resultado = document.getElementById("resultado");
    const botones = document.querySelectorAll(".boton");
    const botonReiniciar = document.getElementById("reiniciar");

    // Mejorar accesibilidad de los botones
    botones.forEach(boton => {
        boton.setAttribute('aria-label', `Elegir ${boton.id}`);
        boton.addEventListener("click", function() {
            if (!jugando) return;

            const jugador = boton.id === "piedra" ? 1 : boton.id === "papel" ? 2 : 3;
            const pc = aleatorio(1, 3);
            const resultadoCombate = combate(pc, jugador);
            
            mostrarResultado(resultadoCombate);
            actualizarContadores(resultadoCombate);
            verificarFinJuego();
        });
    });

    // Función para mostrar el resultado con animación
    function mostrarResultado(mensaje) {
        resultado.style.opacity = '0';
        setTimeout(() => {
            resultado.textContent = mensaje;
            resultado.style.opacity = '1';
            // Mejorar accesibilidad del resultado
            resultado.setAttribute('aria-live', 'polite');
        }, 200);
    }

    // Función para actualizar contadores
    function actualizarContadores(resultadoCombate) {
        if (resultadoCombate.includes("GANASTE")) {
            triunfos++;
            contadorTriunfos.textContent = triunfos;
            contadorTriunfos.classList.add('contador-animado');
            setTimeout(() => contadorTriunfos.classList.remove('contador-animado'), 300);
        } else if (resultadoCombate.includes("PERDISTE")) {
            perdidas++;
            contadorPerdidas.textContent = perdidas;
            contadorPerdidas.classList.add('contador-animado');
            setTimeout(() => contadorPerdidas.classList.remove('contador-animado'), 300);
        }
    }

    // Función para verificar si el juego terminó
    function verificarFinJuego() {
        if (triunfos === 3 || perdidas === 3) {
            jugando = false;
            const mensajeFinal = triunfos === 3 ? 
                `¡Felicitaciones ${nombre}! Has ganado el juego 🏆` : 
                `¡Juego terminado ${nombre}! La computadora ha ganado 🤖`;
            
            mostrarAlerta(mensajeFinal, triunfos === 3 ? "success" : "error");
            botones.forEach(b => {
                b.classList.add('deshabilitado');
                b.setAttribute('disabled', 'true');
            });
            botonReiniciar.style.display = "block";
            botonReiniciar.focus();
        }
    }

    // Event listener para el botón reiniciar
    botonReiniciar.addEventListener("click", function() {
        triunfos = 0;
        perdidas = 0;
        jugando = true;
        contadorTriunfos.textContent = '0';
        contadorPerdidas.textContent = '0';
        resultado.textContent = '';
        botones.forEach(b => {
            b.classList.remove('deshabilitado');
            b.removeAttribute('disabled');
        });
        botonReiniciar.style.display = "none";
        mostrarAlerta("¡Juego reiniciado! 🎮", "success");
    });
}

// Funciones auxiliares
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function eleccion(opcion) {
    const opciones = {
        1: "Piedra 🗿",
        2: "Papel 📄",
        3: "Tijera ✂️"
    };
    return opciones[opcion] || "Opción inválida";
}

function combate(pc, jugador) {
    if (pc === jugador) {
        return `PC eligió ${eleccion(pc)}. ¡EMPATE! 🤝`;
    }
    
    const victorias = {
        "1-3": true, // Piedra vence a Tijera
        "2-1": true, // Papel vence a Piedra
        "3-2": true  // Tijera vence a Papel
    };
    
    const gano = victorias[`${jugador}-${pc}`];
    return gano ? 
        `¡GANASTE! PC eligió ${eleccion(pc)} 🎉` : 
        `¡PERDISTE! PC eligió ${eleccion(pc)} 😢`;
}