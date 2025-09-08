const display = document.getElementById("display");
const botones = document.querySelectorAll("button");
const operadores = ["+", "-", "/", "*"]
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const tipo = boton.dataset.tipo;

        if (tipo === "numero") {
            if (display.innerText === "0") {
                display.innerText = boton.dataset.valor;
            } else {
                display.innerText += boton.dataset.valor;
            }
        } else if (tipo === "operacion") {
            let current_text = display.innerText;
            if (operadores.includes(current_text[current_text.length - 1])) {
                display.innerText = current_text.slice(0, -1) + boton.innerText;
            } else {
                display.innerText += boton.innerText;
            }

        } else if (tipo === "especial") {
            if (boton.dataset.accion === "borrar") {
                display.innerText = 0;
            }
        }
    });
});