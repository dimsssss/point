const {isUUID} = require("validator");

describe('장소를 등록하는 endpoint 테스트', () => {
    const request = require('supertest');
    const app = require('../../app');
    const db = require('../../models/index');

    app.set('db', db);

    it('요청한 정보로 장소 정보가 저장된다.(placeId가 생성되어야 한다) ', async function () {
        const body = {
            name: "망리단길",
            isBonus: 1
        }
        const response = await request(app).post('/places').send(body).expect(201);
        const result = response.body;

        expect(isUUID(result.placeId)).toBeTruthy();
        expect(result.isBonus).toEqual(body.isBonus);
        expect(result.name).toEqual(body.name);
    });
});