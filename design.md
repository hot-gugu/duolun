---
name: lowcode-production-design
description: >-
  ai-nav-lowcode Production Web 视觉与布局设计规范：主面板壳、页头、Tab、色板、字号、
  卡片表面、指标卡、筛选条、按钮、分页、列表壳与滚动链。Use when editing
  src/production UI/CSS, building new pages, restyling cards/tables/filters/buttons,
  or when tempted to invent new radii/colors/shadows instead of reusing prod tokens.
---

# Production Web 设计规范（Cursor）

适用范围：`ai-nav-lowcode` `src/production/**`（业务表面在 `.material-surface` 内）。  
**真源 = 已落地代码与本 skill；禁止用中台 / 移动端 / 通用 AI 模板覆盖本端视觉。**

与 `lowcode-interaction-preserve` 分工：本 skill 管**长什么样**；交互流程删改仍须先征询。

## 权威优先级

1. 用户本轮明确指令（含具体色值 / 类名）
2. 同模块已落地页面（优先抄近邻页，不要新发明一套）
3. 本 skill 与全局 token（`styles.css`、`prod-*.css`、`metric-card.css`、`row-action.css`、`hazard-mgmt.css`）
4. 蓝湖稿（走 `lowcode-lanhu-restore`）；截图臆测禁止

## 产品气质

- 政务 / 安消业务后台：冷静蓝紫主色，**浅蓝主面板 + 白/渐变内容卡**，轻阴影，少装饰。
- 字重偏轻（默认 **400**）；页头标题可用 **600**；统计数字用 **D-DIN-PRO Medium / 500**。
- **禁止**页面可见「功能注释」旁注；**禁止**紫色 SaaS 模板、奶油衬线、报纸风、深色模式业务页。

---

## 一、页面骨架（现网真源）

### 1. 主面板壳（必须统一）

左右工作区同一套浅蓝壳，定义在 `hazard-mgmt.css` 的 `.hz-shell`：

| Token / 属性 | 值 |
|--------------|-----|
| `--hz-panel-bg` | `rgba(247, 251, 255, 0.92)` |
| 圆角 | **12px** |
| 边框 | `1px solid rgba(207, 219, 236, 0.78)` |
| 阴影 | `0 10px 26px rgba(44, 88, 148, 0.1)` |
| 内边距 | **14px**（四边相同） |

落地选择器：

- 左树：`.hz-aside .biz-org-tree`（同底色 / 圆角 / 边框 / 阴影）
- 右内容：`.hz-main-panel`
- **无组织树的整页**（责任区待处置 `.responsibility-page`、企业档案 `.ea-page` 等）**自行套同一套壳**，不要留透明裸内容区

```text
# ✅ GOOD：OrgWorkShell → hz-main-panel 自带壳；或整页 main 复制壳参数
# ❌ BAD：内容区透明裸奔；或再套一层全宽白底大卡片当「第二层壳」
```

### 2. 禁止双层白壳

`.hz-main-panel`（或等价整页壳）**已经是**浅蓝面板。其内部：

- 页面根（`.va-page` / `.vm-page` / `.mon-page` 等）→ `background: transparent`；`flex: 1; min-height: 0; height: 100%`
- **不要**再给整页根加 `background:#fff` + 大 padding（会叠出「白框套浅蓝」）
- 内边距交给主面板 **14px**；页面根默认 **padding: 0**（除非模块有明确例外）

允许的白/半白表面（嵌在面板内的**内容块**，不是整页壳）：

- 表格壳 / `.mon-panel` / `.ea-table-wrap`：`background: rgba(255,255,255,.94)`，圆角约 9，细边 `#dfe8f3`
- 筛选条：白底 + 默认边框
- 台账 / 算法等**列表卡片**：走 `--prod-surface-card-surface`

### 3. 页头 `.mon-page-head`（`prod-page-head.css`）

| 元素 | 规格 |
|------|------|
| 标题 `h1` | **22px / 600**，色 `#1d2b3f`，行高 1.6 |
| 副标题 `p` | **14px / 400**，色 `#718299`，上距 7px |
| 与下方间距 | 默认 `margin-bottom: 12px`（有 flex `gap` 的页可置 0，避免叠距） |

