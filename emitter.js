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

            // Это для алгоритма удаления ниже, полагаю, пригодится
            // let deleteList = [];

            this.subscriptions.forEach(function (sub, i) {
                // indexOf долгая, присвоим значение 1 раз
                let eventStartSymbol = sub.event.indexOf(event);

                // Проверка вхождения и от slide.funny === slide
                if (eventStartSymbol === 0 && context === sub.context) {

                    // Проверка от slidee === slide
                    let eventLastSymbol = sub.event[eventStartSymbol + event.length];
                    if (eventLastSymbol === '.' || eventLastSymbol === undefined) {
                        delete this.subscriptions[i];

                        // Тоже для алгоритма удаления ниже
                        // deleteList.push(i);
                    }
                }
            }, this);

            // Можно тоже пока оставить, разберусь, что там не так
            // Алгоритм позволяет удалять элементы не во время итерации (не позволяет)
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

            /* Будем искать от предыдущей найденной точки следующую
            и добавлять все, что до нее, в массив unshift'ом.
            В конце добавим сам event*/
            let eventList = [];
            // let prevDotIndex = 0;
            let lastDotIndex = event.indexOf('.');
            while (lastDotIndex !== -1) {
                eventList.unshift(event.slice(0, lastDotIndex));
                // prevDotIndex = lastDotIndex;
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
            console.info(event, context, handler, times);
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

            /* Кажется, можно сделать чуть эффективнее, пока не уверен,
            несколько алгоритов надо доработать или выкинуть, пока оставлю рабочий*/
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

            // let lghnt = this.subscriptions.length;
            // let divisior = lghnt % frequency;
            // divisior = (lghnt - divisior) / frequency;
            // divisior*frequency <- подумать насчет него (кратные frequency от 0 до length)

            // добавить нормальный счетчик
            // for (let j = 1; j <= divisior; ++j) {
            //     for (let i = 1; i < frequency; ++i) {
            //     }
            //     handler.call(context);
            // }

            // вынести аккуратно this on
            // for (let i = 0; i < this.subscriptions.length; ++i) {
            //     this.on(event, context, function () {
            //         if (i % frequency === 0) {
            //             handler.call(context);
            //         }
            //     });
            // }
        }
    };
}
