var lst_estadoscovid = [];
var cidadeselecionada = [];

async function buscardadoscovid() {
    return new Promise((resolve, reject) => {

        if(lst_estadoscovid.length === 0) {
            loading('Aguarde...')

            var url = "https://api.brasil.io/v1/dataset/covid19/caso/data?is_last=True&state=ES"

            try {
                MobileUI.ajax.get(url)
                    .set({ 'Authorization': 'Token ' + '0af82b6c64f1cfb9279b3ad9d03c814a5e1b17db' })
                    .end(function (error, res) {
                        if (res !== undefined) {
                            if (res.ok) {

                                for (var i = 1; i < res.body.results.length; i++) {

                                    if (res.body.results[i].city !== "Importados/Indefinidos") {
                                        lst_estadoscovid.push(res.body.results[i])
                                    }

                                    // more statements
                                }


                                closeLoading('');
                                openPage('painelcovid');

                            }

                        }

                        else {
                            closeLoading('');
                            //AlertaErro('Não foi possível efetuar conexão com seu servidor');

                            callbacklogar(false)
                        }

                    });
            } catch (e) {
                var teste = e
            }

        }

        else{
            openPage('painelcovid');
        }

     
    })



}

function acessarcidade(cidade) {

    cidadeselecionada = lst_estadoscovid.find(element => element.city === cidade);

    openPage('cidadeselecionada')


}

