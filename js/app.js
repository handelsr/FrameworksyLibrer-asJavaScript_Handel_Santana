var juegoActivo = 0
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
}