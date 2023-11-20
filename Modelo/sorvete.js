import SorveteDAO from "../Persistência/sorveteDAO.js";

export default class Sorvete {

    #codigo;
    #descricao;
    #sabor;
    #valor;
    #tipo;
    #urlImagem;

    get codigo(){return this.#codigo}
    set codigo(codigo){this.#codigo = codigo}

    get descricao(){return this.#descricao}
    set descricao(descricao){this.#descricao = descricao}

    get sabor(){return this.#sabor}
    set sabor(sabor){this.#sabor = sabor}

    get valor(){return this.#valor}
    set valor(valor){this.#valor = valor}

    get tipo(){return this.#tipo}
    set tipo(tipo){this.#tipo = tipo}

    get urlImagem(){return this.#urlImagem}
    set urlImagem(novaUrl){this.#urlImagem = novaUrl}

    constructor(codigo, descricao, sabor, valor, tipo, urlImagem){
        this.#codigo = codigo;
        this.#descricao = descricao;
        this.#sabor = sabor;
        this.#valor = valor;
        this.#tipo = tipo;
        this.#urlImagem = urlImagem;
    }

    toJSON(){
        return {
            'codigo': this.#codigo,
            'descricao': this.#descricao,
            'sabor': this.#sabor,
            'valor': this.#valor,
            'tipo': this.#tipo,
            'urlImagem': this.#urlImagem
        }
    }

    async gravar(){
        const sorveteDAO = new SorveteDAO();
        await sorveteDAO.gravar(this);
    }

    async atualizar(){
        const sorveteDAO = new SorveteDAO();
        await sorveteDAO.atualizar(this);
    }

    async excluir(){
        const sorveteDAO = new SorveteDAO();
        await sorveteDAO.excluir(this);
    }

    async consultar(){
        const sorveteDAO = new SorveteDAO();
        return await sorveteDAO.consultar();
    }

}