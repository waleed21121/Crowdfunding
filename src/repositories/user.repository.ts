import { User } from "../models";
import BaseRepository from "./base.repository";

class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User)
    }
}

export default new UserRepository()