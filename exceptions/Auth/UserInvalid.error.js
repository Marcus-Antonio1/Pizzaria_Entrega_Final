export class UserNoExistence extends Error{
    constructor(message = 'O usuário não existe no banco de dados'){
        super(message)
        this.name = 'UserNoExistence'
    }
}