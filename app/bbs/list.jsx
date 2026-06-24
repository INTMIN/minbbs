import { Listbox, ListboxItem } from "@heroui/react";
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
  DockerIcon
} from "../components/Icon/MyIcon";
import { useNavigate } from "react-router";

export default function List() {
  const navigate = useNavigate();
  const goUrl = (name) => {
    navigate(`/bbs/${name}`);
  };

  // 配置化数据
  const items = [
    {
      key: "react-class-swiper",
      label: "react class版本的swiper实现",
      count: 13,
      icon: <BugIcon className="text-lg" />,
      iconClass: "bg-success/10 text-success",
    },
    {
      key: "antv-g2",
      label: "antv/g2实现的一个滚动柱状图",
      count: 6,
      icon: <PullRequestIcon className="text-lg" />,
      iconClass: "bg-primary/10 text-primary",
    },
    {
      key: "uniapp",
      label: "uniapp 中实现的echarts使用",
      count: 293,
      icon: <ChatIcon className="text-lg" />,
      iconClass: "bg-secondary/10 text-secondary",
    },
    {
      key: "umi-request",
      label: "使用umi-request封装实现的restful接口函数",
      count: 2,
      icon: <PlayCircleIcon className="text-lg" />,
      iconClass: "bg-warning/10 text-warning",
    },
    {
      key: "exportjs",
      label: "js实现 导出文件流",
      count: 4,
      icon: <LayoutIcon className="text-lg" />,
      iconClass: "bg-default/50 text-foreground",
    },
    {
      key: "nextjs-casdoor",
      label: (
        <div className="flex flex-col gap-1">
          <span>nextjs+casdoor实现登录统一验证</span>
          <div className="px-2 py-1 rounded-small bg-default-100 group-data-[hover=true]:bg-default-200">
            <span className="text-tiny text-default-600">@nextjs@casdoor</span>
            <div className="flex gap-2 text-tiny">
              <span className="text-default-500">49 minutes ago</span>
              <span className="text-success">Latest</span>
            </div>
          </div>
        </div>
      ),
      count: 399,
      icon: <TagIcon className="text-lg" />,
      iconClass: "bg-primary/10 text-primary",
      extraClass: "group h-auto py-3",
    },
    {
      key: "wsl",
      label: "wsl2 上安装windows图形界面",
      count: 79,
      icon: <UsersIcon />,
      iconClass: "bg-warning/10 text-warning",
    },
    {
      key: "nginx-react",
      label: "实现react多页面部署的nginx配置",
      count: 82,
      icon: <WatchersIcon />,
      iconClass: "bg-default/50 text-foreground",
    },
    {
      key: "docker",
      label: "docker常用命令整理",
      count: 12,
      icon: <BookIcon />,
      iconClass: "bg-danger/10 text-danger dark:text-danger-500",
    },
    {
      key: "docker-reality",
      label: "docker-reality-部署",
      count: 99,
      icon: <DockerIcon />,
      iconClass: "bg-danger/10 text-danger dark:text-danger-500",
    },
  ];

  return (
    <div className="w-full px-[20%] z--1 bg-transparent mt-10">
      <Listbox
        aria-label="User Menu"
        onAction={(key) => goUrl(String(key))}
        className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible shadow-small rounded-medium"
        itemClasses={{
          base: `
            bbsDiv px-3 
            first:rounded-t-medium last:rounded-b-medium rounded-none 
            gap-3 h-12 
            transition-colors 
            hover:bg-default-200 hover:text-primary 
            data-[hover=true]:bg-default-100/80
          `,
        }}
      >
        {items.map(({ key, label, count, icon, iconClass, extraClass }) => (
          <ListboxItem
            key={key}
            className={extraClass}
            endContent={<ItemCounter number={count} />}
            startContent={
              <IconWrapper className={iconClass}>{icon}</IconWrapper>
            }
          >
            {label}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
}
