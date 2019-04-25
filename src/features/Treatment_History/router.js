import HistoryScreen from "./screen/HistoryScreen";
import DetailHistory from "./screen/DetailHistory";

export const HISTORY_SCREEN = 'HISTORY_SCREEN';
export const DETAIL_HISTORY = 'DETAIL_HISTORY';

export const HistoryRouter = {
    [HISTORY_SCREEN]: {
        screen: HistoryScreen
    },
    [DETAIL_HISTORY]: {
        screen: DetailHistory
    }
};
