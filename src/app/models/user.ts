export interface BuyerLogin {
    email: string,
    password: string,
}

export interface BuyerRegister {
    first_name: string,
    last_name: string,
    contact_number: string,
    role: number,
    email: string,
    password: string,
}

export interface SellerLogin {
    member_code: string,
    password: string,
}

export interface SellerRegister {
    first_name: string,
    last_name: string,
    contact_number: string,
    role: number,
    email: string,
    password: string,
    account_number: string,
    account_name: string,
    branch: string,
    ifsc_code: string
}


export interface CarrierLogin {
    contact_number: string,
    password: string,
}

export interface CarrierRegister {
    first_name: string,
    last_name: string,
    contact_number: string,
    role: number,
    email: string,
    password: string,
    vehicle_number: string
}
