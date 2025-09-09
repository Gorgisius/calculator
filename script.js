const display = document.getElementById("display");
const botones = document.querySelectorAll("button");
const operadores = ["+", "-", "/", "*", "%"]

let after = false;
let first_num = "";
let current_operator = '';
let second_num = "";
let result = 0;

// Funcionalidad de botones
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const tipo = boton.dataset.tipo;

        // Numeros
        if (tipo === "numero") {
            // Si es el primer numero
            if (display.innerText === "0") {
                // Remplazar al 0
                display.innerText = boton.dataset.valor;
                if (!after){
                    first_num += boton.dataset.valor;
                } else {
                    second_num += boton.dataset.valor;
                }
            } else {
                // Agregar
                display.innerText += boton.dataset.valor;
                if (!after){
                    first_num += boton.dataset.valor;
                } else {
                    second_num += boton.dataset.valor;
                }
        
            }

        // Operadores
        } else if (tipo === "operacion") {
            let current_text = display.innerText;
            // Cambiar operador
            if (operadores.includes(current_text[current_text.length - 1])) {
                display.innerText = current_text.slice(0, -1) + boton.innerText;
                current_operator = boton.innerText;
                after = true;
            } else {
                // Agregar
                display.innerText += boton.innerText;
                current_operator = boton.innerText;
                after = true;
            }

        // Especiales
        } else if (tipo === "especial") {
            // Borrar AC
            if (boton.dataset.accion === "borrar") {
                display.innerText = 0;
                first_num = "";
                current_operator = "";
                second_num = "";
                after = false;
            }
            // Calcular resultado
            if (boton.dataset.accion === "resultado") {
                let result = eval(`${first_num} ${current_operator} ${second_num}`);
                display.innerText = result;
                first_num = result;
                current_operator = "";
                second_num = "";
                after = false;
            }
            // Invertir signo
            if (boton.dataset.accion === "invertir") {
                let current_text = display.innerText;
                if (!after) {
                    if (current_text[0] !== "-"){
                        display.innerText = "-" + current_text;
                    } else {
                        display.innerText = current_text.slice(1);
                    }
                } else {
                    let i = current_text.indexOf(second_num);
                    if (second_num[0] !== "-"){
                        second_num = "-" + second_num;
                        display.innerText = first_num + current_operator + second_num;
                    } else {
                        second_num = second_num.slice(1);
                        display.innerText = first_num + current_operator + second_num;
                    }
                }
            }
        }
    });
});