const json = (res, data, status = 200) => {
    res.status(status).json({
        status: status == 200 ? true : false,
        data,
    });
};

const errorJson = (res, error, status = 500) => {
    res.status(status).json({
        status: false,
        error: `Something went wrong: ${error}`,
    });
};

module.exports = {
    json,
    errorJson
}
