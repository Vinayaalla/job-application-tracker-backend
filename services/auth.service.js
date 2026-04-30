const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository =
    require("../repositories/user.repository");

exports.signup = async (data) => {
    const {
        username,
        password,
        dob,
        address,
        city,
        state,
        country
    } = data;
    const existingUser =
        await userRepository.findByUsername(username);
    if (existingUser) {
        throw new Error("User already exists , please sign in");
    }
    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );
    await userRepository.signup({
        username,
        password: hashedPassword,
        dob,
        address,
        city,
        state,
        country
    });
    return {
        message: "User registered successfully"
    };
};

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


exports.deleteAccount = async (userId) => {
    const user =
        await userRepository.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }
    await userRepository.deleteById(userId);
    return {
        message: "Account deleted successfully"
    };
}

exports.updateProfile = async (userId, data) => {
    const {
        username, dob,
        address,
        city,
        state,
        country
    } = data;
    const user =
        await userRepository.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    await userRepository.updateProfile(userId, data);
    const updatedUser =
        await userRepository.findById(userId);
    return {
        message: "updated successfully",
        user: {
            id: updatedUser.id,
            username: updatedUser.username,
            dob: updatedUser.dob,
            address: updatedUser.address,
            city: updatedUser.city,
            state: updatedUser.state,
            country: updatedUser.country
        }
    }
}