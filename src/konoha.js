/* Menu responsive */
var menuResponsive = () => {
    let menu = document.getElementById('menu')
    let menuIcon = document.getElementById('menuIcon')

    if (menu.style.height == '220px') {
        menu.style.height = '85px'
        menu.style.transition = 'all .7s'
        menuIcon.classList.add('mdi-menu')
        menuIcon.classList.remove('mdi-window-close')
    } else {
        menu.style.height = '220px'
        menu.style.transition = 'all .7s'
        menuIcon.classList.remove('mdi-menu')
        menuIcon.classList.add('mdi-window-close')
    }
}




/* Menu responsive - Dashboarb*/
var btnMenuDashboard = () => {

    let menu = document.getElementById('menuDashboard')
    let menuIcon = document.getElementById('menuIcon')

    if (menu.style.width == '275px') {
        menu.style.width = '0px'
        menu.style.transition = 'all .7s'
        menuIcon.classList.add('mdi-menu')
        menuIcon.classList.remove('mdi-window-close')
    } else {
        menu.style.width = '275px'
        menu.style.transition = 'all .7s'
        menuIcon.classList.remove('mdi-menu')
        menuIcon.classList.add('mdi-window-close')
    }
}


/* Botão Sair */

var mudarTextoBotao = () => {
    document.getElementById('sair').innerHTML = "<i class='mdi mdi-logout'></i>Desconectar"
}
var voltarTextoBotao = () => {
    document.getElementById('sair').innerHTML = "<i class='mdi mdi-circle'></i>Conectado"
}




/*Modal*/
var openModal = () => {
    let modal = document.getElementById('modal');
    modal.style.display = "block";
}
var closeModal = () => {
    modal.style.display = "none";

}

/*Modal PDF*/
var viewPdf = () => {
    let modalPdf = document.getElementById('modalPdf');
    modalPdf.style.display = "block"
}

// Close modal pdf
var closeModalPdf = () => {
    let modalPdf = document.getElementById('modalPdf');
    modalPdf.style.display = "none"
}

/*Modal Qr Code*/
var openModalQrCode = () => {
    let modalQrCode = document.getElementById('modalQrCode');
    modalQrCode.style.display = 'block'
}

var closeModalQrCode = () => {
    let modalQrCode = document.getElementById('modalQrCode');
    modalQrCode.style.display = "none"
}




/* Preview image etc.*/
var loadFile = () => {
    let previewImage = document.getElementById('previewImage')
    previewImage.src = URL.createObjectURL(event.target.files[0])

    let labelUploadImage = document.getElementById('labelUploadImage').style.display = 'none'

    let cancelUpload = document.getElementById('cancelUpload').style.display = 'block'
};

var cancelUpload = () => {

    let previewImage = document.getElementById('previewImage').src = ""

    let labelUploadImage = document.getElementById('labelUploadImage').style.display = 'block'

    let cancelUpload = document.getElementById('cancelUpload').style.display = 'none'
}


/* Form steps */

var currentTab = 0;

function showTab(n) {
    var info = document.getElementById('info')
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

function resetCurrentTab() {
    currentTab = 0
}