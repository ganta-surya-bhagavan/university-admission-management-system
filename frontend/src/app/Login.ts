export class Login
{
    userName:string
    password:string
    role:string
        constructor(id,pass,role)
        {
            this.userName=id;
            this.password=pass;
            this.role=role;
        }
}