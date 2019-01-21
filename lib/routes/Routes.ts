import {Request, Response, NextFunction} from "express";
import { AuthController } from "../controllers/AuthController";

export class Routes { 
    
    public authController: AuthController = new AuthController() 
    
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        });

        app.post('/api/user', (req: Request, res: Response) => {
            this.authController.createUser(req,res);
        });

        app.get('/api/user', (req: Request, res: Response) => {
            this.authController.decodeToken(req,res);
        });

        app.post('/api/login', (req: Request, res: Response) => {
            this.authController.login(req,res);
        });

        app.get('/api/logout', (req: Request, res: Response) => {
            this.authController.logout(req,res);
        });

        app.put('/api/user', (req: Request, res: Response) => {
            this.authController.updateUser(req,res);
        });
    }
}