const btn = document.getElementById('button-email');
const nombre = document.getElementById('name');
const correo = document.getElementById('email');
const mensaje = document.getElementById('message');
const inputs = [nombre, correo, mensaje];
const footerText = document.getElementById('footer-text');
const footerIcons = document.getElementById('footer-icons');
const footerArrow = document.getElementById('footer-arrow');


const regexNombre = /^[a-zA-Z\s+]{5,}$/;
const regexCorreo = /^[^@\t\n\r]{5,}@[^@\t\n\r]{3,}.[^@\t\n\r]{2,}/;

if (screen.width < 700){
  footerText.classList.add('order-3');
  footerIcons.classList.add('order-1');
  footerArrow.classList.add('order-2');
}

//Enviar datos de contacto
document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();
   nombre.value = nombre.value.trim();
   correo.value = correo.value.trim();
   mensaje.value = mensaje.value.trim();

   if(validarDatos()){
    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_9wk63eg';
 
    emailjs.sendForm(serviceID, templateID, this)
     .then(() => {
       btn.value = 'Enviar email';
       Swal.fire({
        position: "top",
        text: 'Mensaje enviado exitosamente',
        width: 600,
        padding: '3em',
        color: '#5252fcd9',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://mantenimiento.pe/wp-content/uploads/2020/06/mensajeneviado.gif")
          no-repeat
          bottom
        `
      });
      nombre.value = "";
      correo.value ="";
      mensaje.value = "";
     }, (err) => {
       btn.value = 'Enviar email';
       alert(JSON.stringify(err));
     });
   }

});



//Validar datos de contacto
function validarDatos(){

  inputs.forEach(elemento => {
    if (elemento.nextElementSibling.classList.contains("wrong-text")){
      elemento.nextElementSibling.remove();
      elemento.style.border = "solid thin red";
    }
  });

  let valido = true;

  if (!regexNombre.test(nombre.value)){
    valido = false;
    nombre.style.border = "solid thin red";
    nombre.insertAdjacentHTML("afterend", `<p class="wrong-text">Nombre inválido</p>`);
  }

  if (!regexCorreo.test(correo.value)){
    valido = false;
    correo.style.border = "solid thin red";
    correo.insertAdjacentHTML("afterend", `<p class="wrong-text">Correo inválido</p>`);
  }

  if (mensaje.value.length < 10){
    valido = false;
    mensaje.style.border = "solid thin red";
    mensaje.insertAdjacentHTML("afterend", `<p class="wrong-text">Mensaje inválido</p>`);
  }

  return valido;

}

//Carrusel
let items = document.querySelectorAll('.carousel .carousel-item')

		items.forEach((el) => {
			const minPerSlide = 4;
			let next = el.nextElementSibling
			for (var i=1; i<minPerSlide; i++) {
				if (!next) {
            // wrap carousel by using first child
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
});


//Animación navbar
const menuLinks = document.querySelectorAll('a[href^="#"');
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    const id = entry.target.getAttribute(`id`);
    const menulink = document.querySelector(`a[href="#${id}"`);

    if (entry.isIntersecting){
      menulink.classList.add("active");
    } else{
      menulink.classList.remove("active");

    }
  });
}, {rootMargin: "40px 0px -40% 0px",

threshold:0.4,});

menuLinks.forEach(menuLink => {
  const hash = menuLink.getAttribute("href");
  const target = document.querySelector(hash);
  if(target){
    observer.observe(target);
  }
});



//Animación proyectos

const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");


const cargarImagen = (entradas, observador) => {
  console.log(entradas);
  console.log(img1.style.height)
  entradas.forEach((entrada) => {
    if(entrada.isIntersecting){
      entrada.target.classList.add("img-proy-visible");
     } else{
      entrada.target.classList.remove("img-proy-visible");
     }
  });
};

const observador = new IntersectionObserver(cargarImagen, {
  root:null,
  rootMargin:'0px 0px 0px 0px',
  threshold:0.6,
});

observador.observe(img1);
observador.observe(img2);

//Más proyectos
const btnProyectos = document.getElementById('btn-proyectos');
const p2 = document.getElementById('p2');

btnProyectos.addEventListener('click', () => {
  p2.insertAdjacentHTML('afterend', `        <div class="div-proy" id="p3">
  <h3>Todo List</h3>
  <p class="proyectos-p">
    Gestiona tus tiempos con esta aplicación. Registra tus actividades pendientes y observa tu progreso diario.</p>
    <div class="project-buttons">

  <div class=" d-flex align-items-center justify-content-center link-body-emphasis text-decoration-none m-4">
    <div class="col-md-3"> <a href="https://pinkytodolist-0rnn.onrender.com/"><img class="icono"
          src="./src/img/web.png" alt="web site"></a></div>
    <div> <a href="https://github.com/AdonisB1219/to-do-list"><img class="icono"
          src="./src/img/github.png" alt="github"></a>
    </div>
  </div>
  <button class="tech-stack"><i class="fa-solid fa-code tech-icon"></i>EJS templates</button>
  <button class="tech-stack"><i class="fa-brands fa-node tech-icon"></i>ExpressJS</button>
  <button class="tech-stack"><i class="fa-brands fa-js tech-icon"></i>Javscript</button>
  </div>
</div>

<div class="div-proy" id="div-img3">
  <a href="https://pinkytodolist-0rnn.onrender.com/"><img class="img-proyectos derecha"
      src="./src/img/projects/todo-list.PNG" alt="Todo list" id="img3"></a>
</div>

<div class="div-proy" id="div-img4">
  <a href="https://adonisb1219.github.io/CCSF/"><img class="img-proyectos izquierda" src="./src/img/projects/CCSF.jpg"
      alt="Centro comunitario santa fe" id="img4"></a>
</div>

<div class="div-proy" id="p4">
  <h3>Centro comunitario</h3>

  <p class="proyectos-p">
    Centro Comunitario Santa Fe. Aquí creamos un espacio en línea donde la comunidad se conecta con programas,
    eventos y oportunidades. Es un proyecto de FrontEnd
    hecho con CSS y HTML.</p>
  <div class=" d-flex align-items-center justify-content-center link-body-emphasis text-decoration-none m-4">
    <div class="col-md-3"> <a href="https://adonisb1219.github.io/CCSF/"><img class="icono"
          src="./src/img/web.png" alt="linkedin"></a></div>
    <div> <a href="https://github.com/AdonisB1219/CCSF"><img class="icono" src="./src/img/github.png"
          alt="github"></a>
    </div>
  </div>
  <button class="tech-stack"><i class="fa-brands fa-html5 tech-icon"></i>HTML</button>
  <button class="tech-stack"><i class="fa-brands fa-css3-alt tech-icon"></i>CSS</button>



</div>`);
btnProyectos.classList.add('hidden');
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
observador.observe(img3);
observador.observe(img4);
});


//DARK THEME


