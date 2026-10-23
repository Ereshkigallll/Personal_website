# 内容编写指南

**projects(项目)**、**research(研究)** 和 **dev log(开发日志)** 这几个页面的内容,都从这里的 Markdown 文件自动读取 —— 你只要加 / 改 `.md` 文件,页面就会更新,**不用碰任何代码**。

## 怎么加一条内容

在对应目录新建一个 `.md` 文件即可:

- 项目 → `content/projects/你起的名字.md`
- 研究 → `content/research/你起的名字.md`
- 开发日志 → `content/logs/你起的名字.md`

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

### 开发日志 `content/logs/*.md`

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | ✅ | 标题 |
| `date` | ✅ | 日期,如 `2025-02-20`(也用于排序,新的在前) |
| `readTime` | | 阅读时长,如 `8 min` |
| `tags` | ✅ | 标签数组;筛选按 tag 归类:`research/vr/haptics`→研究, `robotics/hardware/ros2`→构建日志, `meta`→杂项 |
| `status` | | `published` / `draft` / `archived` |
| `summary` | ✅ | 列表卡片显示的摘要 |
| 正文 | | 文章正文(Markdown,详情页用 MDX 渲染) |

## 注意事项

1. **含特殊符号的标签要加引号** —— 含 `+`、`#`、空格、`:` 等的值要用引号包起来:
   `tags: [VR, "C++", "C#", "3D Printing"]`
2. **`category` / `status` 必须是上面列出的值之一**,否则分类筛选 / 状态颜色会不对。
3. **排序**用 `order: 1`、`order: 2` 控制(数字小的排前面);不填默认排最后。
4. **正文 = 描述 / 摘要** —— 卡片上显示的那段文字,就写在 `---` 下面。
5. **加文件 = 加内容,删文件 = 删内容**。改完刷新页面即可看到(本地 `pnpm dev` 自动热更新)。
6. 分类筛选按 **tag 精确匹配**分类名:研究页 tab 是 `VR/Haptics/HCI/IoT/Robotics`,某条研究的 `tags` 里写了 `VR`,它就会归到 VR 分类下。

## 关于首页(profile)的数据

首页身份卡上的项目、研究和技能数量，分别读取 `content/projects.ts`、`content/research.ts` 和 `content/skills.ts`。

首页的专业领域、专业方向、个人寄语，以及右侧「当前机器人方向」，在 `content/profile.ts` 维护中英文内容。`currentFocus` 根据机器人岗位的工作内容整理，点击后进入对应的工作经历详情。

## 经历页 (Experience)

经历页读取 `content/experience.ts`，每条包含中英文岗位、机构、贡献摘要和技术标签。

- `category`：`education`（教育）／`work`（工作）／`research`（研究）／`teaching`（教学），用于两种视图的筛选。
- `startDate`、`endDate`：使用 `YYYY-MM`；当前岗位的 `endDate` 填 `null`。
- 列表按开始时间倒序，同起始时间按结束时间倒序排列；时间轴从左到右由近及远，默认聚焦最近的经历，向右或向下滚轮浏览更早的经历。滚轮、触控横滑、方向键和底部进度条均可操作。
- `timelineTitle`、`summary`：时间轴的中英文短标题与简介。
- `period: true`：在上方显示从开始月至结束月的跨度条；`parentId`：将期间项目关联到相应阶段。它只表达时间背景，不代表项目由该机构主办。
- 同月项目共用一个日期锚点。到达该月时先显示第一张卡片，继续滚动时日期保持不动，其余卡片从右侧依次展开，间隔约 20px；反向滚动时收拢。窄屏逐张切换，避免并排卡片过窄。
- 时间轴占满可用宽度；卡片、字体、跨度条和日期间距随容器宽度一起调整。正文在窄屏保持 14px，大屏逐步增大到约 19px；卡片宽度与展开位置使用同一套尺寸计算。
- 拥挤月份会扩展间距，跨度条与日期刻度使用同一映射；同月展开所需的滚动距离单独计算，不会改变项目时间。
- 列表和时间轴可自由切换；点击卡片或跨度条进入 `/experience/[id]` 详情页，返回时恢复展示方式、筛选和当前经历。
- 同一标签页首次进入时间轴时播放坐标校准：主页绿线收拢并衔接定位点，轴线从中心展开，刻度与真实年月归位，跨度条铺开，最后聚焦最新经历。直接访问会等待全站开机动画结束；再次进入、详情返回和切换视图不会重播。滚轮、触控、按键或调整窗口大小均可接管，系统偏好减少动态效果时直接显示内容。
- `publication`：可选的论文标题及链接；仅填写已有成果的真实链接。
- 岗位摘要在这里维护；完整技术案例在 Research／Projects 展开。
