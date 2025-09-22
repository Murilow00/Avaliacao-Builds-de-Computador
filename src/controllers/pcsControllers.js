import dados from "../models/dados.js";
const { builds } = dados;



const getAllBuilds = (req, res) => {
    let resultado = builds;
    const {categoria} = req.query

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


export { getAllBuilds, getBuildById,  }