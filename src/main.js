import React, { useMemo, useState } from 'https://esm.sh/react@19.1.0';
import { createRoot } from 'https://esm.sh/react-dom@19.1.0/client';

const models = [
  {
    name: 'Qwen2.5-Rent-72B',
    provider: 'Rent Model Lab',
    scene: '租金估价 / 合同问答',
    tag: '租房助手',
    rating: '4.9',
    users: '12.8 万人在用',
    status: '热门',
  },
  {
    name: 'Embedding-Retrieval-v3',
    provider: '向量检索服务',
    scene: '房源知识库召回',
    tag: '知识检索',
    rating: '4.8',
    users: '8.6 万人在用',
    status: '推荐',
  },
  {
    name: 'Risk-Guard-Small',
    provider: '安全策略模型',
    scene: '合同风险与内容安全提醒',
    tag: '安全审阅',
    rating: '4.7',
    users: '5.1 万人在用',
    status: '新发布',
  },
];

const mcpTools = [
  {
    name: '房源解析助手',
    description: '从图片、链接或文本中提取户型、价格、位置和配套亮点。',
    endpoint: 'mcp://rent-model/tools/listing_parser',
  },
  {
    name: '通勤时间计算器',
    description: '连接地图能力，快速比较房源到公司、学校和商圈的通勤体验。',
    endpoint: 'mcp://rent-model/tools/commute_planner',
  },
  {
    name: '合同条款解释器',
    description: '把押金、违约、维修责任等条款翻译成更容易理解的提醒。',
    endpoint: 'mcp://rent-model/tools/contract_explainer',
  },
];

const featuredApps = [
  { name: '租房决策 Copilot', summary: '对比多个房源并生成可分享的决策清单。' },
  { name: '合同避坑小助手', summary: '上传合同后高亮关键风险和待确认问题。' },
  { name: '社区生活指南', summary: '根据通勤、预算和偏好推荐生活圈。' },
];

const recentReleases = [
  { title: '多模态看房总结', meta: '今天发布 · 支持图片与语音笔记' },
  { title: '租金趋势问答', meta: '本周上新 · 覆盖 24 个城市' },
  { title: '搬家待办生成器', meta: '近期热门 · 一键生成清单' },
];

const scenarios = ['找房比价', '合同审阅', '城市通勤', '房源创作', '知识问答', '生活规划'];

const navItems = [
  { id: 'home', label: '首页' },
  { id: 'models', label: '模型' },
  { id: 'spaces', label: 'Spaces / 应用' },
  { id: 'mcp', label: 'MCP 工具' },
  { id: 'docs', label: '文档' },
];

const h = React.createElement;

function StatusPill({ status }) {
  return h('span', { className: `status status-${status}` }, status);
}

