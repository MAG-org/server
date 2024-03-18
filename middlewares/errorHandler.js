
const errorHandler = (error, req, res, next) => {
    let status = error.status || 500
    let message = error.message || "Internal Server Error"
    let name = error.name || "Server Error"

    // switch(error.name){
    //     case('Invalid Input'):

    //     break
    // }

    res.status(status).json({
        name,
        message
    })
}


module.exports = errorHandler