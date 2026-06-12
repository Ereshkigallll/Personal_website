# 内容编写指南

**projects(项目)** 和 **research(研究)** 两个页面的内容,都从这里的 Markdown 文件自动读取 —— 你只要加 / 改 `.md` 文件,页面就会更新,**不用碰任何代码**。

## 怎么加一条内容

在对应目录新建一个 `.md` 文件即可:

- 项目 → `content/projects/你起的名字.md`
- 研究 → `content/research/你起的名字.md`

文件名(去掉 `.md`)会成为它的网址 slug。

## 文件长什么样

每个文件分两部分:顶部 `---` 之间的 **frontmatter**(填字段),下面是**正文**(写描述):

```markdown
---
title: 项目标题
subtitle: 一句话副标题
category: robotics
status: active
tags: [ROS2, Python, "C++"]
date: JAN 2024
year: 2024
github: https://github.com/你的用户名/仓库
---

这里写详细描述,会显示在卡片上。支持 Markdown 写法。
```

## 字段说明

### 项目 `content/projects/*.md`

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | ✅ | 标题 |
| `subtitle` | ✅ | 一句话副标题(显示在标题下) |
| `category` | ✅ | 分类,**只能填**: `research` / `robotics` / `iot` / `app` |
| `status` | ✅ | 状态,**只能填**: `active` / `in-progress` / `completed` |
| `tags` | ✅ | 技术标签数组,如 `[ESP32, MQTT, Flutter]` |
| `date` | | 日期,如 `MAR 2024` |
| `year` | | 年份数字,如 `2024` |
| `github` | | 源码链接 |
| `demo` | | 在线演示链接 |
| `serial` | | 编号,如 `PRJ-ROB-002`(不填留空即可) |
| `order` | | 排序数字,小的在前 |
| 正文 | | 详细描述(卡片上显示的那段) |

### 研究 `content/research/*.md`

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | ✅ | 标题 |
| `subtitle` | ✅ | 副标题 |
| `status` | ✅ | **只能填**: `in-progress` / `submitted` / `published` |
| `tags` | ✅ | 标签数组 |
| `date` | | 日期 |
| `venue` | | 发表于(期刊 / 会议) |
| `authors` | | 作者数组,如 `["Yutong Zhang"]` |
| `link` | | 论文 / 数据链接 |
| `serial` | | 编号,如 `RS-2024-001` |
| `order` | | 排序数字 |
| 正文 | | 摘要 abstract |

## 注意事项

1. **含特殊符号的标签要加引号** —— 含 `+`、`#`、空格、`:` 等的值要用引号包起来:
   `tags: [VR, "C++", "C#", "3D Printing"]`
2. **`category` / `status` 必须是上面列出的值之一**,否则分类筛选 / 状态颜色会不对。
3. **排序**用 `order: 1`、`order: 2` 控制(数字小的排前面);不填默认排最后。
4. **正文 = 描述 / 摘要** —— 卡片上显示的那段文字,就写在 `---` 下面。
5. **加文件 = 加内容,删文件 = 删内容**。改完刷新页面即可看到(本地 `pnpm dev` 自动热更新)。
6. 分类筛选按 **tag 精确匹配**分类名:研究页 tab 是 `VR/Haptics/HCI/IoT/Robotics`,某条研究的 `tags` 里写了 `VR`,它就会归到 VR 分类下。

## 关于首页(profile)的数据

首页身份卡上的「项目 / 研究**数量**」统计、以及「活跃项目」列表,目前仍读旧的 `content/profile.ts` 和 `content/projects.ts`。如果你希望首页也跟着这些 md 文件自动更新,告诉我,我帮你接上(需要小改一下首页的取数方式)。
