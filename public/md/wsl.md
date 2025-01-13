```ts
在Windows WSL2中使用图形界面（GUI）


前言
​ 微软正在计划让WSL2支持基于RDP的GUI[1]，虽然这一特性目前还不可用，但我们还是能通过别的一些手段来达到目的。
准备环境
    • Windows 10 （版本：2004）
    • WSL2（Ubuntu 20.04 LTS）（如何安装WSL2?）
安装工具
    1. 先把apt update & upgrade
    1	sudo apt update && sudo apt -y upgrade
    2. 安装XRDP[2]（远程连接协议）、Xfce[3]（轻量级桌面环境，安装时会提示选择gdm3或lightdm，我选了gdm3）
    1	sudo apt-get purge xrdp
    2	sudo apt install -y xrdp
    3	sudo apt install -y xfce4
    4	sudo apt install -y xfce4-goodies
    • （非必须）更改XRDP的一些配置：增加bpp(bits per pixel)，让远程连接质量更好
    1	sudo sed -i 's/max_bpp=32/#max_bpp=32\nmax_bpp=128/g' /etc/xrdp/xrdp.ini
    2	sudo sed -i 's/xserverbpp=24/#xserverbpp=24\nxserverbpp=128/g' /etc/xrdp/xrdp.ini
    3	echo xfce4-session > ~/.xsession
    3. 接下来更改XRDP的启动脚本，让它同时启动Xfce
    1	sudo vim /etc/xrdp/startwm.sh
​ 把文件的最后几行改成这样：
1	# test -x /etc/X11/Xsession && exec /etc/X11/Xsession
2	# exec /bin/sh /etc/X11/Xsession
3	# xfce
4	startxfce4

最后，启动XDRP
    1	sudo /etc/init.d/xrdp start
开始使用
使用Windows的远程桌面连接，通过WSL的IP地址:3389，3389为默认端口，可以在配置/etc/xrdp/xrdp.ini中更改。

用WSL的用户名和密码登录进系统

完成，最后成品：

后言
​ 此文章所使用的方法是通过一些手段来让WSL2支持GUI，所以在使用的过程中略有繁琐和有一些不太完美的地方。相信之后微软推出的WSL2 GUI特性将会很好地支持这方面的使用。想要持续关注这一方面的信息，
可以到微软的开发者博客上关注这方面的内容。



修改xrdp默认端口
由于xrdp安装好后默认配置使用的是和Windows远程桌面相同的3389 端口,为了防止和Windows系统远程桌面冲突,建议修改成其他的端口
$ sudo vim /etc/xrdp/xrdp.ini
# 修改下面这一行,将默认的3389改成其他端口即可
port=3390


#自定义  分辨率
cvt 1920 1080 

#查看系统显示器名称
xrandr

#设置分辨率
xrandr --newmode "1920x1080_60.00" 173.00 1920 2048 2248 2576 1080 1083 1088 1120 -hsync +vsync
xrandr --addmode Virtual1 "1920x1080_60.00"   #Virtual1是显示器名称

#然后系统设置，显示。 里面就有1920 1080选项了


3. 官方第二种安装方法——命令行安装
如果你是热爱 Linux，你可能想亲自设置 PPA。 以下命令行说明可粘贴到终端窗口中以安装签名密钥、sources.lst 文件和安装。
Debian/Ubuntu的安装命令:
## Setup
curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge-dev.list'
sudo rm microsoft.gpg
## Install
sudo apt update
sudo apt install microsoft-edge-dev
其他平台安装命令，点击获取说明，然后会跳出一个弹窗，同意就会出现不同平台的安装命令行，这次主要讲Ubuntu的安装。


直接使用X server
操作过程：
1 安装X-Windows
可供选择安装的X-Windows有多个：VcXsrv Windows X Server、Xming、Cygwin X Server，本文选择第一个，因为比较容易，而且据说稳定；

软件首页：https://sourceforge.net/projects/vcxsrv/
下载地址：https://ncu.dl.sourceforge.net/project/vcxsrv/vcxsrv/1.19.3.3/vcxsrv-64.1.19.3.3.installer.exe

下载软件，windows下安装好，启动Launcher，首次启动自动进入界面设置后，按下图设置：

选择：“one large window”，Display number设置成0，其它默认即可：
这里写图片描述

2 Ubuntu安装桌面环境
打开Bash，安装ubuntu-desktop, unity, and ccsm

注意：没有特别说明的情况下，以下命令均需要root权限；原因可参考回复内的安装案例！

sudo apt-get install ubuntu-desktop unity compizconfig-settings-manager
1
需要提醒的是，咱们这样折腾，是要玩一票大的，所以，请有点*数，硬盘啊，网络啊，啥啥啥的，都脑门清醒点：下载650M，解压后近2.4G
这里写图片描述

3 配置compiz窗口管理器
启动之前安装的X-Windows，在Bash中执行如下命令：

export  DISPLAY=localhost:0
ccsm
1
2
这里写图片描述
在X-windows中，即会弹出ccsm的配置界面，勾选您需要的Desktop组件（只需要勾选Desktop中的Ubuntu Unity Plugin即可，其它默认就好）：
这里写图片描述

这里写图片描述
关闭ccsm，启动compiz，让其加载Unity-desktop：
这里写图片描述

怎么样？漂亮的Ubuntu桌面出现了吧？
祝大家都能折腾成功！
```