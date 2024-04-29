var listaProyectos = [];

var clickSI = [];

const agregarProyecto = (nombreProyecto, descripcion) => {
    if(validarNombreProyecto(nombreProyecto)){
        listaProyectos.push({
            nombreProyecto,
            descripcion,
            listaTareas: []
        });
        clickSI.push(false);
        mostrarProyecto(listaProyectos[listaProyectos.length-1]);
    }
}

const validarNombreProyecto = (nombre) => {
    var i = 0;
    if(nombre == ''){
        return false;
    }
    else{
        while(i < listaProyectos.length && nombre != listaProyectos[i].nombreProyecto){
            i++;
        }
        if(i < listaProyectos.length){
            return false;
        }
        else{
            return true;
        }
    }
    
}

const mostrarProyecto = (proyecto) => {
    const listaProyectosContenedor = document.getElementById("listaProyectos");
    var contenedorProyecto = document.createElement("article"); //creacion article --> clase contenedorProyecto
    contenedorProyecto.setAttribute("id", proyecto.nombreProyecto);//le pongo id solo al contenedor Total Del Proyecto
    contenedorProyecto.setAttribute("class", "contenedorProyecto");
    var contenedorTituloDescripcion = document.createElement("div");
    var title = document.createElement("h3");
    title.textContent = proyecto.nombreProyecto;
    var descripcion = document.createElement("p");
    if(proyecto.descripcion.length > 0){
        descripcion.textContent = "(" + proyecto.descripcion + ")";
    }
    else{
        descripcion.style.display = "none";
    }
    contenedorTituloDescripcion.appendChild(title);
    contenedorTituloDescripcion.appendChild(descripcion);
    contenedorTituloDescripcion.setAttribute("class", "contenedorTituloDescripcion");
    var contenedorTareas = document.createElement("div");
    contenedorTareas.setAttribute("id", `tareas.${proyecto.nombreProyecto}`);
    var inputTarea = document.createElement("input");//creacion input tarea
    inputTarea.setAttribute("type", "text");
    inputTarea.setAttribute("name", "toDo");
    inputTarea.textContent= "tarea";
    var inputDescripcion = document.createElement("input"); //creacion input descripcion de la tarea
    inputDescripcion.setAttribute("type", "text");
    inputDescripcion.setAttribute("name", "tareaDescripcion");
    inputDescripcion.textContent="descripcion";
    var inputFechaVencimiento = document.createElement("input");//creacion input fechaVencimiento
    inputFechaVencimiento.setAttribute("type", "date");
    var button = document.createElement("button");//BOTON AGREGAR TAREA
    button.textContent = "➕";
    button.className="emoji-button";
    button.addEventListener("click", () => {
        agregarTarea(proyecto.nombreProyecto, inputTarea.value, inputDescripcion.value, inputFechaVencimiento.value, contenedorTareas);
      });      
    contenedorTareas.appendChild(inputTarea);
    contenedorTareas.appendChild(inputDescripcion);
    contenedorTareas.appendChild(inputFechaVencimiento);
    contenedorTareas.appendChild(button);
    contenedorTareas.style.display = "none";    
    contenedorProyecto.appendChild(contenedorTituloDescripcion);
    contenedorProyecto.appendChild(contenedorTareas);
    contenedorTituloDescripcion.addEventListener("click", () => {
        const contenedorTareas = document.getElementById(`tareas.${proyecto.nombreProyecto}`);
        const indice = listaProyectos.findIndex(proyecto => proyecto.nombreProyecto === nombreProyecto);
        if (contenedorTareas) {
            if (!clickSI[indice]) {
                contenedorTareas.style.display = "block";
                contenedorProyecto.classList.add("expandido");
                clickSI[indice] = true;
            } else {
                contenedorTareas.style.display = "none";
                contenedorProyecto.classList.remove("expandido");
                clickSI[indice] = false;
            }
        }
    });
    //var inputFechaVencimiento
        listaProyectosContenedor.appendChild(contenedorProyecto);

}

const agregarTarea = (nombreProyecto, toDo, descripcion, fechaVencimiento, contenedorTareas) => {
    const indice = listaProyectos.findIndex(proyecto => proyecto.nombreProyecto === nombreProyecto);
    console.log(toDo);
    console.log(listaProyectos[indice]);
    if(validarNombreTarea(toDo, listaProyectos[indice].listaTareas)){
        console.log(toDo);
        listaProyectos[indice].listaTareas.push({
            todo: toDo,
            descripcion: descripcion,
            check: false,
            horaCreacion: new Date(),
            fechaVencimiento: fechaVencimiento??null
        });
        mostrarTareas(listaProyectos[indice], contenedorTareas);
    }
    console.log(listaProyectos[indice].listaTareas[0]);
}

const validarNombreTarea = (nombre, lista) => {
    var i = 0;
        if(nombre == ''){
            return false;
        }
        else{
            while(i < lista.length && nombre != lista[i].todo){
                i++;
            }
            if(i < lista.length){
                return false;
            }
            else{
                return true;
            }
        }
}

