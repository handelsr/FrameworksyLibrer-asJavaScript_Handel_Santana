var juegoActivo = 0
    movimientos = 1
    puntuacion = 0
totalImagenes = 35
totalFilas = 5
totalColumnas = 7
bloqueo = 0
var data = [];

var juegoDulces = {
    init: function () {
        $(".btn-reinicio").on("click", function () {
            switch (juegoActivo) {
                case 0:
                    juegoDulces.iniciarJuego();
                    break;
                case 1:
                    juegoActivo = 2;
                    $('#timer').timer('remove');
                    juegoDulces.terminarJuego();
                    break;
                case 2:
                    juegoDulces.reiniciarJuego();
                    break;
                default:
                    console.log('Error en el estado juegoActivo');
            }
        });
        this.animacionTitulo();
        this.cargarImagenes();
    },
    iniciarJuego: function () {
        $(".btn-reinicio").html('Reiniciar');
        juegoActivo = 1;
        this.inicioTiempo();
        this.scanRepetidosCol();
        this.scanRepetidosFil();
        if (data.length != 0) {
            setTimeout(function () {
                juegoDulces.animacionAcertar();
            }, 800);
        }
    },
    terminarJuego: function () {
        $(".panel-tablero").hide("slide", { direction: "left" }, "slow", function () {
            $(".time").hide("slide", { direction: "left" }, "slow");
            $(".panel-score").animate({ width: "390%" }, 1000);
            if (juegoActivo != 1) {
                $(".panel-score").prepend('<h1 class="main-titulo-2">Juego Terminado</h1>');
            }
        });
    },
    reiniciarJuego: function () {
        var col = $("div[class^='col']");
        for (var i = 0; i < col.length; i++) {
            $(col[i]).html('');
        }
        $('#timer').timer('remove');
        $(".btn-reinicio").html('Iniciar');
        $("#timer").html('02:00');
        $("#movimientos-text").html('0');
        $("#score-text").html('0');
        puntuacion = 0;
        movimientos = 1;
        this.cargarImagenes();
        $(".main-titulo-2").remove();
        $(".panel-score").animate({ width: "25%" }, 1000, function () {
            $(".panel-tablero").show("slide", { direction: "left" }, "slow");
            $(".time").show("slide", { direction: "left" }, "slow");
        });
        juegoActivo = 0;
    },
    inicioTiempo: function () {
        $('#timer').timer({
            //http://jquerytimer.com/
            duration: '2m',
            format: '%M:%S',
            callback: function () {
                juegoActivo = 2;
                juegoDulces.terminarJuego();
            }
        });
    },
    animacionTitulo: function () {
        setInterval(function () {
            $(".main-titulo").switchClass("main-titulo", "main-titulo-efecto", 200),
                $(".main-titulo").switchClass("main-titulo-efecto", "main-titulo", 200)
        }, 1000);
    },
    imagenes: function () {
        var i = 0;
        this[i++] = "image/1.png";
        this[i++] = "image/2.png";
        this[i++] = "image/3.png";
        this[i++] = "image/4.png";
        this.total = i;
    },
    obtenerColumnas: function () {
        var i = 0;
        this[i++] = $(".col-1").find("div");
        this[i++] = $(".col-2").find("div");
        this[i++] = $(".col-3").find("div");
        this[i++] = $(".col-4").find("div");
        this[i++] = $(".col-5").find("div");
        this[i++] = $(".col-6").find("div");
        this[i++] = $(".col-7").find("div");
        this.total = i;
    },
    obtenerFilas: function () {
        var i = 0;
        this[i++] = $("[id*=img-1]");
        this[i++] = $("[id*=img-2]");
        this[i++] = $("[id*=img-3]");
        this[i++] = $("[id*=img-4]");
        this[i++] = $("[id*=img-5]");
        this.total = i;
    },
    cargarImagenes: function () {
        var num = 1;
        var numImg = 1;
        for (var i = 1; i <= totalColumnas; i++) {
            for (var ii = 1; ii <= totalFilas; ii++) {
                var imagen = new this.imagenes;
                var src = imagen[Math.floor(Math.random() * imagen.total)];
                $(".col-" + num).append("<div id='item-" + numImg + " img-" + ii + "'>" +
                    "<img src=" + src + " class='imagen-" + numImg + "'>" +
                    "</div>");
                $(".imagen-" + numImg).draggable({
                    revert: true,
                    containment: ".panel-tablero",
                    start: function () {
                        if (juegoActivo == 1) {
                            $("#movimientos-text").html(movimientos++);
                        }
                    },
                    stop: function () {
                        if (juegoActivo == 1) {
                            if (bloqueo == 0) {
                                juegoDulces.scanRepetidosCol();
                                juegoDulces.scanRepetidosFil();
                                juegoDulces.animacionAcertar();
                            }
                        }
                    },
                    drag: function (event, ui) { }
                });
                $("[id='item-" + numImg + " img-" + ii + "'").droppable({
                    drop: function (event, ui) {
                        if (juegoActivo == 1) {
                            if (bloqueo == 0) {
                                imagenUno = event.target.lastChild;
                                imagenDos = ui.draggable[0];
                                imgUno = $(imagenUno).attr("src");
                                imgDos = $(imagenDos).attr("src");
                                $(imagenUno).attr("src", imgDos);
                                $(imagenDos).attr("src", imgUno);
                            }
                        }
                    }
                });
                numImg++;
            }
            num++;
        }
    },
}