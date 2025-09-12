const display = document.getElementById("display");
const botones = document.querySelectorAll("button");
const operadores = ["+", "-", "/", "*", "%"];

// Botones
const igual = document.getElementById("igual");
const one = document.getElementById("uno");
const two = document.getElementById("dos");
const three = document.getElementById("tres");
const four = document.getElementById("cuatro");
const five = document.getElementById("cinco");
const zero = document.getElementById("zero");
const dot = document.getElementById("punto");
const add = document.getElementById("sumar");
const subtract = document.getElementById("restar");
const six = document.getElementById("seis");
const seven = document.getElementById("siete");
const eight = document.getElementById("ocho");
const nine = document.getElementById("nueve");
const divide = document.getElementById("dividir");
const mult = document.getElementById("multiplicar");
const mod = document.getElementById("modulo");
const invert = document.getElementById("invertir");
const del = document.getElementById("AC");

let after = false;
let first_num = "";
let current_operator = "";
let second_num = "";
let lastResult = 0;

// Function to update display
function updateDisplay() {
    display.innerText = first_num + current_operator + second_num;
}

function result() {
    lastResult = eval(`${first_num} ${current_operator} ${second_num}`);
    first_num = lastResult;
    current_operator = "";
    second_num = "";
    after = false;
    updateDisplay();
}

// Link keys to
document.addEventListener("keydown", function(e) {
    const pressedKey = e.key;
    if (pressedKey === "Enter"){
        e.preventDefault();
        igual.click();
    } else if (pressedKey === "1"){
        one.click();
    } else if (pressedKey === "2"){
        two.click();
    } else if (pressedKey === "3"){
        three.click();
    } else if (pressedKey === "4"){
        four.click();
    } else if (pressedKey === "5"){
        five.click();
    } else if (pressedKey === "6"){
        six.click();
    } else if (pressedKey === "7"){
        seven.click();
    } else if (pressedKey === "8"){
        eight.click();
    } else if (pressedKey === "9"){
        nine.click();
    } else if (pressedKey === "0"){
        zero.click();
    } else if (pressedKey === "+"){
        add.click();
    } else if (pressedKey === "-"){
        subtract.click();
    } else if (pressedKey === "*"){
        mult.click();
    } else if (pressedKey === "/"){
        e.preventDefault();
        divide.click();
    } else if (pressedKey === "%"){
        mod.click();
    } else if (pressedKey === "."){
        dot.click();
    } else if (pressedKey === "Backspace"){
        del.click();
    } else if (pressedKey === "c"){
        invert.click();
    }
});

// Funcionalidad de botones
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const tipo = boton.dataset.tipo;

        // Numeros
        if (tipo === "numero") {
            if (boton.dataset.valor === "." && (first_num.includes(".") && !after || second_num.includes(".") && after)) {
                return; // Evitar agregar otro punto decimal
            } 
            else if (boton.dataset.valor === "0" && first_num === "" && !after) {
                return; // Evitar agregar ceros a la izquierda en el primer numero
            }
            // Si es first_num
            if (!after) {
                first_num += boton.dataset.valor;
                updateDisplay();
            // Si es second_num
            } else {
                second_num += boton.dataset.valor;
                updateDisplay();
            }

        // Operadores
        } else if (tipo === "operacion") {
            // Cambiar operador si no hay segundo numero aun
            if (first_num !== "" && second_num === "") {
                current_operator = boton.innerText;
                after = true;
                updateDisplay();
            // Calcular resultado y seguir operando si ya hay segundo numero
            } else if (first_num !== "" && second_num !== "") {
                result();
                current_operator = boton.innerText;
                after = true;
                updateDisplay();
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
                result();
            }
            // Invertir signo
            if (boton.dataset.accion === "invertir") {
                if (!after) {
                    if (first_num.includes("-")){
                        first_num = first_num.slice(1);
                        updateDisplay();
                    } else {
                        first_num = "-" + first_num;
                        updateDisplay();
                    }
                } else {
                    if (second_num.includes("-")){
                        second_num = second_num.slice(1);
                        updateDisplay();
                    } else {
                        second_num = "-" + second_num;
                        updateDisplay();
                    }
                }
            }
        }
    });
});