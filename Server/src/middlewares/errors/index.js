import ErrorCodes from "../../services/errors/errorCodes.js";

/**
 * @type {import("express").ErrorRequestHandler}
 */

export const errorHandler = (error, req, res, next) => {
// export default (error, req, res, next) => {
    console.log('587435435434343543544444444444444444444444444');
    console.log(error.cause)
    switch (error.code) {
        case ErrorCodes.INVALID_TYPES_ERROR:
            res.status(400).send({ status: 'error', error: error.name })
            break
        default:
            res.status(500).send({ status: 'error', error: 'Unknown' })
    }

    next()
}

// export default errorHandler

