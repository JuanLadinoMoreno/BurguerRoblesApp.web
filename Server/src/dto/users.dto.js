export class usersDto {
    constructor({ _id, firstName, lastName, age, email, password }) {
        this.id = _id
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.email = email
        this.password = password
    }
}
