<p align="center">
    <h1 align="center">
        point
    </h1>
    <p align="center">point์ ๋ํ API<a href="https://github.com/dimsssss/point"></a>.</p>
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

## ๐ ์ค์น

### 1. ๋ฐ์ดํฐ๋ฒ ์ด์ค ์ค์น
```shell
docker run --name=point -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_DATABASE=point -p 6603:3306 -d mysql:latest
```

### 2. ์น ์๋ฒ ์ค์น

```shell
git clone https://github.com/dimsssss/point

cd point

npm install
```

### 3. ๋ฐ์ดํฐ๋ฒ ์ด์ค ๋ง์ด๊ทธ๋ ์ด์
```shell
# migration
npx sequelize-cli db:migrate
```

## ๐ API Document
[postman](https://documenter.getpostman.com/view/6055091/UzBpKRK1)

## ๐งพ ์คํ
```shell
npm run dev
```
