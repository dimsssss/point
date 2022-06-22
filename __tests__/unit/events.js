describe('point 도메인 테스트입니다', () => {
    const {calculateReviewPoints, isFirstReview} = require('../../domain/points')
    it.each([
        [
            [
                {
                    content: '좋아요',
                    attachedPhotoIds: ["e4d1a64e-a531-46de-88d0-ff0ed70c0bb8", "afb0cef2-851d-4a50-bb07-9cc15cbdc332"]
                },
                false
            ],
            3
        ],
        [
            [
                {
                    content: '좋아요',
                    attachedPhotoIds: ["e4d1a64e-a531-46de-88d0-ff0ed70c0bb8", "afb0cef2-851d-4a50-bb07-9cc15cbdc332"]
                },
                true
            ],
            2
        ],
        [
            [
                {
                    content: '',
                    attachedPhotoIds: ["e4d1a64e-a531-46de-88d0-ff0ed70c0bb8", "afb0cef2-851d-4a50-bb07-9cc15cbdc332"]
                },
                false
            ],
            2
        ],
        [
            [
                {
                    content: '좋아요!',
                    attachedPhotoIds: []
                },
                false
            ],
            2
        ],
        [
            [
                {
                    content: '',
                    attachedPhotoIds: ["e4d1a64e-a531-46de-88d0-ff0ed70c0bb8", "afb0cef2-851d-4a50-bb07-9cc15cbdc332"]
                },
                true
            ],
            1
        ],
        [
            [
                {
                    content: '좋아요',
                    attachedPhotoIds: []
                },
                true
            ],
            1
        ],
        [
            [
                {
                    content: '',
                    attachedPhotoIds: []
                },
                false
            ],
            1
        ],
        [
            [
                {
                    content: '',
                    attachedPhotoIds: []
                },
                true
            ],
            0
        ]
    ])('콘텐츠, 사진, 보너스 점수를 받은 리뷰의 존재에 따라 0 ~ 3점의 점수를 반환한다', (input, result) => {
        const [data, existBonusReview] = input;
        expect(calculateReviewPoints(data, existBonusReview)).toEqual(result);
    });
    it.each([
        [
            [
                {
                    type: "REVIEW",
                    action: "DELETE",
                    reviewId: "240a0658-dc5f-4878-9381-ebb7b2667772",
                    content: "좋아요!",
                    attachedPhotoIds: ["e4d1a64e-a531-46de-88d0-ff0ed70c0bb8", "afb0cef2-851d-4a50-bb07-9cc15cbdc332"],
                    userId: "3ede0ef2-92b7-4817-a5f3-0c575361f745",
                    placeId: "2e4baf1c-5acb-4efb-a1af-eddada31b00f"
                },
                {
                    hasBonus: true,
                    reviewId: "240a0658-dc5f-4878-9381-ebb7b2667772"
                }
            ],
            true
        ],
    ])('point객체와 요청 데이터로 첫번째 리뷰인지 확인한다', (input, result) => {
        const [data, placeReviewPoint] = input;
        expect(isFirstReview(data, placeReviewPoint)).toEqual(result);
    })
})