**注意**：全局 `.material-surface h1` 是 16/400（抽屉 / 区块用）。**二级业务页大标题**一律走 `.mon-page-head h1` 的 22/600，不要用 16 顶替页头。

### 4. 分段 Tab `.hz-ledger-tab-group`

统一胶囊分段（责任区 / 企业档案 / 任务管理 / 演练等已对齐）：

| 属性 | 值 |
|------|-----|
| 容器 | `padding: 4px`，白底，边 `#d5e1ef`，圆角 **8px**，阴影 `0 8px 18px rgba(42,77,124,.07)` |
| 项高 | **38px**（部分计划页压到 36），内边距 `0 16px`，圆角 **6px**，字 14/400 |
| 未选 | 透明底，字 `#657a94` 档；hover `#f3f7fc` / `#275fc4` |
| 选中 `.active` | 白字 + `linear-gradient(135deg, #237cf3, #5659ee)`（或主色渐变 `100deg, #0879ff, #6654f7`），阴影 `0 7px 16px rgba(52,91,226,.24)` |

新页不要自造下划线 Tab 或另一套胶囊。

### 5. 典型栈（自上而下）

1. `.mon-page-head`（`flex: none`）
2. `.hz-ledger-tab-group`（可选）
3. `BizMetricStats` 或模块指标行
4. 筛选条（`.hz-ledger-filter-row` / 模块 `*-filters`）
5. 列表：`BizDataTable` / 卡片栅格 / `.mon-panel` 表壳
6. 分页（贴列表底，右对齐，**无通栏分割线**）

### 6. 滚动链（卡片列表必守）

```text
panel / spin / spin-content / card-list
→ flex: 1 1 0%; min-height: 0; （中间层可 height:0）
→ 真正滚动层 overflow-y: auto
→ grid-auto-rows: max-content
→ 单卡 min-height: min-content; overflow: hidden; align-self: start
```

禁止：限高网格 + 卡 `min-height:0` + `overflow:visible`（会叠卡）。  
禁止：仅靠 `margin-top:auto` 在 stretch 卡里顶按钮（易出大块空白）。

---

## 二、设计 Token（须复用）

### 字体

| 角色 | Token / 规格 |
|------|----------------|
| 正文 / 表头表体 / 表单标签 | `--prod-font-body: 14px` / `400` |
| 页头大标题（`.mon-page-head h1`） | **22px / 600**，`#1d2b3f` |
| 页内区块 / 抽屉标题（h2–h3、`.prod-title`、`.biz-drawer__title`） | `--prod-font-title: 16px` / `400` |
| 抽屉分区标题（`.form-section-title`） | **15px / 400** + 左侧蓝紫竖条 |
| 辅助 / hint / small / 抽屉副标题 | `--prod-font-aux: 12px` / `400` |
| 短强调句（导入提示、模板名） | 原字号，字重 **600**（不要 700） |
| 指标大数字 | `--prod-metric-num-font`（D-DIN-PRO Medium / 500） |
| 按钮（含 `n-button`） | 一律 `400` |

新写标题、标签不要用 700 / 850。`.hz-section-title` 残留 `font-weight: 850` 是旧值，新区块跟抽屉分区标题走 400 + 竖条。

### 主色与语义色

**主色唯一：`#0879ff`。**  
依据：`ProductionLayout` / `LoginPage` / `ProductionHeader` 的 Naive `primaryColor`、侧栏选中、主按钮渐变起点。

