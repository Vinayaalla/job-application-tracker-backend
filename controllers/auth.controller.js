const authService =
    require("../services/auth.service");

exports.signup = async (req, res) => {
    try {
        const result = await authService.signup(req.body);
        res.json(result)
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};


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

exports.deleteAccount = async (req, res) => {
    try {
        const result =
            await authService.deleteAccount(req.user.id);

        res.json(result);

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const result = await authService.updateProfile(req.user.id, req.body);
        res.json(result);

    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}