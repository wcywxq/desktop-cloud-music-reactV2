### 项目简介

采用 [网易云音乐 Node.js 接口](https://github.com/Binaryify/NeteaseCloudMusicApi) 
  
### 技术栈

选取 `react-hooks` + `typescript` 进行前端开发，脚手架选择 `create-react-app --typescript`
  
### 项目运行

* `NPM`
  
  1. 下载项目：`git clone https://github.com/conjuringwxq/cloud-music-typescript.git`
   
  2. 安装依赖：`cd cloud-music-typescript &&  npm install` 或 `cd cloud-music-typescript && yarn`
   
  3. 项目运行：`npm start` 或 `yarn start`

  4. 打包：`npm run build` 或 `yarn build`

* `docker`

  1. 下载项目：`git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git`
   
  2. 下载项目：`git clone https://github.com/conjuringwxq/cloud-music-typescript.git`

  3. 安装 `docker`

  4. 运行服务端： 
   
    * `cd NeteaseCloudMusicApi && docker build -t node-server .`

    * `docker run -d -p 3000:3000 node-server`
  
  5. 运行客户端

    * `cd cloud-music-typescript && yarn && yarn build`
   
    * `docker-compose up -d`
