import http from 'http';

function getQueryParams(url) {
    const queryParamsData = url.split('?')[1]
    if (queryParamsData) {
        const queryParams = queryParamsData.split('&').map(par => par.split('='))
        return Object.fromEntries(queryParams);
    } else {
        return {};
    }
}

function getUrlParams(url, nombrePosicionesParametros) {
    const urlParamsData = url.split('?')[0]
    const urlParams = urlParamsData.split('/')
    const result = {};
    for (const nombre in nombrePosicionesParametros) {
        result[nombre] = urlParams[nombrePosicionesParametros[nombre]]
    }
    return result;
}

const server = http.createServer((peticion, respuesta) => {
    console.log(peticion.method)
    console.log(peticion.url)

    const queryParams = getQueryParams(peticion.url)
    console.log(queryParams);

    const urlParams = getUrlParams(peticion.url, { nroUsuario: 2 })
    console.log(urlParams);

    respuesta.end()
})

server.listen(8080)