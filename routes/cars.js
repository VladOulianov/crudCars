module.exports = {
    getCars : (req, res)=>{
       
            let query = "select c.id as carId, c.name as modele, f.name as Constructeur, c.years as années, c.price as prix, c.image as image from cars_table as c join factories as f on c.factoryId = f.id order by c.price asc;";
            db.query(query, (err, result)=>{
                console.log(result);
                if (err){
                    res.send(err)
                } res.render("index", {cars:result});
            })
    },

    getSingleCar:(req, res)=>{
        let id = req.params.id
        let query = "select c.id as carId, c.name as modele, f.name as Constructeur, c.years as années, c.price as prix, c.image as image from cars_table as c join factories as f on c.factoryId = f.id where c.id = "+ id;
        db.query(query, (err, result)=>{
            //console.log(result);
            if (err){
                res.send(err)
            } res.render("singlecar", {car:result[0]});
        })
},

    getUpdateCar: (req, res)=>{
        let id = req.params.id
        let query = [
            "select c.name as modele, f.name as Constructeur, c.years as années, c.price as prix, c.image as image, e.name as energie from cars_table as c join factories as f on c.factoryId = f.id join energies as e on c.energyId = e.id where c.id = " + id,
            "select * from factories",
            "select * from energies"
        ]

        db.query(query.join(';'), (err, result)=>{
            console.log(result);
            if (err){
                res.send(err)
            } res.render("updatecar", {
                car:result[0][0],
                factories:result[1],
                energies:result[2]
            });
        })
    },

    postUpdateCar:(req, res)=>{
        
        let name = req.body.name
        let factoryId = req.body.factoryId
        let price = req.body.price
        let years = req.body.years
        let image = req.body.image
        let energyId = req.body.energyId
        let id = req.params.id
        
 // "update cars_table JOIN factories ON cars_table.factoryId = factories.id JOIN energies ON cars_table.energyId = energies.id set cars_table.name =?, cars_table.factoryId= ?, cars_table.years=?, cars_table.price=?, cars_table.image=?, cars_table.energyId=? where cars_table.id =?;"

      let query =    "update cars_table set name =?, factoryId=?, years=?, price=?, image=? , energyId=? where id =?"

        db.query(query,[name,factoryId,years,price,image,energyId,id], (err, result)=>{
            console.log(result);
            if (err){
                res.send(err)
            } res.redirect("/");
        })
    },
    getAddCar : (req, res)=>{
        
        let query = [
            "select * from factories",
            "select * from energies"
        ]

        db.query(query.join(';'), (err, result)=>{
            console.log(result);
            if (err){
                res.send(err)
            } res.render("addcar", {
                factories:result[0],
                energies:result[1]
            });
        })
    },
    postAddCar : (req, res)=>{
        let name = req.body.name
        let factoryId = req.body.factoryId
        let price = req.body.price
        let years = req.body.years
        let image = req.body.image
        let energyId = req.body.energyId

       let query= "INSERT INTO cars_table (name, factoryId, years, price, image,energyId) VALUES (?, ? , ?, ?, ?, ?);";
        

       db.query(query,[name,factoryId,years,price,image,energyId], (err, result)=>{
        console.log(result);
        if (err){
            res.send(err)
        } res.redirect("/");
    })
    }
}