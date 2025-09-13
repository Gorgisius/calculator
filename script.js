const display = document.getElementById("display");
const botones = document.querySelectorAll("button");
const operadores = ["+", "-", "/", "*", "%"];
const toggleTheme = document.getElementById("theme-toggle");

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
    let second_num_parsed;
    let first_num_parsed = parseFloat(first_num).toLocaleString('en-US', {maximumFractionDigits: 6});
    if (second_num === "") { // Si no hay second_num, no hay parseo
        second_num_parsed = "";
    } else {
        second_num_parsed = parseFloat(second_num).toLocaleString('en-US', {maximumFractionDigits: 6});
    }
    let formatted_result = first_num_parsed + current_operator + second_num_parsed;
    display.innerText = formatted_result;
}

function result() {
    lastResult = eval(`${first_num} ${current_operator} ${second_num}`);
    first_num = lastResult;
    current_operator = "";
    second_num = "";
    after = false;
    updateDisplay();
}

// Link keys to buttons
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
            if (!after && first_num.length < 10) { //Limitar a 10 digitos
                first_num += boton.dataset.valor;
                updateDisplay();
            // Si es second_num
            } else if (after && second_num.length < 10) { //Limitar a 10 digitos
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
                // Si en el primer numero
                if (!after && first_num !== "") {
                    // Si ya es negativo
                    if (first_num.includes("-")){ // Quitar signo negativo
                        first_num = first_num.slice(1);
                        updateDisplay();
                    } else {
                    // Si no es negativo
                        first_num = "-" + first_num; // Agregar signo negativo
                        updateDisplay();
                    }
                // Si en el segundo numero
                } else if (after){
                    // Si ya es negativo
                    if (second_num.includes("-")){ // Quitar signo negativo
                        second_num = second_num.slice(1);
                        updateDisplay();
                    // Si no es negativo
                    } else {
                        second_num = "-" + second_num; // Agregar signo negativo
                        updateDisplay();
                    }
                }
            }
        }
    });
});

toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

if(localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
}