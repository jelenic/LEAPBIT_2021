require('../services/rest/rest');

const restServices = require('../services/rest/rest');

module.exports = {
    /* getKinos: (req, res) =>
    {

    }, */
    getSingleKinoData: async (req, res) =>
    {
        if (!req.params.name)
        {
            res.send('Required name is missing');
        }
        else
        {
            /* this is for promise (remove async from function above)
            restServices.getSingleKinoData(req.params.name).then((data) =>
            {
                res.send(data);
            }).catch((err) =>
            {
                res.send(err.message);
            }); */

            const result = await restServices.getSingleKinoData(req.params.name);
            console.log(result);
            res.send(result);
        }
    },
    getSingleKinoDataQ: async (req, res) =>
    {
        if (!req.params.name)
        {
            res.send('Required name is missing');
        }
        else if (!req.params.minms)
        {
            res.send('Required minms is missing');
        }
        else if
        (/* parseInt(req.params.minms) !== parseInt(req.params.minms) */Number.isNaN(parseInt(req.params.minms, 10)))
        {
            res.send('invalid minms value');
        }
        else
        {
            /* restServices.getSingleKinoDataQ(req.params.name, parseInt(req.params.minms, 10)).then((data) =>
            {
                res.send(data);
            }).catch((err) =>
            {
                res.send(err.message);
            }); */
            const result = await restServices.getSingleKinoDataQ(req.params.name, parseInt(req.params.minms, 10));
            res.send(result);
        }
    },
    getSingleDrawData: async (req, res) =>
    {
        if (!req.params.name)
        {
            res.send('Required name is missing');
        }
        else if (!req.params.ms)
        {
            res.send('Required ms is missing');
        }
        else if
        (/* parseInt(req.params.minms) !== parseInt(req.params.minms) */Number.isNaN(parseInt(req.params.ms, 10)))
        {
            res.send('invalid ms value');
        }
        else
        {
            /* restServices.getSingleDrawData(req.params.name, parseInt(req.params.ms, 10)).then((data) =>
            {
                res.send(data);
            }).catch((err) =>
            {
                res.send(err.message);
            }); */
            const result = await restServices.getSingleDrawData(req.params.name, parseInt(req.params.ms, 10));
            res.send(result);
        }
    },
    /* addKino: (req, res) =>
    {

    }, */
};
