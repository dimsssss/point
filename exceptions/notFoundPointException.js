module.exports = class notFoundPointException extends Error {
    constructor() {
        super();
        this.message = '포인트가 존재하지 않습니다';
        this.statusCode = 500;
    }
}
