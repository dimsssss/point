module.exports = class DuplicatedPointException extends Error {
    constructor() {
        super();
        this.message = '이미 포인트를 받은 리뷰입니다.';
        this.statusCode = 500;
    }
}
