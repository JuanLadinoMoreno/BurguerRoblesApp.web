import ErrorCodes from "../../services/errors/errorCodes.js";

/**
 * @type {import("express").ErrorRequestHandler}
 */

export const errorHandler = (error, req, res, next) => {
    switch (error.code) {
        case ErrorCodes.INVALID_TYPES_ERROR:
            res.status(400).send({ status: 'error', error: error.message })
            break
        case ErrorCodes.EXISTING_DATA:
            res.status(409).send({ status: 'error', error: error.message })
            break
        case ErrorCodes.INVALID_CREDENTIALS:
            res.status(400).send({ status: 'error', error: error.message })
            break
        default:
            res.status(500).send({ status: 'error', error: 'Unknown' })
    }
}

