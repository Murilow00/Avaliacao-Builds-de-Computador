import dados from "../models/dados.js";
const { computadoress } = dados;

const getAllBuilds = (req, res) => {
    let resultado = computadoress;

    res.status(200).json({
        builds: resultado
    });
};

const getPcById = (req, res) => {}
export { getAllBuilds }