create table points
(
    pointId   char(36) collate utf8mb4_bin not null
        primary key,
    placeId   char(36) collate utf8mb4_bin not null,
    reviewId  char(36) collate utf8mb4_bin not null,
    userId    char(36) collate utf8mb4_bin not null,
    hasBonus  tinyint                      not null,
    point     int                          not null,
    createdAt datetime                     not null,
    updatedAt datetime                     not null
)
    collate = utf8mb4_general_ci;

create index points_place_id_has_bonus
    on points (placeId, hasBonus);

create index points_review_id
    on points (reviewId);

create index points_user_id
    on points (userId);


create table points_history
(
    historyId char(36) collate utf8mb4_bin       not null
        primary key,
    userId    char(36) collate utf8mb4_bin       not null,
    reviewId  char(36) collate utf8mb4_bin       not null,
    action    enum ('ADD', 'MOD', 'DELETE')      not null,
    point     int                                not null,
    createdAt datetime default CURRENT_TIMESTAMP not null,
    updatedAt datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP
)
    collate = utf8mb4_general_ci;

