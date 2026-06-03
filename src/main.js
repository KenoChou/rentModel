import React, { useMemo, useState } from 'https://esm.sh/react@19.1.0';
import { createRoot } from 'https://esm.sh/react-dom@19.1.0/client';

const models = [
  {
    name: 'Qwen2.5-Rent-72B',
    provider: '本地 GPU 集群',
    scene: '租金估价 / 合同问答',
    latency: '420ms',
    qps: '128',
    status: '运行中',
  },
  {
    name: 'Embedding-Retrieval-v3',
    provider: '向量检索服务',
    scene: '房源知识库召回',
    latency: '86ms',
    qps: '520',
    status: '空闲',
  },
  {
    name: 'Risk-Guard-Small',
    provider: '安全策略模型',
    scene: '输入输出风控审核',
    latency: '64ms',
    qps: '870',
    status: '运行中',
  },
];

const mcpTools = [
  {
    name: 'list_models',
    description: '查询当前可用模型、版本、状态与能力标签。',
    endpoint: 'mcp://rent-model/tools/list_models',
  },
  {
    name: 'infer',
    description: '调用指定模型完成文本生成、分类、向量化等推理任务。',
    endpoint: 'mcp://rent-model/tools/infer',
  },
  {
    name: 'get_model_metrics',
    description: '读取模型延迟、吞吐、错误率和资源占用等运行指标。',
    endpoint: 'mcp://rent-model/tools/get_model_metrics',
  },
];

const navItems = [
  { id: 'overview', label: '总览' },
  { id: 'models', label: '模型管理' },
  { id: 'mcp', label: 'MCP 服务' },
  { id: 'monitoring', label: '监控告警' },
];

const h = React.createElement;

function StatusPill({ status }) {
  return h('span', { className: `status status-${status}` }, status);
}

function App() {
  const [activeNav, setActiveNav] = useState('overview');
  const [selectedModel, setSelectedModel] = useState(models[0].name);
  const [prompt, setPrompt] = useState('请根据位置、面积、楼层和周边配套估算月租金，并给出理由。');

  const activeModel = useMemo(
    () => models.find((model) => model.name === selectedModel) ?? models[0],
    [selectedModel],
  );

  return h('main', { className: 'shell' },
    h('aside', { className: 'sidebar' },
      h('div', { className: 'brand' },
        h('div', { className: 'brand-mark' }, 'RM'),
        h('div', null,
          h('strong', null, 'Rent Model'),
          h('span', null, 'Inference Console'),
        ),
      ),
      h('nav', { className: 'nav-list', 'aria-label': '主导航' },
        navItems.map((item) => h('button', {
          className: activeNav === item.id ? 'nav-item active' : 'nav-item',
          key: item.id,
          onClick: () => setActiveNav(item.id),
        }, item.label)),
      ),
      h('section', { className: 'connection-card' },
        h('span', { className: 'pulse' }),
        h('div', null,
          h('strong', null, 'MCP Gateway'),
          h('p', null, 'stdio / SSE 双协议待接入'),
        ),
      ),
    ),

    h('section', { className: 'content' },
      h('header', { className: 'hero' },
        h('div', null,
          h('p', { className: 'eyebrow' }, '模型推理服务平台 · React 原型'),
          h('h1', null, '统一管理模型、推理 API 与 MCP 工具服务'),
          h('p', { className: 'hero-copy' }, '面向租赁业务场景，提供模型注册、在线调试、调用观测、MCP 工具暴露和服务健康状态的一站式控制台原型。'),
        ),
        h('div', { className: 'hero-actions' },
          h('button', { className: 'primary-button' }, '新建模型接入'),
          h('button', { className: 'secondary-button' }, '查看接入文档'),
        ),
      ),

      h('section', { className: 'metric-grid', 'aria-label': '核心指标' },
        h('article', { className: 'metric-card' }, h('span', null, '在线模型'), h('strong', null, '12'), h('p', null, '较昨日 +2')),
        h('article', { className: 'metric-card' }, h('span', null, '今日调用量'), h('strong', null, '38.6万'), h('p', null, '成功率 99.92%')),
        h('article', { className: 'metric-card' }, h('span', null, '平均延迟'), h('strong', null, '186ms'), h('p', null, 'P95 412ms')),
        h('article', { className: 'metric-card' }, h('span', null, 'MCP Tools'), h('strong', null, '8'), h('p', null, '3 个已发布')),
      ),

      h('section', { className: 'workspace' },
        h('article', { className: 'panel large-panel' },
          h('div', { className: 'panel-heading' },
            h('div', null, h('p', { className: 'eyebrow' }, 'Playground'), h('h2', null, '模型在线推理调试')),
            h(StatusPill, { status: activeModel.status }),
          ),
          h('label', { className: 'field-label', htmlFor: 'model-select' }, '选择模型'),
          h('select', {
            id: 'model-select',
            className: 'select',
            value: selectedModel,
            onChange: (event) => setSelectedModel(event.target.value),
          }, models.map((model) => h('option', { key: model.name, value: model.name }, model.name))),
          h('label', { className: 'field-label', htmlFor: 'prompt' }, '推理输入'),
          h('textarea', {
            id: 'prompt',
            className: 'textarea',
            value: prompt,
            onChange: (event) => setPrompt(event.target.value),
          }),
          h('div', { className: 'inference-footer' },
            h('div', null,
              h('strong', null, activeModel.scene),
              h('span', null, `${activeModel.provider} · 延迟 ${activeModel.latency}`),
            ),
            h('button', { className: 'primary-button' }, '运行推理'),
          ),
        ),

        h('article', { className: 'panel' },
          h('div', { className: 'panel-heading' },
            h('div', null, h('p', { className: 'eyebrow' }, 'MCP'), h('h2', null, '工具服务发布')),
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
          h('div', null, h('p', { className: 'eyebrow' }, 'Registry'), h('h2', null, '模型注册列表')),
          h('button', { className: 'secondary-button' }, '同步配置'),
        ),
        h('div', { className: 'model-table' },
          h('div', { className: 'table-row table-head' },
            h('span', null, '模型名称'), h('span', null, '提供方'), h('span', null, '业务场景'), h('span', null, 'QPS'), h('span', null, '状态'),
          ),
          models.map((model) => h('div', { className: 'table-row', key: model.name },
            h('strong', null, model.name),
            h('span', null, model.provider),
            h('span', null, model.scene),
            h('span', null, model.qps),
            h(StatusPill, { status: model.status }),
          )),
        ),
      ),
    ),
  );
}

createRoot(document.getElementById('root')).render(h(App));
