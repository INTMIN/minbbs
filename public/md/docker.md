``
docker常用命令整理
``

```ts
拉取容器
docker pull ubuntu:latest 

# 创建并启动一个名为my-ubuntu-container的容器，并进入交互式shell
docker run -it --name my-ubuntu-container ubuntu:latest /bin/bash


bash链接指定ubuntu-container 容器 并使用bash打开
docker exec -it ubuntu-container bash

docker ps 
查看运行的容器


linux源文件
vim /etc/apt/sources.list


这个文件是新的linux下才会有的文件目录，用来定制自定义的源配置，我觉得没啥用，用新的系统就注释掉 一般是ubuntu.source  或者debain.source
/etc/apt/sources.list.d/


docker builder prune
这个可以清除docker缓存

打包docker
docker buildx build ./


docker commit your-container-name your-new-image-name
把本地容器打包到容器镜像

编辑全局配置
 vi ~/.bashrc

立刻生效
source ~/.bashrc



dpkg-reconfigure tzdata 改时区


cat /etc/issue
查看当前系统版本



给容器打tag
docker tag my-ubuntu:latest minaccelerator/my-ubuntu:latest

```