:root{
  --pink-1: #ffd9e6;
  --pink-2: #ffb3cf;
  --book-pink: #ff93b6;
  --shadow: rgba(0,0,0,0.18);
  --text: #2b1b1e;
  --radius: 16px;
  --page-width: 330px;
  --page-height: 520px;
  --gap: 18px;
}

*{box-sizing:border-box}
html,body,#app{height:100%}
body{
  margin:0;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  background: linear-gradient(180deg,#ffeef6 0%, #fff 60%);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px;
}

/* Fondo "golosinas calle" (opcional). Añade assets/images/golosinas-calle.jpg para efecto completo */
.stage{
  width:100%;
  max-width:900px;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:18px;
  background-image: url('assets/images/golosinas-calle.jpg');
  background-size: cover;
  background-position: center;
  border-radius:20px;
  box-shadow: 0 8px 24px var(--shadow);
  position:relative;
  overflow:hidden;
}

/* ligera superposición rosada para el efecto "medio rosadito" */
.stage::after{
  content:"";
  position:absolute;
  inset:0;
  background: linear-gradient(180deg, rgba(255,192,215,0.18), rgba(255,240,250,0.6));
  pointer-events:none;
}

/* El libro */
.book{
  width: calc(var(--page-width) * 2 + var(--gap));
  height: var(--page-height);
  perspective: 1400px;
  position:relative;
}

/* Portada estilo carta rosada */
.cover{
  width:100%;
  height:100%;
  position:absolute;
  left:0;
  top:0;
  transform-origin: left center;
  transform-style: preserve-3d;
  transition: transform 1200ms cubic-bezier(.2,.9,.3,1);
  z-index:40;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor: pointer;
}
.cover-front{
  width: calc(var(--page-width) * 2 + var(--gap));
  height:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  border-radius:var(--radius);
  background: linear-gradient(145deg,var(--book-pink), #ff7fb3);
  color: white;
  box-shadow: 0 12px 30px rgba(0,0,0,0.28);
  transform: translateZ(30px);
  backface-visibility: hidden;
  padding: 26px;
  text-align:center;
}

.cover .title{
  margin:0;
  font-family: 'Dancing Script', cursive;
  font-size: 36px;
  letter-spacing: .6px;
  font-weight:700;
}
.cover .subtitle{
  margin-top:10px;
  font-size:16px;
  opacity:0.95;
}

/* estado abierto */
.book.open .cover{
  transform: rotateY(-160deg) translateX(-18px);
  transition-duration:1000ms;
}

/* Contenedor de páginas internas */
.pages{
  position:absolute;
  left:0;
  top:0;
  width:100%;
  height:100%;
  display:flex;
  gap:var(--gap);
  align-items:center;
  justify-content:center;
  transform-style:preserve-3d;
  z-index:10;
  pointer-events:none; /* desactivado hasta que se abre */
}
.book.open .pages{ pointer-events:auto; }

/* Página individual (mostrada como par doble: izquierda y derecha) */
.page{
  width: var(--page-width);
  height: var(--page-height);
  background: linear-gradient(180deg,#fff,#fffaf3);
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  display:grid;
  grid-template-columns: 1fr 1fr;
  overflow:hidden;
  transform-origin: left center;
  transition: transform 700ms cubic-bezier(.2,.9,.3,1), box-shadow 200ms;
  backface-visibility:hidden;
  position:relative;
}

/* Cuando una página da vuelta se aplica la clase .flipped */
.page.flipped{
  transform: rotateY(-180deg);
  z-index:50;
}

/* Imagen a la izquierda */
.page .photo{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
}

/* Texto en la derecha */
.page .textwrap{
  padding:20px;
  display:flex;
  align-items:center;
  justify-content:center;
}
.page .text{
  font-family: 'Dancing Script', cursive;
  color: var(--text);
  font-size: 20px;
  line-height:1.35;
  text-align:left;
}

/* Controles */
.controls{
  position:absolute;
  bottom:-56px;
  left:50%;
  transform:translateX(-50%);
  display:flex;
  gap:12px;
}
.btn{
  background: white;
  border: none;
  padding:10px 14px;
  border-radius: 10px;
  box-shadow: 0 6px 14px rgba(0,0,0,0.12);
  font-weight:600;
  cursor:pointer;
}
.btn:active{ transform: translateY(1px); }
.btn[disabled]{ opacity:0.5; cursor:default; }

/* Responsive: pantallas pequeñas adaptan el tamaño */
@media (max-width:420px){
  :root{
    --page-width: 150px;
    --page-height: 260px;
    --gap:10px;
  }
  .cover .title{ font-size:22px }
  .cover .subtitle{ font-size:13px }
  .page .text{ font-size:16px }
  .controls{ bottom:-48px; }
    }
