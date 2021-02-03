import { Event } from '../reservations.service';
import { groupBy, getDateString } from '../../shared/utilities';


export function groupEventsByDate(events: Array<Event>) {
    if (events.length === 0) return {};

    const getDate = (event: Event) => {
        let date = new Date(event.start.dateTime);
        return getDateString(date);
    }
    return groupBy(events, getDate);
}

export function sortEventList(events: Event[]) {
    return events.sort((a, b) => {
        let date = new Date(a.start.dateTime);
        let comp = new Date(b.start.dateTime);
        if (date < comp) return -1;
        else if (date > comp) return 1;
        else return 0;
    });
}