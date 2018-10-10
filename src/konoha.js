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