const mostrarTareas = (proyecto, contenedorTareas) => {
    var contenedorListaTareas = document.getElementById(`listaTareas.${proyecto.nombreProyecto}`);
    if (contenedorListaTareas == null) {
        contenedorListaTareas = document.createElement("ul");
        contenedorListaTareas.setAttribute("id", `listaTareas.${proyecto.nombreProyecto}`);
        contenedorListaTareas.setAttribute("class", '.contenedorListaTareas');
    } else {
        while (contenedorListaTareas.hasChildNodes()) {
            contenedorListaTareas.removeChild(contenedorListaTareas.firstChild);
        }
    }
    for (var i = 0; i < proyecto.listaTareas.length; i++) {
        const contenedorToDo = document.createElement("div");
        contenedorToDo.setAttribute("class", "contenedorTarea");
        contenedorToDo.setAttribute("id", `${proyecto.listaTareas[i].todo}.${proyecto.nombreProyecto}`); //le pongo id al contenedor de la tarea
        var checkButton = document.createElement("input");
        var nombreTarea = document.createElement("h4");
        nombreTarea.textContent = proyecto.listaTareas[i].todo;
        nombreTarea.setAttribute("id", `nombreTarea.${proyecto.listaTareas[i].todo}.${proyecto.nombreProyecto}`)
        checkButton.setAttribute("type", "checkbox");
        checkButton.addEventListener('change', function () {
            // Verificar si el checkbox está marcado o no
            var index = Array.from(contenedorListaTareas.children).indexOf(this.parentElement);
            const nombreTareaCheckeada = document.getElementById(`nombreTarea.${proyecto.listaTareas[index].todo}.${proyecto.nombreProyecto}`);
            const indiceProyecto = listaProyectos.findIndex(proyecto => proyecto.nombreProyecto === proyecto.nombreProyecto);
            if (this.checked) {
                nombreTareaCheckeada.style.textDecoration = "line-through";
                listaProyectos[indiceProyecto].listaTareas[index].check = true;
            } else {
                nombreTareaCheckeada.style.textDecoration = "none";
                listaProyectos[indiceProyecto].listaTareas[index].check = false;
                
            }
        });
        var descripcionTarea = document.createElement("span");
        if(proyecto.listaTareas[i].descripcion.length > 0){
            descripcionTarea.textContent = "(" + proyecto.listaTareas[i].descripcion + ")";
        }
        else{
            descripcionTarea.style.display = "none";
        }
        var borrarButton = document.createElement("button");
        borrarButton.textContent = "🗑️";
        borrarButton.className="emoji-button"
        borrarButton.addEventListener("click", function () {
            var index = Array.from(contenedorListaTareas.children).indexOf(this.parentElement);
            borrarToDo(proyecto, contenedorTareas, index);
        });
        contenedorToDo.appendChild(checkButton);
        contenedorToDo.appendChild(nombreTarea);
        contenedorToDo.appendChild(descripcionTarea);
        contenedorToDo.appendChild(borrarButton);
        contenedorListaTareas.appendChild(contenedorToDo);
    }
    if(proyecto.listaTareas.length > 0){
        const contenedorBuscar = document.createElement("div");
        const contenedorInputButton = document.createElement("div");
        const textoBuscar = document.createElement("p");
        textoBuscar.textContent = "Busca la tarea por fecha:";
        const inputBuscar = document.createElement("input");
        inputBuscar.setAttribute("type", "date");
        const buttonBuscar = document.createElement("button");
        buttonBuscar.textContent = "🔍";
        buttonBuscar.className= "emoji-button";
        const resultado = document.createElement("div");
        resultado.style.display = "none";
        buttonBuscar.addEventListener("click", () => {
            buscarTareasProyectoFechaVencimiento(proyecto.listaTareas, inputBuscar.value, resultado);
        });
        contenedorBuscar.appendChild(contenedorInputButton);
        contenedorBuscar.appendChild(resultado)
        contenedorInputButton.appendChild(textoBuscar);
        contenedorInputButton.appendChild(inputBuscar);
        contenedorInputButton.appendChild(buttonBuscar);
        contenedorBuscar.setAttribute("class", "contenedorBuscar");
        contenedorInputButton.setAttribute("class", "contenedorInBuscar");
        contenedorListaTareas.appendChild(contenedorBuscar);
    }
    contenedorTareas.appendChild(contenedorListaTareas);
}



const borrarToDo = (proyecto, contenedorTareas, indiceTarea) => {
    const indiceProyecto = listaProyectos.findIndex(p => p.nombreProyecto === proyecto.nombreProyecto);
    if (indiceProyecto !== -1) {
        listaProyectos[indiceProyecto].listaTareas.splice(indiceTarea, 1);
        console.log(listaProyectos[indiceProyecto].listaTareas);
        mostrarTareas(proyecto, contenedorTareas);
    }
}

const buscarTareasProyectoFechaVencimiento = (listaTareas, fechaVencimiento, resultado) => {
    const listaTareasFechaVencimiento = listaTareas.filter(tarea => tarea.fechaVencimiento === fechaVencimiento);
    resultado.textContent = "";
    for(var i = 0; i<listaTareasFechaVencimiento.length; i++){
        var tareaText = document.createTextNode(listaTareasFechaVencimiento[i].todo);
        resultado.appendChild(tareaText);
        resultado.appendChild(document.createElement("br"));
    }
    resultado.style.display = "block";
}