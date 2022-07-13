
    let baseUrl = "https://api.github.com/users"

    //Función async request
    const request = async (url) => {
        const data = await fetch(url)
        const response = await data.json()
        //Búsqueda con respuesta negativa
        if (response.message == 'Not Found') {
            alert(`Usuario(a) no encontrado(a).\nIntente con un(a) nuev(a) usuario(a).`)
        } else {
            return response
        }
    }

    //Obtiene url
    const getUser = async (id) => {
        const url = `${baseUrl}/${id}`;
        return request(url);
    }

    //Obtiene páginas y repositorios
    const getRepository = async (id, page, ppage) => {
        const url = `${baseUrl}/${id}/repos?page=${page}&per_page=${ppage}`;
        return request(url);
    }

    let form = document.querySelector('form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        //Define y utiliza variables con datos de usuario(a)s
        const name = document.getElementById('nombre').value
        const page = document.getElementById('pagina').value
        const repQtty = document.getElementById('repoPagina').value

        Promise.all([getUser(name), getRepository(name, page, repQtty)])
            .then(resp => {
                if (resp[0].message) {
                    alert(`Usuario(a) no encontrado(a).\nIntente con un(a) nuev(a) usuario(a).`)
                    document.getElementById('nombre').focus()
                }
                else {
                    let html = `<div class="row">
                                <div class="col-sm-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <h2 class="card-title">Datos de Usuario</h2>
                                        </div>
                                        <img src="${resp[0].avatar_url}" class="card-img-top w-75" alt="${resp[0].name}">
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item"><b>Nombre de usuario:</b> ${resp[0].name}</li>
                                            <li class="list-group-item"><b>Nombre de login:</b> ${resp[0].login}</li>
                                            <li class="list-group-item"><b>Cantidad de repositorios:</b> ${resp[0].public_repos}</li>
                                            <li class="list-group-item"><b>Localidad:</b> ${resp[0].location}</li>
                                            <li class="list-group-item"><b>Tipo de usuario:</b> ${resp[0].type}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <h2 class="card-title">Nombre de repositorios</h2>
                                        </div>
                                        <ul class="list-group list-group-flush"`

                    resp[1].forEach(element => {
                        html += `<li class="list-group-item"><a href="${element.html_url}">${element.name}</a></li>`;
                    })

                    html += `</ul>
                                    </div>
                                </div>
                        </div>`
                    document.getElementById("resultados").innerHTML = html
                    window.scrollTo(0, 600)
                }
            })
            .catch(err => console.log('Error:', err))
    })
