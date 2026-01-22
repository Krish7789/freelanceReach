exports.getBusinesses = (req, res) =>{
    res.json([
        {
            id:1,
            name:"ABC Corp",
            email:"contact@abccorp.com",
            city:"New York",
            category:"Tech"
        }
    ]);
}