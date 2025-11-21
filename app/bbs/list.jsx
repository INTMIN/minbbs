import { Listbox, ListboxItem } from '@heroui/react';
import { IconWrapper } from "../components/IconWrapper";
import { ItemCounter } from "../components/ItemCounter";
import {
  BugIcon,
  PullRequestIcon,
  ChatIcon,
  PlayCircleIcon,
  LayoutIcon,
  TagIcon,
  UsersIcon,
  BookIcon,
  WatchersIcon,
} from "../components/Icon/MyIcon";
import { useNavigate } from "react-router";

export default function List() {
  let navigate = useNavigate();
  const goUrl = (name) => {
    navigate(`/bbs/${name}`);
  };
  return (
    <div className="w-full px-[20%] z--1 bg-transparent mt-10">
      <Listbox
        aria-label="User Menu"
        onAction={(key) => goUrl(key)}
        className=" p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible shadow-small rounded-medium"
        itemClasses={{
          base: "bbsDiv px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
        }}
      >
        <ListboxItem
          key="react-class-swiper"
          endContent={<ItemCounter number={13} />}
          startContent={
            <IconWrapper className="bg-success/10 text-success">
              <BugIcon className="text-lg " />
            </IconWrapper>
          }
        >
          react class版本的swiper实现
        </ListboxItem>
        <ListboxItem
          key="antv-g2"
          endContent={<ItemCounter number={6} />}
          startContent={
            <IconWrapper className="bg-primary/10 text-primary">
              <PullRequestIcon className="text-lg " />
            </IconWrapper>
          }
        >
          antv/g2实现的一个滚动柱状图
        </ListboxItem>
        <ListboxItem
          key="uniapp"
          endContent={<ItemCounter number={293} />}
          startContent={
            <IconWrapper className="bg-secondary/10 text-secondary">
              <ChatIcon className="text-lg " />
            </IconWrapper>
          }
        >
          uniapp 中实现的echarts使用
        </ListboxItem>
        <ListboxItem
          key="umi-request"
          endContent={<ItemCounter number={2} />}
          startContent={
            <IconWrapper className="bg-warning/10 text-warning">
              <PlayCircleIcon className="text-lg " />
            </IconWrapper>
          }
        >
          使用umi-request封装实现的restful接口函数
        </ListboxItem>
        <ListboxItem
          key="exportjs"
          endContent={<ItemCounter number={4} />}
          startContent={
            <IconWrapper className="bg-default/50 text-foreground">
              <LayoutIcon className="text-lg " />
            </IconWrapper>
          }
        >
          js实现 导出文件流
        </ListboxItem>
        <ListboxItem
          key="nextjs-casdoor"
          className="group h-auto py-3"
          endContent={<ItemCounter number={399} />}
          startContent={
            <IconWrapper className="bg-primary/10 text-primary">
              <TagIcon className="text-lg" />
            </IconWrapper>
          }
          textValue="Releases"
        >
          <div className="flex flex-col gap-1">
            <span>nextjs+casdoor实现登录统一验证</span>
            <div className="px-2 py-1 rounded-small bg-default-100 group-data-[hover=true]:bg-default-200">
              <span className="text-tiny text-default-600">
                @nextjs@casdoor
              </span>
              <div className="flex gap-2 text-tiny">
                <span className="text-default-500">49 minutes ago</span>
                <span className="text-success">Latest</span>
              </div>
            </div>
          </div>
        </ListboxItem>
        <ListboxItem
          key="wsl"
          endContent={<ItemCounter number={79} />}
          startContent={
            <IconWrapper className="bg-warning/10 text-warning">
              <UsersIcon />
            </IconWrapper>
          }
        >
          wsl2 上安装windows图形界面
        </ListboxItem>
        <ListboxItem
          key="nginx-react"
          endContent={<ItemCounter number={82} />}
          startContent={
            <IconWrapper className="bg-default/50 text-foreground">
              <WatchersIcon />
            </IconWrapper>
          }
        >
          实现react多页面部署的nginx配置
        </ListboxItem>
        <ListboxItem
          key="docker"
          endContent={<ItemCounter number={12} />}
          startContent={
            <IconWrapper className="bg-danger/10 text-danger dark:text-danger-500">
              <BookIcon />
            </IconWrapper>
          }
        >
          docker常用命令整理
        </ListboxItem>
      </Listbox>
    </div>
  );
}
