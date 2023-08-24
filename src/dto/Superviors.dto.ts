export interface SupervisorsInput {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface SupervisorsPayload {
  _id: string;
  email: string;
  verified: boolean;
  is_supervisors: boolean;
}
