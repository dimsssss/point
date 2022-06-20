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

// const data = [
//     {
//         type: "REVIEW",
//         action: "ADD",
//         userId: "69e41b58-685a-4e12-9c67-b2671ea75564",
//         placeId: "325968fb-7d2f-4fa0-a546-94accf7b6ffe",
//         attachedPhotoIds: [
//             "82149810-1621-468c-9c4c-a8ba6ca1cfdb"
//         ],
//         content: '나이스',
//         reviewId: "6bc4c29e-7832-4070-bdd4-efa3e04357b9"
//     },
//     {
//         type: "REVIEW",
//         action: "ADD",
//         content: "굿",
//         userId: "872e18f7-b6e4-4714-abff-72cebd7c76d1",
//         placeId: "a8a3f646-fc48-4944-880e-ad10b92c3e24",
//         attachedPhotoIds: [
//             "1c4d1930-1765-46c4-92ae-cc0bccfa15fe"
//         ],
//         reviewId: "e515ece7-a3ce-478d-bc3a-fa363e2e36ce"
//     },
//     {
//         type: "REVIEW",
//         action: "ADD",
//         content: "첫리뷰",
//         userId: "a1f99025-28b5-42f8-a284-f4aedc79d785",
//         placeId: "e88c6f49-894e-45df-b24a-fb6e2ada2546",
//         attachedPhotoIds: [
//             "7d5cdf33-d912-47e3-9fc0-b9ac276ed8cf"
//         ],
//         reviewId: "1ad93103-ebe5-4c43-b952-7419d00c41ef"
//     }
// ]