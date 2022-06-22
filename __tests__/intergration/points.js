const db = require('../../models/index');
const {v4:uuid} = require('uuid');
const {addNewPointForWritingReview, modifyPointByEditingReview, deletePointForDeleteReview} = require('../../services/points');

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

describe('points 통합테스트입니다.', () => {
    it('리뷰를 작성하였을 때 보상 포인트를 얻는다', async () => {
        const fakeData = createFakeData();
        await addNewPointForWritingReview(db, fakeData);
        const result = await db.points.findAll({
            where: {
                userId: fakeData.userId,
                placeId: fakeData.placeId,
                reviewId: fakeData.reviewId
            }, plain: true
        });
        const historyResult = await db.pointsHistory.findOne({where:{userId: fakeData.userId, reviewId: fakeData.reviewId}, plain: true});

        expect(result.userId).toEqual(fakeData.userId);
        expect(result.placeId).toEqual(fakeData.placeId);
        expect(result.reviewId).toEqual(fakeData.reviewId);

        expect(historyResult.userId).toEqual(fakeData.userId);
        expect(historyResult.reviewId).toEqual(fakeData.reviewId);
    });

    it('사용자들은 하나의 장소에 하나의 리뷰만 가능하다', async function () {
        const {duplicatedPointException} = require('../../exceptions/index')
        const fakeData = createFakeData();
        await addNewPointForWritingReview(db, fakeData);
        expect(async () => {
            await addNewPointForWritingReview(db, fakeData)
        }).rejects.toThrow(new duplicatedPointException());
    });

    it('유저가 다른 장소로 리뷰를 남길 수 있다', async function () {
        const {getUserPoint} = require('../../services/points');
        // 생성된 포인트 2개 확인
        const oneFakeData = createFakeData();
        const secondFakeData = createFakeData();
        secondFakeData.userId = oneFakeData.userId;
        await addNewPointForWritingReview(db, oneFakeData);
        await addNewPointForWritingReview(db, secondFakeData);
        // 포인트 합산 결과 확인
        const pointInformation = await getUserPoint(db, oneFakeData);
        expect(pointInformation.userId).toEqual(oneFakeData.userId);
        expect(pointInformation.totalPoint).toEqual('6')
    });

    it('보상 포인트는 변경될 수 있다', async function () {
        const fakeData = createFakeData();
        await addNewPointForWritingReview(db, fakeData);
        const prevPoint = await db.points.findOne({where: {userId: fakeData.userId, placeId: fakeData.placeId, reviewId: fakeData.reviewId}, raw: true});

        fakeData.attachedPhotoIds = [];

        await modifyPointByEditingReview(db, fakeData);

        const modifiedPoint = await db.points.findOne({where: {userId: fakeData.userId, placeId: fakeData.placeId, reviewId: fakeData.reviewId}, raw: true});
        expect(prevPoint.point).not.toEqual(modifiedPoint.point);
    });

    it('리뷰를 수정하고 포인트의 변동이 없다면 히스토리는 쌓이지 않는다', async function () {
        const fakeData = createFakeData();
        await addNewPointForWritingReview(db, fakeData);

        const modEvent = {...fakeData};
        modEvent.action = 'MOD';

        await modifyPointByEditingReview(db, modEvent);

        const pointHistory = await db.pointsHistory.findOne({where: {reviewId: modEvent.reviewId, userId: modEvent.userId, action: modEvent.action}, plain: true});

        expect(pointHistory).toEqual(null);
    });

    it('존재하지 않는 포인트를 회수할 때 에러를 발생시킨다.', async function () {
        const {notFoundPointException} = require('../../exceptions/index');
        const fakeData = createFakeData();
        expect(async () => {
            fakeData.action = 'DELETE';
            await deletePointForDeleteReview(db, fakeData);
        }).rejects.toThrow(new notFoundPointException());
    });

    it('리뷰를 삭제하면 보상 포인트를 회수할 수 있다.', async function () {
        const fakeData = createFakeData();
        await addNewPointForWritingReview(db, fakeData);

        const point = await db.sequelize.transaction(async (t) => {
            return await db.points.findTotalPointByUserId(fakeData.userId, t);
        });

        expect(point.totalPoint).toEqual('3');

        fakeData.action = 'DELETE'
        await deletePointForDeleteReview(db, fakeData);

        const prevPoint = await db.sequelize.transaction(async (t) => {
            return await db.points.findPointByReviewId(fakeData.reviewId, t);
        });

        expect(prevPoint).toEqual(null);
    });
});
