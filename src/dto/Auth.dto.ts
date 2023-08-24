import {  SupervisorsPayload} from "./Superviors.dto";
import { StudentPayload } from "./Student.dto";

export type AuthPayload = SupervisorsPayload | StudentPayload;

