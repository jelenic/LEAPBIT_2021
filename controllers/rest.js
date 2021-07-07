const rest = require("../services/rest/rest");
const restServices = require(`../services/rest/rest`);


module.exports = {
    getKinos: (req, res) => {
        
    },
    getSingleKinoData: (req, res) => {
        if (!req.params.name) {
            res.send("Required name is missing");
        }
        else{
            restServices.getSingleKinoData(req.params.name).then((data) => {
                res.send(data);
            }).catch((err) => {
             res.send(err.message);
         });
        }
    },
    getSingleKinoDataQ: (req, res) => {
        if (!req.params.name) {
            res.send("Required name is missing");
        }
        else if (!req.params.minms){
            res.send("Required minms is missing");
        }
        else if (parseInt(req.params.minms) !== parseInt(req.params.minms)){
            res.send("invalid minms value")
        }
        else{
            restServices.getSingleKinoDataQ(req.params.name, parseInt(req.params.minms)).then((data) => {
                res.send(data);
            }).catch((err) => {
             res.send(err.message);
         });
        }
    },
    getSingleDrawData: (req, res) => {
        if (!req.params.name) {
            res.send("Required name is missing");
        }
        else if (!req.params.ms){
            res.send("Required ms is missing");
        }
        else if (parseInt(req.params.ms) !== parseInt(req.params.ms)){
            res.send("invalid ms value")
        }
        else{
            restServices.getSingleDrawData(req.params.name, parseInt(req.params.ms)).then((data) => {
                res.send(data);
            }).catch((err) => {
             res.send(err.message);
         });
        }
    },
    addKino: (req, res) => {

    }
}