const formularioCalculadora = document.getElementById('formulario-calculadora')
const resultado = document.getElementById("resultado");
const grupoGeneracion = document.getElementById("grupoGeneracion");

formularioCalculadora.addEventListener('submit' , (evento) => {
evento.preventDefault();
calcularCalorias();

})

function calcularCalorias() {

    //funcion que muestra en la ventana dos
    aparecerResultado()
    
    const edadI = document.querySelector ("#edad");
    const pesoI = document.querySelector ("#peso");
    const alturaI = document.querySelector ("#altura");
    const actividadI = document.querySelector ("#actividad");
    const tipoDocumento = document.querySelector ("#tipoDocumento");
    const genero = document.querySelector('input[name="genero"]:checked');
    const nombrePaciente = document.querySelector("#nombrePaciente");
    const numeroDocumento = document.querySelector("#cc");


    const edad = parseInt(edadI.value)
    const peso = parseInt(pesoI.value)
    const altura = parseInt(alturaI.value)
    const actividad=parseInt(actividadI.value)
    
    //grupo poblacional

    function grupoPoblacional (edad){
        if (edad >= 15 && edad <= 29){
            return "Joven";
        } else if (edad >= 30 && edad <= 59) {
            return "adultos";
        } else {
            return "Adulto mayor";
        }
    }
    let poblacion = grupoPoblacional(edad);

    //actividad ** != que sea diferente a vacio, osea que tenga algo y luego niego eso. esta es la utli
    if (!(edad && peso && altura)) { 
        mostrarMensajeDeError("Faltan campos por llenar");
        return
    }

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    };
   
    let calculoCalorias =
    genero.value === "F" 
        ? actividad *
          (multiplicadorTMB.peso * peso +
              multiplicadorTMB.altura * altura -
              multiplicadorTMB.edad * edad) -
          161
        : actividad *
          (multiplicadorTMB.peso * peso +
              multiplicadorTMB.altura * altura -
              multiplicadorTMB.edad * edad) -
          5;

           console.log(actividad);
           
    resultado.innerHTML = `
        <div class="card-body d-flex flex-column justify-content-center align-items-center h=500" id="calculo">
            <h5 class="card-title h2">Calorias Requeridas</h5>
            <div class="my-3 w-500"> 
                <input class="form-control text-center d-flex flex-column overflow-auto" value=" El paciente ${nombrePaciente.value} identificado con ${tipoDocumento.value}
                NO.${numeroDocumento.value} , requiere un total de ${Math.floor(calculoCalorias)} kcal
                para el sostenimiento de su TBM " disabled style="font-size: 2rem">
            </div>
        </div>
    `

    grupoGeneracion.innerHTML = `<div class="card-body d-flex flex-column justify-content-center align-items-center h=500">
    <h5 class="card-title h2">Grupo al que perteneces</h5>
    <div class="my-3 w-500"> 
        <input class="form-control text-center d-flex flex-column overflow-auto" value="${poblacion}" disabled style="font-size: 2rem">
    </div>
    </div>
    `
    return
    
}


function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}

