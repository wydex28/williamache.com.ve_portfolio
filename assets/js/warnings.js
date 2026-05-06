console.warn = (function(oldWarn) {
    return function(msg) {
        if (typeof msg === 'string' && (msg.includes('cdn.tailwindcss.com') || msg.includes('UNSUPPORTED_OS'))) {
            return;
        }
        oldWarn.apply(console, arguments);
    };
})(console.warn);
