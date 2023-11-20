import Sorvete from "../Modelo/sorvete.js";
import conectar from "./conexao.js";


export default class SorveteDAO{

    async gravar(sorvete){

        if(sorvete instanceof Sorvete){
            const sql = 'INSERT INTO sorvete (descricao, sabor, valor, tipo, urlImagem) VALUES (?, ?, ?, ?, ?)';
            const parametros = [sorvete.descricao, sorvete.sabor, sorvete.valor, sorvete.tipo, sorvete.urlImagem];

            const conexao = await conectar();
            const resultado = await conexao.execute(sql, parametros);

            sorvete.codigo = resultado[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(sorvete){ 

        if(sorvete instanceof Sorvete){
            const sql = 'UPDATE sorvete SET descricao = ?, sabor = ?, valor = ?,  tipo = ?, urlImagem = ? WHERE codigo = ?';
            const parametros = [sorvete.descricao, sorvete.sabor, sorvete.valor, sorvete.tipo, sorvete.urlImagem, sorvete.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);

            global.poolConexoes.releaseConnection(conexao);
        }    
    }

    async excluir(sorvete){
        if(sorvete instanceof Sorvete){
            const sql = 'DELETE FROM sorvete WHERE codigo = ?';
            const parametros = [sorvete.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);

            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(){
        const sql = 'SELECT * FROM sorvete';

            const conexao = await conectar();
            const [registros, campos] = await conexao.execute(sql);
            let listaSorvetes = [];
            for(const registro of registros){
                const sorvete = new Sorvete(registro.codigo, registro.descricao, registro.sabor, registro.valor, registro.tipo, registro.urlImagem )

                listaSorvetes.push(sorvete);
            }
            
            global.poolConexoes.releaseConnection(conexao);
            return listaSorvetes; 
    }

}