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
    const {nomeBuild, processador, placaVideo, ram, armazenamento, preco, categoria, desempenho, ValorProcessador, valorPlacaVideo, valorTotalRam, valorTotalArmazenamento, EspacoRam } = req.body;

    if(!processador || !ram || !armazenamento || !desempenho){
        return res.status(404).json({
            success: false,
            message: "Todos os computadores precisam de um processador, memoria Ram, armazenamento e de seu desempenho"
        });
    };

    if(!EspacoRam%2==0){
        return res.status(400).json({
            success: false,
            message: "O valor da memora ram deve ser uma potencia de 2"
        })
    }



    const novoPc = {
        id:builds.length + 1,
        nomeBuild: nomeBuild,
        processador: processador,
        placaVideo: placaVideo,
        ram: ram,
        armazenamento: armazenamento,
        valorPlacaVideo: valorPlacaVideo,
        valorTotalArmazenamento:valorTotalArmazenamento,
        valorTotalRam: valorTotalRam,
        ValorProcessador: ValorProcessador,
        preco: valorPlacaVideo + valorTotalArmazenamento + valorTotalRam + ValorProcessador,
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

const deletarBuild = (req, res) => {
    const id =parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(404).json({
            sucess: false,
            message: "O id inserido é invalido"
        })
    }

    const buildParaRemover = builds.find(b => b.id === id);

    if(!buildParaRemover) {
        return res.status(404).json({
            sucess: false,
            message: `A build com o id: ${id} não existe`
        });
    }

    const computadoresFiltrados = builds.filter(c => c.id !== id);

    builds.splice(0, builds.length, ...computadoresFiltrados);

     return res.status(200).json({
        sucess: true,
        message: `O computador ${id} foi removido com sucesso`,
        data: buildParaRemover
    });
};

const atualizarBuild = (req, res) => {
    const id = parseInt(req.params.id);
    const {nomeBuild, processador, placaVideo, ram, armazenamento, preco, categoria, desempenho, ValorProcessador, valorPlacaVideo, valorTotalRam, valorTotalArmazenamento } = req.body;

    const idParaEditar = id;

    if(isNaN(idParaEditar)){
        return res.status(404).json({
            sucess: false, 
            message: "o id deve ser um número válido."
        })
    }
 
    const buildExiste = builds.find(b => b.id === idParaEditar);
    if(!buildExiste){
        return res.status(404).json({
            sucess: false,
            message: `A build com o id: ${idParaEditar} não existe.`
        })
    }

    const buildsAtualizadas = builds.map(b => b.id === idParaEditar ? {
        ...b,
        ...(nomeBuild && { nomeBuild }),
        ...(processador && { processador }),
        ...(placaVideo && { placaVideo }),
        ...(ram && { ram }),
        ...(armazenamento && { armazenamento }),
        ...(preco && { preco: valorPlacaVideo+valorTotalArmazenamento+ValorProcessador+valorTotalRam }),
        ...(categoria && { categoria }),
        ...(desempenho && { desempenho }),
        ...(ValorProcessador && { ValorProcessador }),
        ...(valorPlacaVideo && { valorPlacaVideo }),
        ...(valorTotalRam && {valorTotalRam}),
        ...(valorTotalArmazenamento && { valorTotalArmazenamento })
    }
        : b   
    );
   builds.splice(0, builds.length, ...buildsAtualizadas);

   const buildEditada = builds.find(b => b.id === idParaEditar)
   return res.status(200).json({
      sucess: true,
      message: "Os dados do carro foram editados com sucesso",
      data: buildEditada
    })
}


export { getAllBuilds, getBuildById, criarBuild, deletarBuild, atualizarBuild}