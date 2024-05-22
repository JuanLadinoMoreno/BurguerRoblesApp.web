export const authRequired = (req, res, next) => {
    console.log(req.headers);
    // res.send('suth')
    next()
}