/* Form steps */

var currentTab = 0;
var info = document.getElementById('info')
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("tab ");
    x[n].style.transition = "all .4s "
    x[n].style.transform = "scale(1) ";

    if (n == (x.length - 1))
        document.getElementById("nextBtn").style.display = "none ";
    else
        document.getElementById("nextBtn").style.display = "inline "
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none ";
        document.getElementById("nextBtn").style.display = "none ";
    } else
        document.getElementById("prevBtn").style.display = "inline ";


    if (n == 0)
        info.innerHTML = 'Selecione a agenda deste evento'
    if (n == 1)
        info.innerHTML = 'Preencha os dados do evento'
    if (n == 2)
        info.innerHTML = 'Defina a imagem do evento'
    if (n == 3)
        info.innerHTML = 'Selecione os moderadores do evento'


    fixStepIndicator(n)
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab ");
    x[currentTab].style.transition = "all .5s "
    x[currentTab].style.transform = "scale(0) ";
    currentTab = currentTab + n;

    showTab(currentTab);
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step ");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active ", " ");
    }
    x[n].className += " active ";
}

/************************************************************************************************/
/*Select moderadores*/

let moderadores = []
let todosModeradores = Array.from(document.querySelectorAll('#moderadores option'));

var setModerador = (moderador) => {

    let isModerador = moderadores.indexOf(moderador);

    if (isModerador !== -1) {

        todosModeradores.forEach(function(v) {
            if (v.value == moderadores[isModerador])
                v.selected = false
        })

        moderadores.splice(isModerador, 1)

    } else {

        moderadores.push(moderador)
        moderadores.forEach(function(moderadorSelecionado) {
            todosModeradores.forEach(function(v) {
                if (v.value == moderadorSelecionado)
                    v.selected = true
            })
        })

    }
}

// Pega os moderadores do select e atribui ao checkbox


let todosModeradoresSelecionados = Array.from(document.querySelectorAll('#moderadores option'));

setModeradores()

function setModeradores() {
    todosModeradoresSelecionados.forEach(function(v) {
        if (v.selected == true) {
            var x = document.getElementById('m' + v.value).checked = "checked"
            moderadores.push(v.value) //Pode ser que essa linha não seja necessária
        }
    })
}