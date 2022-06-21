const app = require('../../app');
const request = require('supertest');
const db = require('../../models/index');
const {v4:uuid} = require('uuid')

app.set('db', db);

describe('points endpoint 테스트입니다', function () {
    it('사용자의 포인트가 정보가 없을 시 null 값 반환', async function () {
        const userId = uuid();
        const response = await request(app).get(`/v1/points/${userId}`);

        expect(response.status).toEqual(200);
        expect(response.body.userId).toEqual(null);
        expect(response.body.totalPoint).toEqual(null);
    });

    it('사용자의 포인트를 정보를 조회한다(userId, totalPoint)', async function () {
        const data = {
            type: "REVIEW",
            action: "ADD",
            content: "굿",
            userId: "3ede0ef2-92b7-4817-a5f3-0c575361f745",
            placeId: "a8a3f646-fc48-4944-880e-ad10b92c3e24",
            attachedPhotoIds: [
                "1c4d1930-1765-46c4-92ae-cc0bccfa15fe"
            ],
            reviewId: "1ad93103-ebe5-4c43-b952-7419d00c41ef"
        }
        // given
        const {addNewPointForWritingReview} = require('../../services/points')
        await addNewPointForWritingReview(db, data);

        //when
        const result = await request(app).get(`/v1/points/${data.userId}`);

        expect(result.status).toEqual(200);
        expect(result.body.userId).toEqual(data.userId);
        expect(result.body.totalPoint).toEqual('3');
    });
})