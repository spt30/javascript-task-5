'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
getEmitter.isStar = false;
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
            console.info('ON', event, context, handler);
            this.subscriptions.push({ event, context, handler });
            console.info(this);

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            console.info('OFF', event, context);
            // console.info(this.subscriptions.event);
            // let deleteList = [];

            this.subscriptions.forEach(function (sub, i) {
                console.info('OFF1', sub);
                let eventNum = sub.event.indexOf(event);
                console.info('OFF2', eventNum);
                if (eventNum === 0) {
                    if (sub.event[eventNum + event.length] !== '.' &&
                    sub.event[eventNum + event.length] !== undefined) {
                        console.info('OFF3', sub.event[eventNum + event.length]);

                        return 0;
                    }
                    if (context === sub.context && eventNum === 0) {
                        delete this.subscriptions[i];
                    }
                }
            }, this);

            // let i = 0;
            // console.info(this.subscriptions.length);
            // console.info(deleteList);
            // while (i < this.subscriptions.length) {
            //     if (deleteList.indexOf(i) + 1) {
            //         console.info('11', i);
            //         this.subscriptions.splice(i, 1);
            //         deleteList.shift();
            //     } else {
            //         i++;
            //     }
            // }

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            console.info('EMIT', event);
            let eventList = [event];
            if (event.indexOf('.') + 1) {
                let eventLeft = event.split('.');
                console.info('EMIT1', eventLeft);
                eventList.push(eventLeft[0]);
                console.info('EMIT3', eventList);
            }
            eventList.forEach(function (e) {
                console.info(e);
                this.subscriptions.forEach(function (sub) {
                    console.info(sub);
                    if (sub.event === e) {
                        console.info('yep');
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
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}
