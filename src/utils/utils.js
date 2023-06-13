import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { config } from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename );