import dados from "../models/dados.js";
const { builds } = dados;



const getAllBuilds = (req, res) => {
    let resultado = builds;
    const {categoria,preco} = req.query

    if(categoria){
        resultado = resultado.filter(a => a.categoria.toLowerCase().includes(categoria.toLowerCase()))
    }

    res.status(200).json({
        total: resultado.length,
        builds: resultado
    });
};



const getBuildById = (req, res) => {
    const id = parseInt(req.params.id);

    const build = builds.find(b => b.id === id);

    if(!build){
        res.status(404).json({
            sucess: false,
            messsage: `O computador com id: ${id} não foi encontrado`
        });
    };

    return res.status(200).json({
        total:build.length,
        Build: build
    });
};

const criarBuild = (req, res) => {
    const {nomeBuild, processador, placaVideo, ram, armazenamento, preco, categoria, desempenho } = req.body;

    if(!processador || !ram || !armazenamento || !preco || !desempenho){
        return res.status(404).json({
            sucess: false,
            message: "Todos os computadores precisam de um processador, memoria Ram, armazenamento, preço(nada é de graça) e de seu desempenho"
        });
    }

    const novoPc = {
        id:builds.length + 1,
        nomeBuild: nomeBuild,
        processador: processador,
        placaVideo: placaVideo,
        ram: ram,
        armazenamento: armazenamento,
        preco: preco,
        categoria: categoria,
        desempenho: desempenho
    }

    builds.push(novoPc)

    return res.status(200).json({
        sucess: true,
        message: "Nova Build de Compudador adicionada com sucesso",
        build: novoPc
    })
}


export { getAllBuilds, getBuildById, criarBuild }