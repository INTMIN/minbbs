## 简介
### 本说明文档用于介绍 v2ray-agent 仓库中的 Docker Reality 独立脚本用法。
```
    • 中文主版本脚本：shell/docker_reality.sh
    • 英文镜像脚本：shell/docker_reality_en.sh
当前脚本定位为：
    • 面向 Xray 普通 Reality / 无域名场景
    • 通过 Docker 运行 ghcr.io/xtls/xray-core:26.5.9
    • 支持三种安装模式：
        1. Reality Vision
        2. Reality XHTTP
        3. 全部安装（Vision + XHTTP）
运行前提
使用前请确认：
    1. 运行环境为 Linux
    2. 以 root 或 sudo 身份执行脚本
    3. 主机已安装 Docker，或允许脚本按提示使用 Docker 官方脚本安装
脚本默认会先检查 Docker：
    • 如果未安装，会提示是否使用官方安装脚本安装
    • 如果 Docker 已安装但守护进程未启动，会提示先启动 Docker
默认数据目录
脚本默认将运行数据写入：
/etc/v2ray-agent/docker/
主要文件包括：
    • config.json：生成的 Xray 配置
    • client-summary.txt：协议模式、端口、path 与账号摘要
如果你只是做验证或测试，可以通过 --data-dir 指向临时目录，例如：
/tmp/v2ray-agent/docker/
快捷方式与脚本自安装
```
直接执行：
wget -P /root -N --no-check-certificate "https://raw.githubusercontent.com/INTMIN/v2ray-agent/master/shell/docker_reality.sh" && chmod 700 /root/docker_reality.sh && /root/docker_reality.sh
```
如果脚本是通过 wget 下载到临时目录后直接执行，脚本会尽量参考主脚本逻辑：
    1. 将自身迁移到 /etc/v2ray-agent/docker_reality.sh
    2. 创建快捷方式 vasmad
    3. 打印后续启动方式
后续可直接执行：
vasmad
交互式安装流程
如果首次运行且目录下还没有现有配置，脚本会先让你选择安装模式：
    1. Reality Vision
    2. Reality XHTTP
    3. 全部安装
公共输入项
所有模式都会询问：
    • Reality 目标域名 / serverName
    • 私钥
    • UUID
    • 邮箱基础名
如果某些字段直接回车，脚本会按既定规则自动生成或自动推导，例如：
    • serverName：从内置 Reality 目标域名列表随机选择
    • privateKey：自动生成
    • uuid：自动生成
    • email：从 UUID 前缀自动推导
Vision 模式
会额外询问：
    • Vision 端口
XHTTP 模式
会额外询问：
    • XHTTP 端口
    • XHTTP path 基础值
最终 XHTTP path 会按 install.sh 的规则渲染为：
/<path>xHTTP
例如输入：
alone
最终写入配置的 path 为：
/alonexHTTP
全部安装模式
会同时安装：
    • Reality Vision
    • Reality XHTTP
并且要求分别提供：
    • Vision 端口
    • XHTTP 端口
    • 一次 XHTTP path 基础值（仅供 XHTTP 使用）
    注意：Vision 与 XHTTP 在全部安装模式下使用 不同端口，这与 install.sh 的行为保持一致。
已安装后的菜单行为
如果再次运行脚本，且已检测到：
    • /etc/v2ray-agent/docker/config.json
或：
    • v2ray-agent-docker 容器存在
则交互模式不会直接重建，而是先显示菜单：
    1. 查看账号
    2. 重新安装
    3. 启动/重建容器
    4. 卸载
    5. 退出
其中：
    • 查看账号：按当前已安装协议显示账号、明文信息和二维码链接，然后退出脚本
    • 重新安装：重新选择安装模式并覆盖生成新的配置
    • 启动/重建容器：直接复用已有配置启动或重建 v2ray-agent-docker
    • 卸载：删除 v2ray-agent-docker 容器、${dataDir} 中的数据目录、vasmad 快捷方式，以及安装到 /etc/v2ray-agent/ 下的脚本本体
查看账号的展示规则
脚本会根据当前安装模式显示不同内容：
    • 仅安装 Vision：只显示 Vision 账号块
    • 仅安装 XHTTP：只显示 XHTTP 账号块
    • 全部安装：同时显示 Vision 与 XHTTP 两套账号块
每个协议块都会展示：
    • 通用格式链接
    • 格式化明文
    • 二维码链接
容器行为说明
脚本在启动容器前会做这些事：
    1. 检查 Docker 是否可用
    2. 校验 config.json
    3. 若已有 v2ray-agent-docker，则先删除
    4. 使用固定镜像启动新容器
    5. 按安装模式发布对应端口
镜像固定为：
ghcr.io/xtls/xray-core:26.5.9

常见排查
1. 提示不是 Linux 环境
脚本只支持 Linux 主机。
如果你在 macOS 本地运行，会被脚本直接拒绝，这是预期行为。
2. Docker 未安装
脚本会提示是否使用官方脚本安装 Docker。
如果你拒绝安装，脚本会直接退出。
3. Docker 已安装但未启动
请先启动 Docker 守护进程后再重试。
4. 配置校验失败
如果 config.json 无效，脚本会在启动容器前直接报错退出，不会继续启动容器。
5. 端口被占用
如果 Vision 或 XHTTP 端口被其他程序占用，脚本会拒绝继续。
如果端口是当前 v2ray-agent-docker 旧容器占用，脚本会识别并在重建流程中处理。

```