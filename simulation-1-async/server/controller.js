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
        const id = req.params.id.split('')
        let shelfLetter = id[0]
        let binNumber = id[1]
        req.app.get('db').get_bin([shelfLetter, binNumber])
            .then(([bin]) => res.send(bin))
            .catch((err) => res.status(500).send(err))
    },

    createBin: (req, res) => {      
        const {name, price, image} = req.body
        const id = req.params.id.split('')
        let shelfLetter = id[0]
        let binNumber = id[1]
        req.app.get('db').create_bin([ name, price, image, shelfLetter, binNumber])
        .then(() => res.sendStatus(200))

        .catch((err) => { 
        console.log(err)
        res.status(500).send(err)})

    }, 

    updateBin: (req, res) => {
        const {name, price} = req.body
        const id = req.params.id.split('')
        let shelfLetter = id[0]
        let binNumber = id[1]
        req.app.get('db').update_bin([name, price, shelfLetter, binNumber])
        .then(() => res.sendStatus(200)) 
        .catch((err) => res.status(500).send(err))
    }, 

    deleteBin: (req, res) => {
        const id = req.params.id.split('')
        let shelfLetter = id[0]
        let binNumber = id[1]
        req.app.get('db').delete_bin([shelfLetter, binNumber])
        .then(() =>  res.sendStatus(200))
        .catch((err) => res.status(500).send(err))
    }
}