const request = require('supertest');
const db = require('../../models/initializer')();
const {v4:uuid} = require('uuid');
const app = require('../../app');

app.set('db', db);

const createFakeData = () => {
    return {
        type: "REVIEW",
        action: "ADD",
        content: "굿",
        userId: uuid(),
        placeId: uuid(),
        attachedPhotoIds: [
            uuid()
        ],
        reviewId: uuid()
    }
}

describe('event endpoint 테스트입니다', function () {
    it('새로 포인트가 저장될 때 http status 201을 반환한다', async () => {
        const fakeData = createFakeData();

        const response = await request(app)
            .post('/events')
            .send(fakeData);
        expect(response.status).toEqual(201);
    });

    it('중복된 포인트 생성 시 http status 500을 반환한다', async () => {
        const fakeData = createFakeData();

        await request(app)
            .post('/events')
            .send(fakeData);

        const response = await request(app)
            .post('/events')
            .send(fakeData);
        expect(response.status).toEqual(500);
    });

    it('포인트가 수정될 경우 http status 200을 반환한다', async () => {
        const fakeData = createFakeData();

        await request(app)
            .post('/events')
            .send(fakeData);

        fakeData.action = 'MOD'
        fakeData.content = "굿";

        const response = await request(app)
            .post('/events')
            .send(fakeData)
        expect(response.status).toEqual(200);
    });

    it('포인트가 삭제될 경우 http status 200을 반환한다', async () => {
        const fakeData = createFakeData();

        await request(app)
            .post('/events')
            .send(fakeData);

        fakeData.action = 'DELETE';

        const response = await request(app)
            .post('/events')
            .send(fakeData)
        expect(response.status).toEqual(200);
    });
});
