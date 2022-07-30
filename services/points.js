const {calculateReviewPoints, isFirstReview} = require('../domain/points');
const {duplicatedPointException, notFoundPointException} = require('../exceptions/index');


const getUserPoint = async (transaction, userId, points) => {
    try {
        return await transaction(async (t) => {
            const userPoint = await points.findTotalPointByUserId(userId, t);

            if (userPoint === null) {
                throw new notFoundPointException();
            }
            
            userPoint.init(userId)
            
            return userPoint;
        });
    } catch (e) {
        throw e;
    }
}

const addNewPointForWritingReview = async (db, data) => {
    try {
        return await db.sequelize.transaction(async (t) => {
            const points = db.points;
            const pointsHistory = db.pointsHistory;
            // 1. 리뷰 아이디로 받은 포인트가 있는지 확인(사용자는 한 장소에 하나의 리뷰만 가능)
            const reviewPoint = await points.findDuplicatedPoint(data, t);
            if (reviewPoint !== null) {
                throw new duplicatedPointException();
            }
            // 2. 첫번째 리뷰인지 확인 (리뷰 등록시 첫 등록일 때 보너스 점수 획득)
            const point = await points.findPointThatReceivedPlaceBonus(data.placeId, t);
            // 3. 포인트 계산
            const hasBonus = isFirstReview(data, point);
            const calculatedPoint = calculateReviewPoints(data, !hasBonus);
            const newPoint = points.mapFrom(data, calculatedPoint, hasBonus);
            const newHistory = pointsHistory.mapFrom(data, calculatedPoint);
            // 4. point history, point 등록
            await pointsHistory.addUserPointHistory(newHistory, t);
            return await points.addUserPoint(newPoint, t);
        })
    } catch (e) {
        throw e;
    }
}

const modifyPointByEditingReview = async (db, data) => {
    try {
        return await db.sequelize.transaction(async (t) => {
            const points = db.points;
            const pointsHistory = db.pointsHistory;
            const {reviewId} = data;
            // 2. 수정하려는 리뷰 포인트 가져오기
            const reviewPoint = await points.findPointByReviewId(reviewId, t);

            if (reviewPoint === null) {
                throw new notFoundPointException();
            }
            // 3. 포인트 계산
            // 문제점 : 외부 객체의 값을 직접 수정
            const calculatedPoint = calculateReviewPoints(data, !reviewPoint.hasBonus);
            // 4. 계산한 포인트와 저장된 포인트 비교
            // 문제점 : 외부 객체의 값을 직접 비교 
            if (calculatedPoint !== reviewPoint.point) {
                // 5. 포인트 비교시 차이가 있을 때 point_history 저장, 수정된 review point 저장
                // 문제점 : 외부 객체의 값을 직접 비교
                const newPoint = points.mapFrom(reviewPoint, calculatedPoint, reviewPoint.hasBonus);
                const newHistory = pointsHistory.mapFrom(data, calculatedPoint)
                await pointsHistory.addUserPointHistory(newHistory, t);
                await points.updatePoint(newPoint, t);
            }
        });
    } catch (e) {
        throw e;
    }
}

const deletePointForDeleteReview = async (db, data) => {
    try {
        return await db.sequelize.transaction(async (t) => {
            // 1. 삭제하려는 review point 조회
            // 문제점 : 외부 객체의 값을 직접 비교
            const points = db.points;
            // 문제점 : 외부 객체의 값을 직접 비교
            const pointsHistory = db.pointsHistory;
            const reviewPoint = await points.findPointByReviewId(data.reviewId, t);

            if (reviewPoint === null) {
                throw new notFoundPointException();
            }
            // 문제점 : 외부 객체의 값을 직접 비교
            const newHistory = pointsHistory.mapFrom(data, reviewPoint.point);
            await pointsHistory.addUserPointHistory(newHistory, t);
            await points.deletePoint(data, t);
        })
    } catch (e) {
        throw e;
    }
}

module.exports = {
    addNewPointForWritingReview,
    modifyPointByEditingReview,
    deletePointForDeleteReview,
    getUserPoint
}
