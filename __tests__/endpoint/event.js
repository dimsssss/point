const app = require('../../app');
const request = require('supertest');
const db = require('../../models/index');

app.set('db', db);

describe('event endpoint 테스트입니다', function () {
    it('새로 포인트가 저장될 때 http status 201을 반환한다', async () => {
        const response = await request(app)
            .post('/events')
            .send({
                type: "REVIEW",
                action: "ADD",
                content: "굿",
                userId: "3ede0ef2-92b7-4817-a5f3-0c575361f745",
                placeId: "a8a3f646-fc48-4944-880e-ad10b92c3e24",
                attachedPhotoIds: [
                    "1c4d1930-1765-46c4-92ae-cc0bccfa15fe"
                ],
                reviewId: "1ad93103-ebe5-4c43-b952-7419d00c41ef"
            })
        expect(response.status).toEqual(201);
    });

    it('중복된 포인트 생성 시 http status 500을 반환한다', async () => {
        const response = await request(app)
            .post('/events')
            .send({
                type: "REVIEW",
                action: "ADD",
                content: "굿",
                userId: "3ede0ef2-92b7-4817-a5f3-0c575361f745",
                placeId: "a8a3f646-fc48-4944-880e-ad10b92c3e24",
                attachedPhotoIds: [
                    "1c4d1930-1765-46c4-92ae-cc0bccfa15fe"
                ],
                reviewId: "1ad93103-ebe5-4c43-b952-7419d00c41ef"
            })
        expect(response.status).toEqual(500);
    });

    it('포인트가 수정될 경우 http status 200을 반환한다', async () => {
        const response = await request(app)
            .post('/events')
            .send({
                type: "REVIEW",
                action: "MOD",
                content: "굿",
                userId: "3ede0ef2-92b7-4817-a5f3-0c575361f745",
                placeId: "a8a3f646-fc48-4944-880e-ad10b92c3e24",
                attachedPhotoIds: [
                    "1c4d1930-1765-46c4-92ae-cc0bccfa15fe"
                ],
                reviewId: "1ad93103-ebe5-4c43-b952-7419d00c41ef"
            })
        expect(response.status).toEqual(200);
    });

    it('포인트가 삭제될 경우 http status 200을 반환한다', async () => {
        const response = await request(app)
            .post('/events')
            .send({
                type: "REVIEW",
                action: "DELETE",
                content: "굿",
                userId: "3ede0ef2-92b7-4817-a5f3-0c575361f745",
                placeId: "a8a3f646-fc48-4944-880e-ad10b92c3e24",
                attachedPhotoIds: [
                    "1c4d1930-1765-46c4-92ae-cc0bccfa15fe"
                ],
                reviewId: "1ad93103-ebe5-4c43-b952-7419d00c41ef"
            })
        expect(response.status).toEqual(200);
    });
});
