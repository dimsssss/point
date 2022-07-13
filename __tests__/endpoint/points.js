const app = require('../../app');
const request = require('supertest');
const db = require('../../models/initializer')();
const {v4:uuid} = require('uuid')

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

describe('points endpoint 테스트입니다', function () {

    afterEach(async () => {
        await db.points.destroy({where: {}});
        await db.pointsHistory.destroy({where: {}});
    })

    it('사용자의 포인트 정보가 없을 시 기본값 반환', async function () {
        const userId = uuid();
        const response = await request(app).get(`/v1/points/${userId}`);

        expect(response.status).toEqual(200);
        expect(response.body.userId).toEqual(userId);
        expect(response.body.totalPoint).toEqual(0);
    });

    it('사용자의 포인트를 정보를 조회한다(userId, totalPoint)', async function () {
        const fakeData = createFakeData();
        // given
        const {addNewPointForWritingReview} = require('../../services/points')
        await addNewPointForWritingReview(db, fakeData);

        //when
        const result = await request(app).get(`/v1/points/${fakeData.userId}`);

        expect(result.status).toEqual(200);
        expect(result.body.userId).toEqual(fakeData.userId);
        expect(result.body.totalPoint).toEqual('3');
    });
})
