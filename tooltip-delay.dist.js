"use strict";

(function (H) {

  var timerId = {};

  var generatePointsUniqueKey = function generatePointsUniqueKey(points) {

    var generatePointKey = function generatePointKey(point) {
      return point.category + " " + point.series.name + ": " + point.x + " " + point.y;
    };

    var result = points.map(generatePointKey).join(', ');

    return result;
  };

  H.wrap(H.Tooltip.prototype, 'refresh', function (proceed) {
    var seriesName = void 0;

    if (Array.isArray(arguments[1])) {
      // Can be array in case that, it's shared tooltip
      seriesName = generatePointsUniqueKey(arguments[1]);
    } else {
      seriesName = arguments[1].series.name;
    }

    var delayForDisplay = this.chart.options.tooltip.delayForDisplay ? this.chart.options.tooltip.delayForDisplay : 1000;

    if (timerId[seriesName]) {
      clearTimeout(timerId[seriesName]);
      delete timerId[seriesName];
    }

    timerId[seriesName] = window.setTimeout(function () {
      var pointOrPoints = this.refreshArguments[0];

      if (pointOrPoints === this.chart.hoverPoint || $.inArray(this.chart.hoverPoint, pointOrPoints) > -1) {
        proceed.apply(this.tooltip, this.refreshArguments);
      }
    }.bind({
      refreshArguments: Array.prototype.slice.call(arguments, 1),
      chart: this.chart,
      tooltip: this
    }), delayForDisplay);
  });
})(Highcharts);