| 用途 | 值 |
|------|-----|
| **主色（唯一）** | `#0879ff` |
| 主色 Hover | `#3d8fff` |
| 主色 Pressed | `#065fd4` |
| 主按钮 / 侧栏选中渐变 | `linear-gradient(100deg, #0879ff, #6654f7)` |
| Tab 选中渐变（现网） | `linear-gradient(135deg, #237cf3, #5659ee)` 或主色渐变 |
| 分区标题竖条 | `linear-gradient(180deg, #0879ff, #6a4df5)` |
| 浅蓝底（行操作、选中底） | `#eef6ff` / `rgba(8, 121, 255, 0.1)` |
| **主面板底** | `--hz-panel-bg: rgba(247,251,255,.92)` |
| 成功 | `#12a36a` / 底 `#e8fbf4` |
| 警告 | `#d98600` / 底 `#fff3d9` |
| 危险 | `#ef2f4f` / `#e43d3d` / 底 `#fff4f5` |

历史近似蓝（**新写禁止，改旧时并到 `#0879ff`**）：`#126bff` / `#2f6fed` / `#2563eb` / `#0f70ff` / `#176cff` / `#3478ef` / `#527cff` 等。

### 边框色

**默认内容边框：`rgba(190, 211, 238, 0.95)`**（卡片、筛选、列表壳外框）。  
**主面板壳边框：`rgba(207, 219, 236, 0.78)`**（仅壳，勿与内容卡混用）。  
实色近似可用 `#d8e5f4`。

| 角色 | 色值 |
|------|------|
| 默认内容边框 | `rgba(190, 211, 238, 0.95)` |
| 主面板壳边框 | `rgba(207, 219, 236, 0.78)` |
| 控件边框 | `#d8e2ef` |
| 表头底边 | `#dce8f7` |
| 表体行分割 | `#e7eef8` |
| 控件 Hover / Focus | `#a9c9ff` |
| 行操作描边 | `#cfe1ff`（`--prod-row-action-border`） |

### 文字色（三档 + 表头 + 页头）

| 角色 | 色值 | 用在哪 |
|------|------|--------|
| **正文** | `#24344d` | 表体、段落、卡片主文案 |
| **标题 / 深墨** | `#172033` | 分区标题、抽屉内 h2/h3 |
| **页头标题** | `#1d2b3f` | `.mon-page-head h1` |
| **辅助** | `#8190a5` | hint、时间、副标题（页头副文案现网 `#718299`，同档） |
| **表头** | `#526b91` | 表格 th |

链接 / 选中文字用主色 `#0879ff`。

### 圆角 / 控件尺寸

| 元素 | 规格 |
|------|------|
| 主面板壳 | 圆角 **12px**，内边距 **14px** |
| 筛选 / 主按钮 | 高 **36px**，圆角 **8px**（`--prod-filter-*`） |
| 行内操作 | 高 **30px**，圆角 **6px**（`--prod-row-action-*`） |
| Tab 项 | 高 **38px**（或 36），圆角 **6px**；容器圆角 **8px** |
| 分页页码 | **32×32**，圆角 **8px** |
| 状态 pill | 高 **22px**，`border-radius: 999px`，字 **12px/400** |
| 指标卡 | 高 **90px**（`--prod-metric-card-height`），圆角 **8px** |
| 内容表壳 / mon-panel | 圆角约 **9px** |

---

## 三、卡片与指标

### 大卡片表面（列表 / 台账卡）

使用 `--prod-surface-card-surface`（`prod-surface-card.css`）：

- 白 → 浅蓝 `145deg` 渐变 + 右上角淡蓝光晕
- 边框约 `#d8e5f4`，阴影 `0 8px 20px rgba(45,87,140,.06)`
- hover：边 `#9fc2ef`，阴影略加强（对齐 `.ed-ledger-card`）
- 类名 `prod-surface-card`，或挂到已收录选择器（`.ed-ledger-card` / `.et-team-card` / `.hz-plan-card` / `.hz-point-card` / `.post-card` 等）
- **不要**给指标条、Hero、暗色卡、视频预览区套此表面

**顶图 + 正文卡**（如视频算法 `.va-algorithm-card`）：顶图会挡住默认右上光晕，须把光晕锚点下移到内容区（约 `circle at 90% 68%`），或加一层内容区可见的同色渐变，否则肉眼仍像纯白。改表面时提高选择器优先级，避免被 `.material-surface .xxx` 全局规则盖回。

### 指标卡

