import { groupEventsByDate } from './utilities'
import { getDateString, getValidDate } from '../../shared/utilities';
import { Event } from '../reservations.service';

describe('reservations/shared/utilities', () => {
    let events: Array<Event> = [];
    let today;
    let yesterday;
    let tomorrow;

    beforeEach(() => {
        today = new Date();
        tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        events = [
            {
                id: '0',
                attendees: [],
                description: '',
                end: {dateTime: yesterday, timeZone: 'America/Los_Angeles'},
                start: {dateTime: yesterday, timeZone: 'America/Los_Angeles'},
                lastName: 'test0',
                summary: 0
            },
            {
                id: '1',
                attendees: [],
                description: '',
                end: {dateTime: yesterday, timeZone: 'America/Los_Angeles'},
                start: {dateTime: yesterday, timeZone: 'America/Los_Angeles'},
                lastName: 'test1',
                summary: 1
            },
            {
                id: '2',
                attendees: [],
                description: '',
                end: {dateTime: today, timeZone: 'America/Los_Angeles'},
                start: {dateTime: today, timeZone: 'America/Los_Angeles'},
                lastName: 'test2',
                summary: 2
            },
            {
                id: '3',
                attendees: [],
                description: '',
                end: {dateTime: today, timeZone: 'America/Los_Angeles'},
                start: {dateTime: today, timeZone: 'America/Los_Angeles'},
                lastName: 'test3',
                summary: 3
            },
            {
                id: '4',
                attendees: [],
                description: '',
                end: {dateTime: today, timeZone: 'America/Los_Angeles'},
                start: {dateTime: today, timeZone: 'America/Los_Angeles'},
                lastName: 'test4',
                summary: 4
            }
        ]
    });

    it('should group events by date', () => {
        let grouped = groupEventsByDate(events);
        let todKey = getDateString(today);
        let yestKey = getDateString(yesterday);

        expect(Object.keys(grouped).length).toBe(2);
        expect(grouped[todKey].length).toBe(3);
        expect(grouped[todKey]).toContain(jasmine.objectContaining({summary: 2}));
        expect(grouped[todKey]).toContain(jasmine.objectContaining({summary: 3}));
        expect(grouped[todKey]).toContain(jasmine.objectContaining({summary: 4}));

        expect(grouped[yestKey].length).toBe(2);
        expect(grouped[yestKey]).toContain(jasmine.objectContaining({summary: 0}));
        expect(grouped[yestKey]).toContain(jasmine.objectContaining({summary: 1}));

        let date = getValidDate(todKey);
        expect(date).not.toBe(null);
        expect(date.getMonth()).toBe(today.getMonth());
        expect(date.getDate()).toBe(today.getDate());
        expect(date.getFullYear()).toBe(today.getFullYear());
    });
});
