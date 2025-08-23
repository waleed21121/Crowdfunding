import { config } from 'dotenv';
import { EnvSchema } from '../schemas';
config();

const envVariables = EnvSchema.parse(process.env);

export default envVariables