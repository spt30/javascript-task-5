'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
getEmitter.isStar = true;
module.exports = getEmitter;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    return {
        subscriptions: [],

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            this.subscriptions.push({ event, context, handler });

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            let filtered = this.subscriptions.filter(function (sub) {
                let eventFirstSymbol = sub.event.indexOf(event);
                let eventLastSymbol = sub.event[eventFirstSymbol + event.length];
                if (eventFirstSymbol === 0 && context === sub.context &&
                    (eventLastSymbol === '.' || eventLastSymbol === undefined)) {

                    return false;
                }

                return true;

            }, this);

            this.subscriptions = filtered;

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {

            /* Будем искать от предыдущей найденной точки следующую
            и добавлять все, что до нее, в массив unshift'ом.
            В конце добавим сам event*/
            let eventList = [];
            let lastDotIndex = event.indexOf('.');
            while (lastDotIndex !== -1) {
                eventList.unshift(event.slice(0, lastDotIndex));
                lastDotIndex = event.indexOf('.', lastDotIndex + 1);
            }
            eventList.unshift(event);

            eventList.forEach(function (nowEvent) {
                this.subscriptions.forEach(function (sub) {
                    if (sub.event === nowEvent) {
                        sub.handler.call(sub.context);
                    }
                });
            }, this);

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         * @returns {Object}
         */
        several: function (event, context, handler, times) {
            if (times <= 0) {
                return this.on(event, context, handler);
            }

            this.on(event, context, function () {
                while (times) {
                    handler.call(context);
                    times -= 1;
                }
            });

            return this;

        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         * @returns {Object}
         */
        through: function (event, context, handler, frequency) {
            if (frequency <= 0) {
                return this.on(event, context, handler);
            }

            let count = 0;
            this.on(event, context, function () {
                if (count % frequency === 0) {
                    handler.call(context);
                }
                count += 1;
            });

            return this;
        }
    };
}
