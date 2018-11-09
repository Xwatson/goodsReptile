module.exports = app => {
    app.beforeStart(async () => {
        app.runSchedule('update_price');
    });
};