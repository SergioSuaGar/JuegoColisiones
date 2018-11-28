/* Tendremos principalmente una clase juego, en la cual crearemos el svg, el jugador, la IA.
* Tambien habra un evento movimientoContinuo, el cual mueve continuamente la IA. Y el evento restar vida para restar 1
* al contador de vidas cada vez que el jugador choque con la IA*/

class Juego {
    constructor() {
        var svg = document.getElementById("svg");
        this.jugador = new Jugador("jugador");
        this.IA1 = new IA("IA1");
        this.IA2 = new IA("IA2");
        this.IA3 = new IA("IA3");
        this.IA4 = new IA("IA4");
        this.IA5 = new IA("IA5");
        this.EquipoIA = new EquipoIA();
        this.EquipoIA.añadirIA(this.IA1);
        this.EquipoIA.añadirIA(this.IA2);
        this.EquipoIA.añadirIA(this.IA3);
        this.EquipoIA.añadirIA(this.IA4);
        this.EquipoIA.añadirIA(this.IA5);
        this.vidas = 5;
        this.tiempo=20;
        window.addEventListener("keypress", (tecla) => {
            this.jugador.mover(tecla)
        });
    }
    movimientoContinuo() {
        setInterval(() => {
            this.IA1.mover();
            this.IA1.detectar();
            this.IA2.mover();
            this.IA2.detectar();
            this.IA3.mover();
            this.IA3.detectar();
            this.IA4.mover();
            this.IA4.detectar();
            this.IA5.mover();
            this.IA5.detectar();
            this.jugador.comprobarGolpe();
        }, 1000 / 60);
    }
    restarVida(){
        this.vidas--;
        document.getElementById("contVida").innerHTML = this.vidas;
        if (this.vidas === 0){
            document.getElementById("perdido").style.fill = "rgba(0, 0, 0, 1)";
            setTimeout(function(){ location.reload(); }, 5000);
        }
    }
    tiempoRestante(){
        setInterval(() =>{
            this.tiempo--;
            document.getElementById("contTiempo").innerHTML = this.tiempo;
            if (this.tiempo === 0){
                document.getElementById("ganado").style.fill = "rgba(0, 0, 0, 1)";
                setTimeout(function(){ location.reload(); }, 5000);
            }
        },1000);
    }
}
// Esta clase servira para guardar toda nuestra IA en un array
class EquipoIA {
    constructor() {
        this.circulos = []
    }

    añadirIA(IA) {
        this.circulos.push(IA);
    }
}

/* La clase IA seran nuestro circulos en constante movimiento. Tendran un metodo mover, el cual se moveran de 4 en 4 y
* comprobara si existe un choque con otro circulo. Tambien esta el metodo detectar, para mantener los circulos dentro del svg.*/
class IA {
    constructor(id) {
        this.objeto = document.getElementById(id);
        this.cx = parseInt(this.objeto.getAttribute("cx"));
        this.cy = parseInt(this.objeto.getAttribute("cy"));
        this.r = parseInt(this.objeto.getAttribute("r"));
        this.moverX = 4;
        this.moverY = 4;
    }
    mover() {
        this.comprobarChoque();
        this.cx = this.cx + this.moverX;
        this.objeto.setAttribute("cx", this.cx);
        this.cy = this.cy + this.moverY;
        this.objeto.setAttribute("cy", this.cy);
    }
    detectar() {
        if (this.cx <= 0 + this.r || this.cx >= svg.width.baseVal.value - this.r) {
            this.moverX = this.moverX * (-1);
        }
        if (this.cy <= 0 + this.r || this.cy >= svg.height.baseVal.value - this.r) {
            this.moverY = this.moverY * (-1);
        }
    }
    comprobarChoque() {
        let cambiox = 0;
        let cambioy = 0;
        for (let i = 0; i < juego.EquipoIA.circulos.length; i++) {
            if (this !== juego.EquipoIA.circulos[i]) {
                if (Math.sqrt(((juego.EquipoIA.circulos[i].cx - this.cx) ** 2) + ((juego.EquipoIA.circulos[i].cy - this.cy) ** 2)) <= this.r + juego.EquipoIA.circulos[i].r) {
                    cambiox = juego.EquipoIA.circulos[i].moverX;
                    juego.EquipoIA.circulos[i].moverX = this.moverX;
                    this.moverX = cambiox;
                    cambioy = juego.EquipoIA.circulos[i].moverY;
                    juego.EquipoIA.circulos[i].moverY = this.moverY;
                    this.moverY = cambioy;
                }
            }
        }
    }
}
/* Existira un objeto de la clase Jugador, existe un metodo mover, que detecta las teclas AWSD y se movera de 10 en 10.*/
class Jugador {
    constructor(id) {
        this.objeto = document.getElementById(id);
        this.cx = parseInt(this.objeto.getAttribute("cx"));
        this.cy = parseInt(this.objeto.getAttribute("cy"));
        this.r = parseInt(this.objeto.getAttribute("r"));
        this.moverX = 10;
        this.moverY = 10;
    }
    mover(tecla) {
        if (tecla.keyCode === 97 && this.cx - this.moverX >= 0 + this.r) {
            this.cx = this.cx - this.moverX;
            this.objeto.setAttribute("cx", this.cx);
        }
        if (tecla.keyCode === 100 && this.cx + this.moverX <= svg.width.baseVal.value - this.r) {
            this.cx = this.cx + this.moverX;
            this.objeto.setAttribute("cx", this.cx);
        }
        if (tecla.keyCode === 119 && this.cy - this.moverY >= 0 + this.r) {
            this.cy = this.cy - this.moverY;
            this.objeto.setAttribute("cy", this.cy);
        }
        if (tecla.keyCode === 115 && this.cy  + this.moverY <= svg.height.baseVal.value - this.r) {
            this.cy = this.cy + this.moverY;
            this.objeto.setAttribute("cy", this.cy);
        }
    }
    comprobarGolpe(){
        for (let i = 0; i < juego.EquipoIA.circulos.length; i++) {
            if (Math.sqrt(((juego.EquipoIA.circulos[i].cx - this.cx) ** 2) + ((juego.EquipoIA.circulos[i].cy - this.cy) ** 2)) <= this.r + juego.EquipoIA.circulos[i].r) {
                juego.EquipoIA.circulos[i].moverX = juego.EquipoIA.circulos[i].moverX * (-1);
                juego.EquipoIA.circulos[i].moverY = juego.EquipoIA.circulos[i].moverY * (-1);
                juego.restarVida();
            }
        }
    }
}

var juego = new Juego();
juego.movimientoContinuo();
juego.tiempoRestante();