const axios = require('axios')

const generateQR  = async function(req,res){
    let {url} = req.query
    let flag = 0
    let urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

    // -------------------- validations -----------------
    if(!url) return res.status(404).send({status:false,message:"please provide url"})

    if(!urlRegex.test(url)) return res.status(404).send({status:false,message:"invalid url format"})
    
    await axios.get(url).then(function (response) {
        console.log("success");
    }).catch(function (error) {
        flag=1
    })
    if(flag == 1) return res.status(404).send({status:false,message:"url not exist"})
    // ---------------------------------------------------
    
    return res.redirect(`http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=100x100`)
}

module.exports = {generateQR}