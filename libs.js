export const pause = async ms =>
    new Promise(resolve =>
        setTimeout(resolve, ms));

export const handle = (fn, handler) => fn.perform = handler;

export const withEffect = fn => {
    const handlers = [];

    const wrappedFn = (...args) => {
        return fn(...args);
    };

    wrappedFn.perform = effectName => {
        if (handlers.length) {
            return handlers[handlers.length-1](effectName);
        }

        throw new Error('Handler is not set');
    };
    wrappedFn.end = () => handlers.pop();
    wrappedFn.handle = fn => {
        if (typeof fn !== 'function') {
            throw new Error('Function expected');
        }

        handlers.push(fn);
    };

    return wrappedFn;
};
