export interface Employee {
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    phoneNumber:string;
    department:string;
    salary:number;
    dateOfJoining:string;
    isActive:boolean;
    roleId?: number | null;
    roleName?: string | null;
    role?: {
        id: number;
        name: string;
        description?: string;
    } | null;
}