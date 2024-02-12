import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { MO as MOEvents } from '../models/events';
import { MO } from '../models/users';

const users: MO.User[] = [];


   export const  createUser = (req: Request, res: Response) => {
        const { id, name, email, password } = req.body;

        if (!id || !name || !email || !password) {
            res.status(400).send('Missing required information');
            return;
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new MO.User(id, name, email, hashedPassword);
        users.push(newUser);
        res.status(201).json(newUser);
    }

    export const getUsers = (req: Request, res: Response) => {
        res.status(200).json(users);
    }

  export const   getUserByID =  (req: Request, res: Response) => {
        const id = req.params.id;
        const user = users.find(user => user.id === id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    }

   export const  updateUser = (req: Request, res: Response) => {
        const id = req.params.id;
        const { name, email, password } = req.body;
        const user = users.find(user => user.id === id);

        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        if (!name && !email && !password) {
            res.status(400).send('At least one field is required');
            return;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        res.status(200).json(user);
    }

    export const deleteUser = (req: Request, res: Response) => {
        const id = req.params.id;
        const index = users.findIndex(user => user.id === id);

        if (index !== -1) {
            users.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).send('User not found');
        }
    }