优先 `BizMetricStats`；视觉跟 `metric-card.css`。

- 标准高度 **90px**
- 顶透明→主题色渐变条；左圆标；右标签 14 + 数字 + 单位
- 未选中 1px 边，选中 `.active` 用 inset 模拟 2px（**禁止**改 `border-width`，会抖高）
- 栅格列宽：**`minmax(168px, 220px)`**（固定档宽，不要 `1fr` 拉满整行）
- tone 用 `--metric-accent`，不要每页手写一套

---

## 四、组件约定

### 按钮

| 类 | 用途 |
|----|------|
| `.hz-primary-btn` | 主操作（蓝紫渐变，白字） |
| `.hz-soft-btn` | 次要 / 取消（白底灰边，hover 淡蓝） |
| `.prod-row-action` | 表格/卡片行操作（浅蓝底 `#eef6ff`） |
| 危险描边 | `--prod-row-action-danger-*` 或 `type="error"` |

`n-button` 叠业务类时：宿主 `border:0`，只留 Naive 伪边框（见 `n-button.css`）。

### 筛选与表单控件

- 用 Naive：`n-select` / `n-date-picker` / `n-input` / `n-tree-select`；`consistent-menu-width`，浮层 `to="body"`
- **禁止**业务筛选里的原生 `<select>`、`<input type="date">`
- 高 36 / 圆角 8（`--prod-filter-height` / `--prod-filter-radius`）
- 对等筛选项 `flex: 1 1 0` 均分；右侧计数 `flex: none`
- 台账条 `.hz-ledger-filter-row`：下拉可定宽，搜索吃剩余；白底、细蓝灰边、轻阴影

### 表格

- `BizDataTable` / `n-data-table` + `.table-wrap`；表头/单元格 14/400
- 列表外壳可白/半白卡片（圆角 8–9）；**分页不要顶部分割线**
- **首列 `padding-left: 20px`、末列 / 固定右列 `padding-right: 20px`**
- 勾选列：左 20 / 右 12，下一数据列再补左 12；列宽 ≥52

### 状态

`.hz-status-pill` + `.blue|.purple|.green|.orange|.red|.gray`  
高 22、胶囊、12px；勿改成大块 badge。

### 抽屉 / 表单

`BizDrawer` + `prod-drawer-form.css`：

- 标题 16/400；分区标题 15/400，左竖条 **4×14**、圆角 999、`linear-gradient(180deg, #0879ff, #6a4df5)`
- 表单项间距默认 `--prod-drawer-form-gap: 16px`；短表相邻字段可用 20px
- 必填星号 `#ef4444`，跟标签
- 底栏贴抽屉底：内容区 flex 列，上滚、footer `flex: none`
- 加载：居中占位（约 `min(52vh, 420px)`），勿把空内容塞进会被裁切的 `n-spin`

### 空态

`ProdEmptyState`（默认 `empty.svg`）：主文案 14/400，辅助 12/400；抽屉/卡片用 `compact`。

### 图标（视频墙等操作条）

视频墙布局/全屏等操作优先 **ionicons solid**（如 `Square` / `Grid` / `Apps` / `Scan`），避免 Outline 与实体混用。新图标跟同页已落地风格。

---

## 五、布局与改 UI 纪律

1. **只改用户点名的元素**；禁止顺手改邻近间距/标题/共享 CSS。
2. 新列表页：先抄同构页（隐患台账 / 监测设备 / 演练计划 / 视频 AI 核查）的**面板壳 + 页头 + Tab + 指标 + 筛选 + 列表**。
3. 新颜色 / 圆角 / 阴影前：先搜 `--prod-*`、`--hz-panel-bg` 与同模块 CSS。
4. 共享样式（`prod-surface-card` / `row-action` / `metric-card` / `hazard-mgmt` 壳）影响面大，改前说明波及选择器。
5. 侧栏菜单图标：`src/project/layout/menuIcons.ts`；消控室用 `IconFireHost`（描边 1.5）。

---

## 六、反模式（禁止）

