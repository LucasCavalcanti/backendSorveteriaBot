import { obterCardSorvete } from "../funcoesDialogflow/funcoesDialogFlow.js";

export default class DialogFlowCtrl{

    processarIntencoes(req, res){
        if(req.method === 'POST'){
            const intencao = req.body.queryResult.intent.displayName;

            const origem = req.body?.originalDetectIntentRequest?.source;
            if(intencao === 'Pedido'){
                if(origem){

                    obterCardSorvete('custom').then((listaCards) => {
                        let respDF = {
                            "fulfillmentMessages": []
                        }
                        respDF.fulfillmentMessages.push({
                            "text":{
                                "text": [
                                    "Qual é o seu pedido? Segue abaixo as opções disponíveis no nosso catálogo: \n"
                                ]
                            }
                        });
                        respDF.fulfillmentMessages.push(...listaCards);
                        respDF.fulfillmentMessages.push({
                            "text":{
                                "text": [
                                    "Esses são os sabores disponíveis, qual gostaria? \n"
                                ]
                            }
                        })
                        res.json(respDF);
                    }).catch((error) =>{
                        let respDF = {
                            "fulfillmentMessages": [{
                                "text": {
                                    "text": [
                                        "Erro ao recuperar o catálogo: \n",
                                        "Não foi possível consultar o menu de sorvetes!",
                                        "Desculpe pelo transtorno!"
                                    ]

                                }
                            }]
                        }
                        res.json(respDF);
                    })
                    
                }
                else{
                    obterCardSorvete('messenger').then((listaCards) => {
                        let respDF = {
                            "fulfillmentMessages": []
                        }
                        respDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{
                                    "type": "description",
                                    "title": "Esses são os sabores disponíveis, qual gostaria? \n",
                                    "text": []
                                }]]
                            }
                        });
                        respDF.fulfillmentMessages[0].payload.richContent[0].push(...listaCards);
                        respDF.fulfillmentMessages[0].payload.richContent[0].push({
                            "type": "description",
                                    "title": "Faça sua escolha!",
                                    "text": []
                        });
                        res.json(respDF);
                    })
                    .catch((error) => {
                        let respDF = {
                            "fulfillmentMessages": []
                        }

                        respDF.fulfillmentMessages.push({
                            "payload": {
                                "richContent": [[{ 
                                    "type": "description",
                                    "title": "Erro ao recuperar o catálogo: \n",
                                    "text": [
                                        "Não foi possível consultar o menu de sorvetes!",
                                        "Desculpe pelo transtorno!"
                                    ]
                                }]]
                            }
                        });
                    })
                }

            }
        }

        
    }   
}