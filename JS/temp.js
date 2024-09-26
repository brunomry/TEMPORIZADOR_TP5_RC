
const h2 = document.querySelector('h2');
const btnIniciar = document.getElementById('btnIniciar');
const btnPausar = document.getElementById('btnPausar');
const btnContinuar = document.getElementById('btnContinuar');
const btnRestablecer = document.getElementById('btnRestablecer');
const containerSelects = document.getElementById('containerSelects');
const selectHoras = document.getElementById('horas');
const selectMinutos = document.getElementById('minutos');
const selectSegundos = document.getElementById('segundos');
const parrafoEstablecerTemp = document.querySelectorAll('p')[0];
let contadorSegundos;
let contadorMinutos;
let contadorHoras;
let hora;
let minuto;
let segundo;

btnPausar.hidden = true;
btnContinuar.hidden = true;
btnRestablecer.hidden = true;

const concatenar = i => i < 10 ? "0" + i : i;

const mostrar = () => {
  hora = concatenar(contadorHoras);
  minuto = concatenar(contadorMinutos);
  segundo = concatenar(contadorSegundos);
  h2.innerHTML = `<h2 class="display-3 fw-bold text-white">${hora} : ${minuto} : ${segundo}</h2>`;
}

const comenzarTemporizador = () => {
  if(contadorSegundos > 0){
    contadorSegundos--;
  }

  if(contadorSegundos == 0 && contadorMinutos > 0){
    hora = concatenar(contadorHoras);
    contadorSegundos = 59;
    segundo = concatenar(contadorSegundos);
    contadorMinutos--;
    minuto = concatenar(contadorMinutos);
    h2.innerHTML = `<h2 class="display-3 fw-bold text-white">${hora} : ${minuto} : ${segundo}</h2>`;
  }

  if(contadorMinutos == 0 && contadorSegundos == 0 & contadorHoras > 0){
    contadorHoras--;
    hora = concatenar(contadorHoras);
    contadorMinutos = 59;
    minuto = concatenar(contadorMinutos);
    contadorSegundos = 59;
    segundo = concatenar(contadorSegundos);
    h2.innerHTML = `<h2 class="display-3 fw-bold text-white">${hora} : ${minuto} : ${segundo}</h2>`;
  }

  if(contadorHoras == 0 && contadorMinutos == 0 && contadorSegundos == 0){
    clearInterval(temporizador);
    btnPausar.hidden = true;
    btnRestablecer.textContent = 'Programar uno nuevo';
    btnRestablecer.classList.add('m-auto','bg-success');
  }

  hora = concatenar(contadorHoras);
  minuto = concatenar(contadorMinutos);
  segundo = concatenar(contadorSegundos);
  h2.innerHTML = `<h2 class="display-3 fw-bold text-white">${hora} : ${minuto} : ${segundo}</h2>`
}

//delegacion de eventos
document.addEventListener('click', e => {
  if(e.target.matches('#btnIniciar')){ 
    contadorSegundos = selectHoras.value;
    contadorMinutos = selectMinutos.value;
    contadorHoras = selectSegundos.value;
  
    if(contadorSegundos > 0) contadorSegundos++;
  
    if(contadorHoras > 0 || contadorMinutos > 0 || contadorSegundos > 0){
      btnIniciar.hidden = true;
      btnPausar.hidden = false;
      btnRestablecer.hidden = false;
      btnRestablecer.textContent = 'Restablecer';
      btnRestablecer.classList.remove('bg-success');
      parrafoEstablecerTemp.hidden = true;
      containerSelects.className = 'd-none';
    
      temporizador = setInterval(() => {
          mostrar();
          comenzarTemporizador();
      },1000);
    }
  }

  if(e.target.matches('#btnPausar')){
    btnPausar.hidden = true;
    btnContinuar.hidden = false; 
    clearInterval(temporizador);
  }

  if(e.target.matches('#btnContinuar')){
    btnContinuar.hidden = true;
    btnPausar.hidden = false; 
    temporizador = setInterval(() => comenzarTemporizador(),1000);
  }

  if(e.target.matches('#btnRestablecer')){
    btnIniciar.hidden = false;
    parrafoEstablecerTemp.hidden = false;
    containerSelects.className = 'container d-flex gap-1 gap-sm-4 justify-content-center align-items-center rounded-2 text-center text-white';
    btnPausar.hidden = true;
    btnContinuar.hidden = true;
    btnRestablecer.hidden = true;
  
    contadorSegundos = 0;
    contadorMinutos = 0;
    contadorHoras = 0;
  
    hora = concatenar (contadorHoras);
    minuto = concatenar(contadorMinutos);
    segundo = concatenar(contadorSegundos);
  
    clearInterval(temporizador);
   
    h2.innerHTML = `<h2 class="display-3 fw-bold text-white"> ${hora} : ${minuto} : ${segundo}</h2>`;
  }
})