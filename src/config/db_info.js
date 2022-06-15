module.exports = (function () {
    return {
        local: {
            host: 'market.c8esew0vd7rg.ap-northeast-2.rds.amazonaws.com',
            port: '3306',
            user: 'admin',
            password: 'rladbwjd1!',
            database: 'market'        },
        real: {
            host: '',
            port: '',
            user: '',            password: '',
            database: ''        },
        staging: {
            host: '',
            port: '', 
            user: '',
            password: '',
            database: ''        },
        dev: {
            host: '',
            port: '', 
            user: '',
            password: '',
            database: ''
        }    }})();
