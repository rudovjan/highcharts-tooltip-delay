import type { Point, Tooltip, wrap } from 'highcharts';

const _wrap = window.Highcharts.wrap as typeof wrap;
const _tooltip = window.Highcharts.Tooltip as typeof Tooltip;

declare module 'highcharts' {
    interface TooltipOptions {
        /**
         * Delay time in milliseconds before displaying a tooltip.
         */
        delayForDisplay?: number;
    }
}

const tooltipdelay = function () {
    const timerIdMap = new Map<string, number>();

    const generatePointsUniqueKey = (points: Point[]) => {
    
        const generatePointKey = (point: Point): string => {
            return point.category + " " + point.series.name + ": " + point.x + " " + point.y;
        };
    
        const result = points.map(generatePointKey).join(', ');
    
        return result;
    };
    
    const refreshWrapper = function(
            proceed: (context: any, args: any[]) => void,
            pointOrPoints: Point|Point[],
            ...args: any[]) {
    
        const tooltip = this as Tooltip;
    
        let seriesName: string = undefined;
        if (Array.isArray(pointOrPoints)) {
            // Can be array in case that, it's shared tooltip
            seriesName = generatePointsUniqueKey(pointOrPoints);
        } else {
            seriesName = pointOrPoints.series.name;
        }
    
        const chart = tooltip.chart;
    
        const delayForDisplay: number = typeof chart.options.tooltip.delayForDisplay === 'number' ? 
            chart.options.tooltip.delayForDisplay : 1000;
    
        if (timerIdMap.has(seriesName)) {
            clearTimeout(timerIdMap.get(seriesName));
            timerIdMap.delete(seriesName);
        }
    
        const timerId = window.setTimeout(() => {
            if (pointOrPoints === chart.hoverPoint || (Array.isArray(pointOrPoints) && pointOrPoints.indexOf(chart.hoverPoint) >= 0)) {
                proceed.apply(tooltip, [pointOrPoints, ...args]);
            }
        }, delayForDisplay);
    
        timerIdMap.set(seriesName, timerId);
    };
    
    _wrap(_tooltip.prototype, 'refresh', refreshWrapper);
}

export default tooltipdelay;
if (typeof (window as any).module !== "object" || typeof (window as any).module.exports === "object") {
    tooltipdelay();
}
