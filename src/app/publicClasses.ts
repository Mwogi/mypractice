export class Patient {
    constructor(
        public id: number,
        public lname: string,
        public fname: string,
        public gender: string,
        public dateofbirth: Date,
        public maritalstatus: string,
        public address: string,
        public town: string,
        public county: string,
        public district: string,
        public cellphone: string,
        public contactperson: string,
        public contactphone: string,
        public age: string,
        public ipNumber: string,
        public ptStatus: string,
        public clinic: string,
        public clinicDate: Date,
        public accessT: Date,
        public wardbed: number,
        public ward: number,
        public billinglevel: number,
        public educationlevel: string,
        public occupation: string,
        public religion: string,
        public nationality: string,
        public idnumber: string,
        public emailaddress: string,
        public location: string,
        public village: string,
        public relationshipkin: string,
        public vooid: string,
        public rebate: string


    ){}
}
export class User {
    constructor(
        public userName: string,
        public password: string,
        public userId: number,
    ){}
}