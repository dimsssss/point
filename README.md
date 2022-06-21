<p align="center">
    <h1 align="center">
        point
    </h1>
    <p align="center">point에 대한 API<a href="https://github.com/dimsssss/point"></a>.</p>
</p>

<p align="center">
    <a href="">
        <img alt="license" src="https://img.shields.io/github/license/dimsssss/toy-intergration-test">
    </a>
    <a href="">
        <img alt="npm" src="https://img.shields.io/node/v-lts/npm?label=npm&logo=npm">
    </a>
    <a href="https://expressjs.com/">
        <img alt="express" src="https://img.shields.io/node/v-lts/express?label=express&logo=express">
    </a>
    <a href="https://jestjs.io/">
        <img alt="jest" src="https://img.shields.io/node/v-lts/express?label=jest&logo=jest">
    </a>
    <a href="https://sequelize.org/">
        <img alt="sequelize" src="https://img.shields.io/node/v-lts/sequelize?label=sequelize&logo=sequelize">
    </a>
    <a href="https://app.travis-ci.com/github/dimsssss/point">
        <img alt="travis" src="https://app.travis-ci.com/dimsssss/point.svg?branch=main">
    </a>
</p>

## 🏗 설치

### 1. 데이터베이스 설치
```shell
docker run --name=point -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_DATABASE=point -p 6603:3306 -d mysql:latest
```

### 2. 웹 서버 설치

```shell
git clone https://github.com/dimsssss/point

cd point

npm install
```

### 3. 데이터베이스 마이그레이션
```shell
# migration
npx sequelize-cli db:migrate
```

## 🖼 ERD
coming soon

## 🌐 API Document
coming soon

## 🧾 실행
```shell
npm run dev
```
