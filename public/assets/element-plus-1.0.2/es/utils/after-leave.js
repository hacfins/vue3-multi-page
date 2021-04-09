function afterLeave (instance, callback, speed = 300) {
    if (!instance || !callback)
        throw new Error('instance & callback is required');
    let called = false;
    const afterLeaveCallback = function (...args) {
        if (called)
            return;
        called = true;
        if (callback) {
            callback(args);
        }
    };
    setTimeout(() => {
        afterLeaveCallback();
    }, speed + 100);
}

export default afterLeave;