```text
❌ 业务页整页 dark mode / 紫色霓虹 / 大面积玻璃拟态
❌ 主面板内再套全宽 background:#fff 当第二层壳
❌ 无组织树页面不做浅蓝面板壳（透明裸奔）
❌ 卡片一套新渐变，不走 --prod-surface-card-surface（顶图卡除外须显式说明光晕锚点）
❌ 再写近似蓝当主色；再写近似灰当正文；再写杂边框色
❌ 筛选高度 32/40 混用；主按钮圆角 4 或 999
❌ 筛选 / 表单再用原生 select 或 input[type=date]
❌ 页头用 16/400 顶替 22/600；标题/按钮用 700/850
❌ BizMetricStats 用 1fr 拉满；指标卡 border-width 切换选中
❌ 空态只留一行灰字；分页上方再画 divider
❌ 页面加「请在 Web/移动端配置」类说明条
❌ 为对齐中台删掉本端确认框 / Tab / 步骤（先征询）
❌ grid 限高后卡片 overflow:visible 导致重叠
❌ git 提交时用 git add .（见 lowcode-jenkins-commit）
```

---

## 七、改完自检

- [ ] 主面板 / 整页壳：`--hz-panel-bg` + 12 圆角 + 14 padding + 壳边框阴影；无双层白壳
- [ ] 页头 22/600；区块/抽屉 16 或 15/400；正文 14/400；辅助 12/400
- [ ] Tab 用 `.hz-ledger-tab-group`；指标卡 90 高、列宽 minmax(168,220)
- [ ] 主按钮 / 筛选 36×8；行操作 30×6；下拉和日期是 Naive 组件
- [ ] 大卡片用 surface token（顶图卡光晕可见）；空态用 ProdEmptyState
- [ ] 列表可滚且底栏/按钮不裁切、不重叠
- [ ] 未改用户未点名的 UI；无功能注释文案
- [ ] 写操作仍满足 `lowcode-submit-guard`

---

## 八、关键文件索引

| 文件 | 内容 |
|------|------|
| `src/production/styles.css` | 字号 token、入口 import |
| `styles/prod-page-head.css` | 二级页头 22/600 |
| `styles/prod-surface-card.css` | 大卡片表面 |
| `styles/metric-card.css` | 指标卡 |
| `styles/row-action.css` | 行操作按钮 |
| `styles/n-button.css` | 主/次按钮与 n-button |
| `styles/filter-control.css` | 筛选高度圆角 |
| `styles/prod-drawer-form.css` | 抽屉分区标题、竖条、表单间距 |
| `styles/import-drawer.css` | Excel 导入抽屉 |
| `styles/prod-pagination.css` | 分页 |
| `styles/prod-data-table.css` | 表格壳 |
| `styles/hazard-mgmt.css` | **主面板壳**、section-title、pill、Tab、OrgWorkShell |
| `styles/emergency-workbench.css` | 应急工作台栈与卡片滚动 |
| `views/monitoring/responsibilityTodo.css` | 无树页自套面板壳示例 |
| `views/enterprise-archive/enterpriseArchive.css` | 整页壳 + 筛选/表壳示例 |
| `views/video-monitoring/videoMonitoring.css` | video-work-shell 主面板 |
| `packages/biz-metric-stats/BizMetricStats.vue` | 指标栅格 minmax(168,220) |
| `src/production/components/ProdEmptyState.vue` | 通用缺省图 + 文案 |
| `packages/biz-drawer/BizDrawer.vue` | 抽屉标题、底栏、内容滚动 |
| `src/project/layout/menuIcons.ts` | 侧栏图标 |

```text
# ✅ GOOD：新台账页 = 浅蓝 hz-main-panel 壳 + mon-page-head + Tab + BizMetricStats + filter + 表/卡
# ✅ GOOD：内容卡挂 prod-surface-card；整页根 transparent，不叠白壳
# ❌ BAD：border-radius:16px; background:#fff; 整页再包一层当主背景
# ❌ BAD：为「好看」把全站指标卡改成另一套渐变或 1fr 拉满
