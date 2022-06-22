const db = require('../../models/index');
const {addNewPointForWritingReview, modifyPointByEditingReview, deletePointForDeleteReview} = require('../../services/points');


const addPointTest = async function (data) {
    await addNewPointForWritingReview(db, data);
    const result = await db.points.findAll({
        where: {
            userId: data.userId,
            placeId: data.placeId,
            reviewId: data.reviewId
        }, plain: true
    });
    const historyResult = await db.pointsHistory.findOne({where:{userId: data.userId, reviewId: data.reviewId}, plain: true});

    expect(result.userId).toEqual(data.userId);
    expect(result.placeId).toEqual(data.placeId);
    expect(result.reviewId).toEqual(data.reviewId);

    expect(historyResult.userId).toEqual(data.userId);
    expect(historyResult.reviewId).toEqual(data.reviewId);
}


describe('points 통합테스트입니다.', () => {
    afterEach(async () => {
        await db.points.destroy({where: {}});
        await db.pointsHistory.destroy({where: {}});
    })

    const firstEvent = {
        type: "REVIEW",
        action: "ADD",
        content: "첫리뷰",
        userId: "a1f99025-28b5-42f8-a284-f4aedc79d785",
        placeId: "e88c6f49-894e-45df-b24a-fb6e2ada2546",
        attachedPhotoIds: [
            "7d5cdf33-d912-47e3-9fc0-b9ac276ed8cf"
        ],
        reviewId: "1ad93103-ebe5-4c43-b952-7419d00c41ef"
    }

    const secondEvent = {
        type: "REVIEW",
        action: "ADD",
        content: "굿",
        userId: "a1f99025-28b5-42f8-a284-f4aedc79d785",
        placeId: "a8a3f646-fc48-4944-880e-ad10b92c3e24",
        attachedPhotoIds: [
            "1c4d1930-1765-46c4-92ae-cc0bccfa15fe"
        ],
        reviewId: "e515ece7-a3ce-478d-bc3a-fa363e2e36ce"
    }

    it('리뷰를 작성하였을 때 보상 포인트를 얻는다', addPointTest.bind(this, firstEvent));

    it('사용자들은 하나의 장소에 하나의 리뷰만 가능하다', async function () {
        const {duplicatedPointException} = require('../../exceptions/index')

        await addNewPointForWritingReview(db, firstEvent);
        expect(async () => {
            await addNewPointForWritingReview(db, firstEvent)
        }).rejects.toThrow(new duplicatedPointException());
    });

    it('유저가 다른 장소로 리뷰를 남길 수 있다', async function () {
        const {getUserPoint} = require('../../services/points');
        // 생성된 포인트 2개 확인
        await addPointTest(firstEvent);
        await addPointTest(secondEvent);
        // 포인트 합산 결과 확인
        const pointInformation = await getUserPoint(db, firstEvent);
        expect(pointInformation.userId).toEqual(firstEvent.userId);
        expect(pointInformation.totalPoint).toEqual('6')
    });

    it('보상 포인트는 변경될 수 있다', async function () {
        await addPointTest(firstEvent);
        const modifiedPhotoIdsEvent = {...firstEvent};
        modifiedPhotoIdsEvent.attachedPhotoIds = [];

        const prevPoint = await db.points.findOne({where: {userId: firstEvent.userId, placeId: firstEvent.placeId, reviewId: firstEvent.reviewId}, plain: true});

        await modifyPointByEditingReview(db, modifiedPhotoIdsEvent);

        const modifiedPoint = await db.points.findOne({where: {userId: firstEvent.userId, placeId: firstEvent.placeId, reviewId: firstEvent.reviewId}, plain: true});

        expect(prevPoint.point).not.toEqual(modifiedPoint.point);

    });

    it('리뷰를 수정하고 포인트의 변동이 없다면 히스토리는 쌓이지 않는다', async function () {
        await addPointTest(firstEvent);

        const modEvent = {...firstEvent};
        modEvent.action = 'MOD';

        await modifyPointByEditingReview(db, modEvent);

        const pointHistory = await db.pointsHistory.findOne({where: {reviewId: modEvent.reviewId, userId: modEvent.userId, action: modEvent.action}, plain: true});

        expect(pointHistory).toEqual(null);
    });

    it('존재하지 않는 포인트를 회수할 때 에러를 발생시킨다.', async function () {
        const {notFoundPointException} = require('../../exceptions/index')
        expect(async () => {
            await deletePointForDeleteReview(db, firstEvent);
        }).rejects.toThrow(new notFoundPointException());
    });

    it('리뷰를 삭제하면 보상 포인트를 회수할 수 있다.', async function () {
        await addPointTest(firstEvent);

        const point = await db.sequelize.transaction(async (t) => {
            return await db.points.findTotalPointByUserId(firstEvent.userId, t);
        });

        expect(point.totalPoint).toEqual('3');

        await deletePointForDeleteReview(db, firstEvent);

        const prevPoint = await db.sequelize.transaction(async (t) => {
            return await db.points.findPointByReviewId(firstEvent.reviewId, t);
        });

        expect(prevPoint).toEqual(null);
    });
});