function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [selectedModel, setSelectedModel] = useState(models[0].name);
  const [prompt, setPrompt] = useState('我想找一套 30 分钟通勤内、预算 6500 元以内、适合养猫的一居室，请帮我推荐筛选思路。');

  const activeModel = useMemo(
    () => models.find((model) => model.name === selectedModel) ?? models[0],
    [selectedModel],
  );

  return h('main', { className: 'shell' },
    h('header', { className: 'topbar' },
      h('div', { className: 'brand' },
        h('div', { className: 'brand-mark' }, 'RM'),
        h('div', null,
          h('strong', null, 'Rent Model'),
          h('span', null, 'AI 模型与工具商店'),
        ),
      ),
      h('nav', { className: 'nav-list', 'aria-label': '主导航' },
        navItems.map((item) => h('button', {
          className: activeNav === item.id ? 'nav-item active' : 'nav-item',
          key: item.id,
          onClick: () => setActiveNav(item.id),
        }, item.label)),
      ),
      h('div', { className: 'topbar-actions' },
        h('button', { className: 'secondary-button' }, '登录'),
        h('button', { className: 'primary-button' }, '开始使用'),
      ),
    ),

    h('section', { className: 'content' },
      h('header', { className: 'hero' },
        h('div', null,
          h('p', { className: 'eyebrow' }, 'AI Model & MCP Store'),
          h('h1', null, '发现、体验并连接 AI 模型与 MCP 工具'),
          h('p', { className: 'hero-copy' }, '像逛应用商店一样使用模型能力：浏览热门模型、试用精选应用，并把适合自己的 MCP 工具连接到工作流。'),
        ),
        h('div', { className: 'hero-aside' },
          h('div', { className: 'hero-orbit' },
            h('span', { className: 'orbit-dot dot-model' }, '模型'),
            h('span', { className: 'orbit-dot dot-tool' }, 'MCP'),
            h('span', { className: 'orbit-dot dot-app' }, 'App'),
          ),
          h('div', { className: 'hero-actions' },
            h('button', { className: 'primary-button' }, '探索模型'),
            h('button', { className: 'secondary-button' }, '查看文档'),
          ),
        ),
      ),

      h('section', { className: 'metric-grid', 'aria-label': '精选内容' },
        h('article', { className: 'metric-card metric-card-model' }, h('span', null, '热门模型'), h('strong', null, '36'), h('p', null, '覆盖找房、合同、知识问答')),
        h('article', { className: 'metric-card metric-card-tool' }, h('span', null, '推荐工具'), h('strong', null, '18'), h('p', null, '可一键连接 MCP 客户端')),
        h('article', { className: 'metric-card metric-card-app' }, h('span', null, '精选应用'), h('strong', null, '24'), h('p', null, '开箱即用的 AI Spaces')),
        h('article', { className: 'metric-card metric-card-release' }, h('span', null, '最近发布'), h('strong', null, '7'), h('p', null, '本周新增体验内容')),
      ),

      h('section', { className: 'scenario-strip', 'aria-label': '使用场景分类' },
        h('div', null,
          h('p', { className: 'eyebrow' }, 'Categories'),
          h('h2', null, '按使用场景分类探索'),
        ),
        h('div', { className: 'scenario-list' },
          scenarios.map((scenario) => h('button', { className: 'scenario-chip', key: scenario }, scenario)),
        ),
      ),

      h('section', { className: 'workspace' },
        h('article', { className: 'panel large-panel' },
          h('div', { className: 'panel-heading' },
            h('div', null, h('p', { className: 'eyebrow' }, 'Try it now'), h('h2', null, '热门模型体验区')),
            h(StatusPill, { status: activeModel.status }),
          ),
          h('label', { className: 'field-label', htmlFor: 'model-select' }, '选择想体验的模型'),
          h('select', {
            id: 'model-select',
            className: 'select',
            value: selectedModel,
            onChange: (event) => setSelectedModel(event.target.value),
          }, models.map((model) => h('option', { key: model.name, value: model.name }, `${model.name} · ${model.tag}`))),
          h('label', { className: 'field-label', htmlFor: 'prompt' }, '描述你的需求'),
          h('textarea', {
            id: 'prompt',
            className: 'textarea',
            value: prompt,
            onChange: (event) => setPrompt(event.target.value),
          }),
          h('div', { className: 'inference-footer' },
            h('div', null,
              h('strong', null, activeModel.scene),
              h('span', null, `${activeModel.provider} · ${activeModel.users} · 评分 ${activeModel.rating}`),
            ),
            h('button', { className: 'primary-button' }, '立即体验'),
          ),
        ),

        h('article', { className: 'panel' },
          h('div', { className: 'panel-heading' },
            h('div', null, h('p', { className: 'eyebrow' }, 'Recommended Tools'), h('h2', null, '推荐 MCP 工具')),
            h('button', { className: 'secondary-button' }, '全部工具'),
          ),
          h('div', { className: 'tool-list' },
            mcpTools.map((tool) => h('div', { className: 'tool-item', key: tool.name },
              h('strong', null, tool.name),
              h('p', null, tool.description),
              h('code', null, tool.endpoint),
            )),
          ),
        ),
      ),

      h('section', { className: 'panel model-table-panel' },
        h('div', { className: 'panel-heading' },
          h('div', null, h('p', { className: 'eyebrow' }, 'Featured Apps'), h('h2', null, '精选应用与最近发布')),
          h('button', { className: 'secondary-button' }, '浏览 Spaces'),
        ),
        h('div', { className: 'app-release-grid' },
          h('div', { className: 'app-card-list' },
            featuredApps.map((app) => h('article', { className: 'app-card', key: app.name },
              h('strong', null, app.name),
              h('p', null, app.summary),
            )),
          ),
          h('div', { className: 'release-list' },
            h('h3', null, '最近发布'),
            recentReleases.map((release) => h('article', { className: 'release-item', key: release.title },
              h('strong', null, release.title),
              h('span', null, release.meta),
            )),
          ),
        ),
        h('div', { className: 'model-table' },
          h('div', { className: 'table-row table-head' },
            h('span', null, '热门模型'), h('span', null, '提供方'), h('span', null, '适用场景'), h('span', null, '评分'), h('span', null, '热度'),
          ),
          models.map((model) => h('div', { className: 'table-row', key: model.name },
            h('strong', null, model.name),
            h('span', null, model.provider),
            h('span', null, model.scene),
            h('span', null, model.rating),
            h(StatusPill, { status: model.status }),
          )),
        ),
      ),
    ),
  );
}

createRoot(document.getElementById('root')).render(h(App));
