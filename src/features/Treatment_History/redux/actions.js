import { ALL_LIST, SET_LOAD } from './constants';

export const AllHistory = (data) => ({
    type: ALL_LIST,
    json: data
});

export const SETLOAD = () => ({
    type: SET_LOAD
});
