window.onload = function () {

   document.querySelectorAll(".btn-group button").forEach(btn =>
        btn.addEventListener("click", function(){
            for (let i = 0; i < btn.parentNode.children.length; i++) {
                btn.parentNode.children[i].classList.remove("selected");
                btn.parentNode.children[i].classList.add("no-selected");
            } 
            btn.classList.add("selected");
        })    
   );

    let modal = document.getElementById("modalResultados");

    document.getElementById("enviarResultados").addEventListener("click", function() {
        
        modal.style.display = "block";

        let contestadas = document.querySelectorAll(".btn-group button.selected");

        if(contestadas.length < 7) {
            document.querySelector("#modalResultados .modal-header h2").textContent = 
            "¡Oops!";
            document.querySelector("#modalResultados .modal-body").innerHTML = 
            `<p>Te faltan ${7 - contestadas.length} preguntas por contestar.</p>`;

        } else {
            var suma = 0;
            contestadas.forEach(respuesta => suma += parseInt(respuesta.dataset.val));
            document.querySelector("#modalResultados .modal-header h2").textContent = 
            "Tus resultados";

            let text = `<p>Tu puntaje es ${suma}.</p>`;
            if (suma <= 14) {
                text += `<p><strong>Nada o muy leve.</strong> En este momento no sufres de 
                s&iacute;ndrome de impostora.</p>`;
            } else if (suma <= 21) {
                text += `<p><strong>Moderado.</strong> En algunas situaciones presentas 
                s&iacute;ndrome de impostora.</p>`;
            } else if (suma <= 28) {
                text += `<p><strong>Significativo.</strong> El s&iacute;ndrome de impostora
                es frecuente en tus situaciones de vida.</p>`;
            } else if (suma <= 35) {
                text += `<p><strong>Alto.</strong> Tiendes a experienciar s&iacute;ndrome de 
                impostora de forma com&uacute;n en tu vida.</p>`;
            }

            document.querySelector("#modalResultados .modal-body").innerHTML = text;
        }
    });

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};
