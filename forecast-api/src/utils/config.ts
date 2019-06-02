/**
 * Port where application is running on
 */
import {MODES} from '../constants/prediction';

export const PORT: number = Number(process.env.API_PORT) || 3000;

export const MODE_PREDICTION = process.env.MODE_PREDICTION as MODES;

export const EXCHANGE_RATES_HISTORY_API_URL: string = process.env.EXCHANGE_RATES_HISTORY_API_URL;
