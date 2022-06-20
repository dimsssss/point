const calculateReviewPoints = (data, areReviewThatScorePlaces) => {
    const hasContent = data.content.length > 0;
    const hasPhotos = data.attachedPhotoIds.length > 0;

    if (hasContent && hasPhotos && !areReviewThatScorePlaces) {
        return 3;
    } else if (hasContent && hasPhotos) {
        return 2;
    } else if (hasContent && !areReviewThatScorePlaces) {
        return 2;
    } else if(hasPhotos && !areReviewThatScorePlaces) {
        return 2;
    } else if (hasContent || hasPhotos || !areReviewThatScorePlaces) {
        return 1;
    }
    return 0;
}

const isFirstReview = (data, placeReview) => {
    // 작성시 장소에 대한 리뷰가 없을 때
    if (placeReview === null) {
        return true;
    }
    // 현재 리뷰가 첫번째 리뷰일 때
    if (placeReview.hasBonus && placeReview.reviewId === data.reviewId) {
        return true;
    }
    return false;
}

module.exports = {
    calculateReviewPoints,
    isFirstReview
}
