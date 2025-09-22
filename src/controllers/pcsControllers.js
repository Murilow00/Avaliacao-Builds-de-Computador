import dados from "../models/dados.js";
const { builds } = dados;

const getAllBuilds = (req, res) => {
    let resultado = builds;

    res.status(200).json({
        total: resultado.length,
        carros: resultado
    });
};

const getBuildById = (req, res) => {
    const id = parseInt(req.params.id);

    const build = builds.find(b => b.id === id);

    if(!build){
        res.status(404).json({
            sucess: false,
            messsage: `O carro com id: ${id} não foi encontrado`
        });
    };

    return res.status(200).json({
        total:build.length,
        Build: build
    });
};


export { getAllBuilds, getBuildById }