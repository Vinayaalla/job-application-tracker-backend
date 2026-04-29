const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository =
    require("../repositories/user.repository");

exports.login = async (data) => {

    const { username, password } = data;

    const user =
        await userRepository.findByUsername(username);

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET || "secretkey123",
        { expiresIn: "1d" }
    );

    return {
        message: "Login successful",
        token,
        user: {
            id: user.id,
            username: user.username,
            dob: user.dob,
            address: user.address,
            city: user.city,
            state: user.state,
            country: user.country
        }
    };

};


exports.changePassword =
    async (userId, data) => {

        const {
            currentPassword,
            newPassword
        } = data;

        const user =
            await userRepository.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const isMatch =
            await bcrypt.compare(
                currentPassword,
                user.password
            );

        if (!isMatch) {
            throw new Error(
                "Incorrect current password"
            );
        }

        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );

        await userRepository.updatePassword(
            userId,
            hashedPassword
        );

        return {
            message:
                "Password updated successfully"
        };

    };