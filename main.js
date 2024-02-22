const formularioCalculadora = document.getElementById('formulario-calculadora')
const resultado = document.getElementById("resultado");

formularioCalculadora.addEventListener('submit' , (evento) => {
evento.preventDefault();
calcularCalorias();
})

function calcularCalorias() {

    //funcion que muestra en la ventana dos
    aparecerResultado()

    const edad = document.querySelector ("#edad");
    const peso = document.querySelector ("#peso");
    const altura = document.querySelector ("#altura");
    const actividad = document.querySelector ("#actividad");
    const genero = document.querySelector('input[name="genero"]:checked');
    //console.log(genero.value)

    //actividad ** != que sea diferente a vacio, osea que tenga algo y luego niego eso. esta es la utli
    if (!(edad.value && peso.value && altura.value)) { 
        mostrarMensajeDeError("Faltan campos por llenar");
        return
    }

    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    };

    let calculoCalorias;
     if(genero.id == 'femenino') {
        // mujeres: valor actividad * (10 * peso en kg) + (6.25 * altura en cm) - (5x edad en años) - 161
         calculoCalorias = actividad.value *   ((multiplicadorTMB.peso * peso.value) +
                                                (multiplicadorTMB.altura * altura.value) - 
                                                (multiplicadorTMB.edad * edad.value)) - 161;
    } else {
        // hombres: valor actividad * (10 * peso en kg) + (6.25 * altura en cm) - (5x edad en años) + 5
        calculoCalorias = actividad.value *    ((multiplicadorTMB.peso * peso.value)+
                                                (multiplicadorTMB.altura * altura.value) - 
                                                (multiplicadorTMB.edad * edad.value)) + 5;
    }
    console.log(calculoCalorias);  
     

    resultado.innerHTML = `
        <div class="card-body d-flex flex-column justify-content-center align-items-center h=100" id="calculo">
            <h5 class="card-title h2">Calorias Requeridas</h5>
            <div class="my-3 w-100"> 
                <input class="form-control text-center" value="${Math.floor(calculoCalorias)}" disabled style="font-size: 2rem">
            </div>
        </div>

    `
    
}

function mostrarMensajeDeError(mensaje) {
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