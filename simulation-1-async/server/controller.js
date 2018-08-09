module.exports = {
    getShelf: (req, res) => {
        req.app.get('db').get_shelf([req.params.id])
        .then((bins) => res.send(bins)) 
        .catch(err => res.status(500).send(err))
    },

    createShelf: (req, res) => {
      
        const {name, price, image} = req.body
        req.app.post('db').create_shelf([name, price, image])
        .then(() => res.sendStatus(200))
    },

    getBin: (req, res) => {
        const [shelf, bin] = req.params.id
        req.app.get('db').get_bin([shelf, bin])
            .then(([bin]) => res.send(bin))
            .catch((err) => res.status(500).send(err))
    },

    createBin: (req, res) => {      
        const {name, price} = req.body
        const { id } = req.params
        req.app.get('db').create_bin([id, name, price])
        .then(() => res.sendStatus(200))
        .catch((err) => res.status(500).send(err))
    }, 

    updateBin: (req, res) => {
        const {name, price} = req.body
        const id = req.params.id
        console.log(name, price)
        req.app.get('db').update_bin([name, price, id])
        .then(() => res.sendStatus(200)) 
        .catch((err) => res.status(500).send(err))
    }, 

    deleteBin: (req, res) => {
         const id = req.params.id
         console.log(req.params)
        req.app.get('db').delete_bin([id])
        .then(() =>  res.sendStatus(200))
        .catch((err) => res.status(500).send(err))
    }
}