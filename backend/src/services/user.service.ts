import { StatusCodes } from 'http-status-codes';
import { userRepository } from '../repositories';
import { IUser } from '../schemas';
import { AppError } from '../utils';
import { JWT } from '../utils';
import { ILoginUser } from '../schemas';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../config';
import { IVerifyUser } from '../schemas';


async function create(data: IUser) {
    const user = await userRepository.finOne({where: {email: data.email}});
    if(user && user.isVerified) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Error Creating a user.", "The email is already registered.")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const verifyToken = await crypto.randomBytes(64).toString('hex');

    if(user && !user.isVerified) {
        const updatedUser = await userRepository.update({
            password: hashedPassword,
            verifyToken: verifyToken
        }, {
            where: {email: data.email},
            returning: true
        });
        
        sendVerificationEmail(user.email, verifyToken);

        return updatedUser[1];
    }
    
    const userPayload: IUser = {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        balance: data.balance,
        isVerified: false,
        verifyToken: verifyToken
    }

    sendVerificationEmail(data.email, verifyToken);
    const response = await userRepository.create(userPayload);
    return response;
}

async function login (data: ILoginUser) {
    const user = await userRepository.finOne({where: {email: data.email}});
    if(!user) {
        throw new AppError(404, "Not Found", "No User Found, Please Register First.");
    }

    if(!user.isVerified) {
        throw new AppError(StatusCodes.FORBIDDEN, "Error login the user", "Please verify your account with verification link.")
    }
    
    const match = await bcrypt.compare(data.password, user.password);
    if(!match) {
        throw new AppError(StatusCodes.FORBIDDEN, "Error login the user", "The given password doesn't match the actual password.");
    }

    const userPayload = {
        email: user.email,
        role: 'user'
    }
    const accessToken = await JWT.accessTokenGenerator(userPayload);
    const refreshToken = await JWT.refreshTokenGenerator(userPayload);
    
    return {
        accessToken,
        refreshToken
    };
}

async function verify (user: IVerifyUser) {
    const userToVerify = await userRepository.finOne({where: {email: user.email}});
    if(!userToVerify) {
        throw new AppError(404, "Not Found", "No User Found.");
    }

    if(userToVerify.isVerified) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Error verifing the user", "This email is already verified.");
    }

    if(user.token !== userToVerify.verifyToken) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Error verifing the user", "the tokens doesn't match, please try register again.");
    }

    const updatedUser = await userRepository.update({
        isVerified: true
    }, {
        where: {email: user.email},
        returning: true
    })
    return updatedUser[1];
}

async function findAll() {
    const response = await userRepository.findAll({});
    if(response.length === 0) {
        throw new AppError(404, "Not Found", "No User Found.");
    }
    return response;
}

async function findOne(id: number) {
    const response = await userRepository.finOne({where: {id: id}});
    if(!response) {
        throw new AppError(404, "Not Found", "No User Found With The Given Id.");
    }
    return response;
}

async function deleteUser (id: number) {
    const response = await userRepository.delete({where: {id: id}});
    if(response === 0) {
        throw new AppError(404, "Not Found", "Deletion Failed: No User Found With The Given Id.");
    }
    return response;
}

const userService = {
    create,
    findAll,
    findOne,
    deleteUser,
    login,
    verify
}

export default userService