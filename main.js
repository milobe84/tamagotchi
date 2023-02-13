//Se crean las variables,la longitud y tamanos de los divs
const size = 10; //tamanio de las barras
let comida = [0,1,2,3,4,5]; //cantidad de comida al inicio
let dormida = [0,1,2,3,4,5]; //cantidad de dormir al inicio

// se capturan los divs y los botones
const comida1= document.getElementById("comida1");
const dormir1= document.getElementById("dormir1");
const vida1= document.getElementById("vida1");
const caritas1 = document.getElementById("caritas");

const comidaButton = document.getElementById("comida-button");
const dormirButton = document.getElementById("dormir-button");
const container = document.getElementById("container");
const iniciarJuego = document.getElementById("iniciar-juego");

let divs;
let intervaloComida;
let intervaloDormida;

// se deshabilitan botones antes del inicio del juego. se activan en la funcion iniciar()
comidaButton.disabled=true;
dormirButton.disabled=true;

//Eventos para los botones
comidaButton.addEventListener("click", ()=>{
  comer();
})

dormirButton.addEventListener("click", ()=>{
  dormir();
})

iniciarJuego.addEventListener("click", ()=>{
  iniciar();
  iniciarJuego.disabled=true;
})

//Se crean las funciones para crear los divs internos.
function crearComida(){
  for(let i = 0; i<size; i++){
    const div = document.createElement("div");
    comida1.appendChild(div);
  }
}

function crearDormir(){
  for(let i = 0; i<size; i++){
    const div = document.createElement("div");
    dormir1.appendChild(div);
  }
}

function crearVida(){
  for(let i = 0; i<size; i++){
    const div = document.createElement("div");
    vida1.appendChild(div);
  }
}

// Se crean la funciones para incrementar los niveles en las barras de comida y dormir.
function comer(){
  const posicionComida= comida.length;
  if (posicionComida >= size ){
    alert("Esta llena, no puede comer mas");
  }else{
    const nuevaPosicion = comida.push(posicionComida);
    pintar(nuevaPosicion-1, "comida");
    calcularVida();
  }
}

function dormir(){
  const posicionDormida= dormida.length;
  if (posicionDormida >= size ){
    alert("Esta Dormidita");
  }else{
    const nuevaPosicion = dormida.push(posicionDormida);
    pintar(nuevaPosicion-1, "dormir");
    calcularVida();
  }
}

// Se crean las fuciones para disminuir los niveles en las barras de comida y dormir.
function disminuirComida() {
  const posicionComida= comida.length;
  
  if( posicionComida<=0 ){
    return;
  }else{
    const nuevaPosCom =comida.pop();
    divs = document.querySelectorAll(".vida div");
    divs[nuevaPosCom].classList.remove("alimento-red");
    divs[nuevaPosCom].classList.remove("alimento-yellow");
    divs[nuevaPosCom].classList.remove("alimento-green");
    calcularVida();
    divs = document.querySelectorAll(".comida div");
    divs[nuevaPosCom].classList.remove("alimento-red");
    divs[nuevaPosCom].classList.remove("alimento-yellow");
    divs[nuevaPosCom].classList.remove("alimento-green");

    pintar(nuevaPosCom-1,"comida");
  }
}

function disminuirDormir() {
  const posicionDormida= dormida.length;
    
  if(posicionDormida<=0){
    return;
  }else{
    const nuevaPosCom =dormida.pop();
    divs = document.querySelectorAll(".vida div");
    divs[nuevaPosCom].classList.remove("alimento-red");
    divs[nuevaPosCom].classList.remove("alimento-yellow");
    divs[nuevaPosCom].classList.remove("alimento-green"); 
    calcularVida();
    divs = document.querySelectorAll(".dormir div");
    divs[nuevaPosCom].classList.remove("alimento-red");
    divs[nuevaPosCom].classList.remove("alimento-yellow");
    divs[nuevaPosCom].classList.remove("alimento-green");

    pintar(nuevaPosCom-1,"dormir");
    }
}

//Se crea la funcion para rellenar con los colores adecuados(semaforo) las barras de vida, comida y dormida
function pintar(longitud, tipo){

  //averiguo cual de las barras se debe pintar con el parametro tipo
  if(tipo==="comida"){
    divs = document.querySelectorAll(".comida div");
  }else if(tipo==="dormir"){
    divs = document.querySelectorAll(".dormir div");
  }else{
    divs = document.querySelectorAll(".vida div");
  }

  /*
  pintar segun el tamaño
  entre 0 y 2 pinta rojo
  entre 3 y 5 pinta amarillo
  de 6 en adelante pinta verde
  */
  if(longitud>=6){
    for(let i =0; i<=longitud; i++){
      divs[i].classList.remove("alimento-red");
      divs[i].classList.remove("alimento-yellow");
      divs[i].classList.add("alimento-green");
    }
  }else if (longitud>=3 && longitud<=5) {
    for(let i =0; i<=longitud; i++){
      divs[i].classList.remove("alimento-red");
      divs[i].classList.remove("alimento-green");
      divs[i].classList.add("alimento-yellow");
    }
  }else{
    for(let i =0; i<=longitud; i++){
      divs[i].classList.remove("alimento-green");
      divs[i].classList.remove("alimento-yellow");
      divs[i].classList.add("alimento-red");
    }
  }
}

// Se crea la funcion para calcular el promedio de comida y dormida y obtener la longitud de la vida 
function calcularVida(){
  limpiarVida();
  
  const promedio = (Math.ceil((dormida.length + comida.length) /2));

  /**
   * si el promedio esta
   * entre 0 y 2 -> pintar cara enferma
   * entre 3 y 5 -> pintar cara regular
   * mayor o igual a 6 -> pintar cara feliz
   */
  if(promedio>=6){
    caritas1.src="imagenes/feliz.png";
  }else if(promedio>=3 && promedio<=5){
    caritas1.src="imagenes/regular.png";
  }else if(promedio>0 && promedio<=2){
    caritas1.src="imagenes/mal.png";
  }else{
    //muere, fin del juego.
    finJuego();
  }
  pintar(promedio-1,"vida");
}

//se limpia el div de vida.
function limpiarVida(){
  vida1.innerHTML='';
  crearVida();
}

//funcion para iniciar el juego, pinta todo y empieza el juego.
function iniciar(){
  //habilitar los botones de comer y dormir
  comidaButton.disabled=false;
  dormirButton.disabled=false;

  crearComida();
  pintar(comida.length-1,"comida");

  crearDormir();
  pintar(dormida.length-1,"dormir");

  crearVida();
  calcularVida();

  //setInterval permite ejecutar una funcion cada X tiempo, en milisegundos.
  intervaloComida = setInterval(disminuirComida,3000);
  intervaloDormida = setInterval(disminuirDormir,3000);
}

//esta funcion presenta el final del juego.
function finJuego(){
  clearInterval(intervaloComida);
  clearInterval(intervaloDormida);
  caritas1.src="imagenes/muerto.png";
  container.innerHTML='';
  let btn = document.createElement("button");
  btn.innerHTML = "Reiniciar";
  btn.id="btnReiniciar";
  btn.onclick = function () {
    location.reload(true);
  };
  container.appendChild(btn);
}
