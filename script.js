$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

var app = new Vue({
  el: '#app',
  data: {
    message: '',
    listaTrabajos: [],
    listaEstudios: [],
    listaDestrezas: [],
    listaIdiomas: [],
    listaProyectos: [],
    listaReferencias: [],
    ingles: false,
    preload: true
  },
  mounted() {
    let url = "./Json/mijson.json";
    axios.get(url)
      .then((response) => {
        this.message = response.data;
        this.preload = false;
      })
      .catch((error) => {
        console.log("Error");
      })
  },

  methods: {
    keysReturn: function(Obj) {
      var keys = Object.keys(Obj);
      console.log(keys);
      return keys[0];
    },
    iniciarArrays: function() {
      this.listaTrabajos = this.message.Curriculum.Experienciaprofesional;
      this.listaEstudios = this.message.Curriculum.Estudios;
      this.listaDestrezas = this.message.Curriculum.Destrezas;
      this.listaIdiomas = this.message.Curriculum.Idiomas;
      this.listaProyectos = this.message.Curriculum.Proyectos;
      this.listaReferencias = this.message.Curriculum.Referencias;
    },
    cambiarEspanol: function() {
      this.ingles = false;
    },
    cambiarIngles: function() {
      this.ingles = true;
    },
    showModal: function() {
      this.ingles = true;
    },
    openModal: function(index) {
      $("#modal").modal("show");
      $("#modalTitle").text(this.listaProyectos[index].proyecto);
      $('.tecnologiasEmpleadas').empty();
      for (let i = 0; i < this.listaProyectos[index].tecnologias.length; i++) {
        console.log(this.listaProyectos[index].tecnologias[i].tecnologia);
        $('<li>', {
          'text': this.listaProyectos[index].tecnologias[i].tecnologia
        }).appendTo('.tecnologiasEmpleadas');
      }
      $("#imgProyectoModal").attr("src", "" + this.listaProyectos[index].img + "");
      $("#linkProdu").attr("href", "" + this.listaProyectos[index].produccion + "");
      $("#linkRepo").attr("href", "" + this.listaProyectos[index].repo + "");
      $("#descriptionParrafo").text(this.listaProyectos[index].description);
      $("#descripcionParrafo").text(this.listaProyectos[index].descripcion);


    }
  },
  computed: {

  }
});
