export class User{
    constructor(
        public email:string,
        public id:string,
        private _token:string,
        private _tokenExpiration
    ){}
    
    public get token(){
        if(!this._tokenExpiration||new Date()>this._tokenExpiration){
            return null;
        }
        return this._token;
    }
    
}