import * as Highcharts from 'highcharts';

declare module 'highcharts' {
    interface TooltipOptions {
        /**
         * Delay time in milliseconds before displaying a tooltip.
         */
        delayForDisplay?: number;
    }
}
