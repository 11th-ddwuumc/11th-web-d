package com.umc.umcine_be.dto;

public record MovieRecordResponse(
        RatingResponse rating,
        FavoriteResponse favorite
) {
}
