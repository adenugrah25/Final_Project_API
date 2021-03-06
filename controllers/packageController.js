const { asyncQuery, queryAddPkg } = require('../helpers/queryHelp')

module.exports = {
    addPackage: async (req, res) => {
        const {package_name, package_price, description, details} = req.body
        try {
            const queryPkg = `insert into package (package_name, package_price, description) 
            values ('${package_name}', ${package_price}, '${description}')`
            const resultPkg = await asyncQuery(queryPkg)
            const id_package = resultPkg.insertId
            console.log(id_package)

            const queryPkgDetails = `insert into package_details (package_id, category_id, max_qty) 
            values ` + queryAddPkg(resultPkg.insertId, details)
            const resultPkgDetails = await asyncQuery(queryPkgDetails)

            res.status(200).send({id_package})
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },
    uploadImgPkg: async (req, res) => {
        const id = parseInt(req.params.id);
        console.log("file : ", req.file);

        if (req.file === undefined) return res.status(400).send("no image.");

        try {
            const img = `UPDATE package SET img = 'package/${req.file.filename}' WHERE id_product_package = ${id}`;
            const result = await asyncQuery(img);

            res.status(200).send("uploaded");
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    },
    editPackage: async (req, res) => {
        const { package_name, package_price, description, img, id } = req.bod
        console.log('body : ', req.body)
        try {
            const query = `UPDATE package SET
            package_name = '${package_name}',
            package_price = ${package_price},
            description = '${description}',
            img = '${img}'
            WHERE id_product_package = ${id}`

            // const resultQuery = await asyncQuery(query)
            res.status(200).send(query)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },
    // addPackageWithImg: async (req, res) => {
    //     const {package_name, package_price, description, details} = req.body
    //     try {
    //         if (req.file === undefined) return res.status(400).send("no image.");

    //         const queryPkg = `insert into package (package_name, package_price, description) 
    //         values ('${package_name}', ${package_price}, '${description}')`
    //         const resultPkg = await asyncQuery(queryPkg)

    //         const queryPkgDetails = `insert into package_details (package_id, category_id, max_qty) 
    //         values ` + queryAddPkg(resultPkg.insertId, details)
    //         const resultPkgDetails = await asyncQuery(queryPkgDetails)

    //         const img = `UPDATE package SET img = 'package/${req.file.filename}' WHERE id_product_package = ${id}`;
    //         const result = await asyncQuery(img);

    //         res.status(200).send("uploaded");
    //     } catch (err) {
    //         console.log(err)
    //         res.status(500).send(err)
    //     }
    // }
}