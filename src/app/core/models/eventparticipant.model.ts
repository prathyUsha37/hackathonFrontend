import { User } from './user.model';
import {Event} from './event.model'
export interface EventParticipant {
    id: string;
    event:Event;
    employee:User;
    comment:string;
}
  