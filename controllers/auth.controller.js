const authService =
    require("../services/auth.service");

exports.login = async (req, res) => {
    try {
        const result =
            await authService.login(req.body);

        res.json(result);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const result =
            await authService.changePassword(
                req.user.id,
                req.body
            );

        res.json(result);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};