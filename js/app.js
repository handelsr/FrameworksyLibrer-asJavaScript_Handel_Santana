var juegoActivo = 0
    movimientos = 1
    puntuacion = 0
    totalImagenes = 35
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
}