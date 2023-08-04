const btn = document.getElementById('button');
const nombre = document.getElementById('name');
const correo = document.getElementById('email');
const mensaje = document.getElementById('message');
const inputs = [nombre, correo, mensaje];

const regexNombre = /^[a-zA-Z\s+]{5,}$/;
const regexCorreo = /^[^@\t\n\r]{5,}@[^@\t\n\r]{3,}.[^@\t\n\r]{2,}/;
const regexMensaje = /^[\w\s]{10,}$/;



//Enviar datos de contacto
document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();
   nombre.value = nombre.value.trim();
   correo.value = correo.value.trim();
   mensaje.value = mensaje.value.trim();

   if(validarDatos()){
    btn.value = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_9wk63eg';
 
    emailjs.sendForm(serviceID, templateID, this)
     .then(() => {
       btn.value = 'Send Email';
       alert('Sent!');
     }, (err) => {
       btn.value = 'Send Email';
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

  if (!regexMensaje.test(mensaje.value)){
    valido = false;
    mensaje.style.border = "solid thin red";
    mensaje.insertAdjacentHTML("afterend", `<p class="wrong-text">Mensaje inválido</p>`);
  }

  return valido;

}

//Carrusel
let items = document.querySelectorAll('.carousel .carousel-item')

		items.forEach((el) => {
			const minPerSlide = 3
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
      document.querySelector("a.active").classList.remove("active");
      menulink.classList.add("active");
    }
  });
}, {rootMargin: "-50% 0px -50% 0px"});

menuLinks.forEach(menuLink => {
  const hash = menuLink.getAttribute("href");
  const target = document.querySelector(hash);
  if(target){
    observer.observe(target);
  }
})