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
            // console.info(this);

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
            // - отписка от `slide.funny` отписывает только от него
            // - отписка от `slide` отписывает и от `slide`, и от `slide.funny`

            this.subscriptions.forEach(function (sub, i) {
                console.info('OFF1', sub);
                let includeEvent = sub.event.indexOf(event); // indexOf долгая, присвоим 1 раз
                console.info('OFF2', includeEvent);
                // проверка вхождения и от slide.funny === slide
                if (includeEvent === 0 && context === sub.context) {
                    console.info('OFF22', sub.event[includeEvent + event.length]);
                    // проверка от slidee === slide
                    if (sub.event[includeEvent + event.length] === '.' ||
                    sub.event[includeEvent + event.length] === undefined) {
                        console.info('OFF3', sub.event[includeEvent + event.length]);
                        delete this.subscriptions[i];
                    }
                }
                console.info('OFF4', this.subscriptions);
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
            // let eventList = [event];
            // // console.info('EMIT!', eventList);
            // if (event.indexOf('.') + 1) {
            //     let eventLeft = event.split('.');
            //     // console.info('EMIT1', eventLeft);
            //     eventList.push(eventLeft[0]);
            //     // console.info('EMIT3', eventList);
            // }

            let strEvent = String(event);
            let eventList = [];
            for (let i = 0; i < strEvent.length; ++i) {
                if (strEvent[i] === '.') {
                    eventList.unshift(strEvent.slice(0, i));
                }
            }
            eventList.unshift(strEvent);
            console.info('EMIT!!!', eventList);

            eventList.forEach(function (nowEvent) {
                // console.info(e);
                this.subscriptions.forEach(function (sub) {
                    // console.info(sub);
                    if (sub.event === nowEvent) {
                        // console.info('yep');
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
