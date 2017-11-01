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
            let deleteList = [];
            this.subscriptions.forEach(function (sub, i) {
                // indexOf долгая, присвоим значение 1 раз
                let includeEvent = sub.event.indexOf(event);

                // проверка вхождения и от slide.funny === slide
                if (includeEvent === 0 && context === sub.context) {

                    // проверка от slidee === slide
                    if (sub.event[includeEvent + event.length] === '.' ||
                    sub.event[includeEvent + event.length] === undefined) {
                        // delete this.subscriptions[i];
                        deleteList.push(i);
                    }
                }
                console.info('OFF4', this.subscriptions);
            }, this);

            // можно тоже пока оставить, разберусь, что там не так
            let i = 0;
            console.info(this.subscriptions.length);
            console.info(deleteList);
            while (i < this.subscriptions.length) {
                if (deleteList.indexOf(i) + 1) {
                    console.info('11', i);
                    this.subscriptions.splice(i, 1);
                    deleteList.shift();
                } else {
                    i++;
                }
            }

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            let strEvent = String(event);
            let eventList = [];
            for (let i = 0; i < strEvent.length; ++i) {
                if (strEvent[i] === '.') {
                    eventList.unshift(strEvent.slice(0, i));
                }
            }
            eventList.unshift(strEvent);
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
            console.info(event, context, handler, times);
            if (times > 0) {
                this.on(event, context, function () {
                    while (times > 0) {
                        handler.call(context);
                        times -= 1;
                    }
                });
            } else {
                this.on(event, context, handler);
            }

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
            console.info(event, context, handler, frequency, this.subscriptions.length);
            // let lghnt = this.subscriptions.length;
            // let divisior = lghnt % frequency;
            // divisior = (lghnt - divisior) / frequency;
            // let dopustim = 0;
            if (frequency <= 0) {
                return this.on(event, context, handler);
            }
            // for (let j = 1; j <= divisior; ++j) {
            //     for (let i = 1; i < frequency; ++i) {
            //         this.on(event, context, function () {
            //             return 0;
            //         });
            //     }
            //     this.on(event, context, function () {
            //         handler.call(context);
            //     });
            // }

            // for (let i = 0; i < this.subscriptions.length; ++i) {
            //     this.on(event, context, function () {
            //         if (i % frequency === 0) {
            //             handler.call(context);
            //         }
            //     });
            // }

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
