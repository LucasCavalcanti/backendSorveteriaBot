
import Sorvete from "../Modelo/sorvete.js"

export function criarMsgCard(){
    return {
        type:"info",
        title:"",
        subtitle:"",
        image: {
            src : {
                rawUrl:""
            }
        },
        actionLink:""
    }
}

export function criarCustomCard(){

    return {
        card: {
            title:"",
            subtitle:"",
            imageUri:"",
            buttons: [
                {
                    text:"botão",
                    postback:""
                }
            ]
        }
    }
    
}

export async function obterCardSorvete(tipoCard = 'custom'){
    const sorveteModelo = new Sorvete();
    const listaSorvetes = await sorveteModelo.consultar();
    const listaCards = [];
    
    for(const sorvete of listaSorvetes){
        let cartao;
        if(tipoCard == 'custom'){
            cartao =  criarCustomCard();
            cartao.card.title = sorvete.descricao;
            cartao.card.subtitle = `Sabor: ${sorvete.sabor}, Tipo: ${sorvete.tipo} Valor: ${sorvete.valor}`
            cartao.card.imageUri = sorvete.urlImagem;
            cartao.card.buttons[0].text = 'Clique aqui para mais informações';
            cartao.card.buttons[0].postback = "https://www.sorvetebrasil.com.br/sorvetes-";           
        }else{              
                cartao = criarMsgCard();
                cartao.title = sorvete.descricao;
                cartao.subtitlesubtitle = `Sabor: ${sorvete.sabor}, 
                Tipo: ${sorvete.tipo}, 
                Valor: R$${sorvete.valor},`;
                cartao.image.src.rawUrl = sorvete.urlImagem;
                cartao.actionLink = "https://www.sorvetebrasil.com.br/sorvetes-";
            }
            listaCards.push(cartao);
        }
        return listaCards;
}

