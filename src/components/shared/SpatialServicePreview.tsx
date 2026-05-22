'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Code2, Layers, Terminal, Layout, Database, Network, Shield } from 'lucide-react';
import { servicesData } from '@/data/services';

interface SpatialServicePreviewProps {
  service: typeof servicesData[0];
}

export default function SpatialServicePreview({ service }: SpatialServicePreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setRotateX((y - 0.5) * -18);
    setRotateY((x - 0.5) * 18);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const getInfraContent = () => {
    switch (service.slug) {
      case 'web-development':
        return (
          <div className="flex-grow flex flex-col justify-center gap-1">
            <div className="border border-slate-200 p-1.5 rounded bg-white">
              <div className="font-bold text-slate-800 text-[7px] border-b border-slate-100 pb-0.5 mb-0.5">schema: web_app_db</div>
              <div>• users: uuid (PK), email, role</div>
              <div>• sessions: token, expires_at</div>
              <div>• pages: slug, content_json</div>
              <div>• analytics: page_views, events</div>
            </div>
            <div className="text-[5.5px] text-slate-400">// PostgreSQL + Redis cache layer</div>
          </div>
        );
      case 'ai-automation':
        return (
          <div className="flex-grow flex flex-col justify-center gap-1">
            <div className="border border-slate-200 p-1.5 rounded bg-white">
              <div className="font-bold text-slate-800 text-[7px] border-b border-slate-100 pb-0.5 mb-0.5">vector_store: embeddings</div>
              <div>• documents: chunk_id, vector[1536]</div>
              <div>• conversations: thread_id, msgs</div>
              <div>• tools: fn_name, schema_json</div>
              <div>• metrics: tokens_used, latency_ms</div>
            </div>
            <div className="text-[5.5px] text-slate-400">// Pinecone + pgvector indices</div>
          </div>
        );
      case 'system-architecture':
        return (
          <div className="flex-grow flex flex-col justify-center gap-1">
            <div className="border border-slate-200 p-1.5 rounded bg-white">
              <div className="font-bold text-slate-800 text-[7px] border-b border-slate-100 pb-0.5 mb-0.5">infra: k8s_cluster</div>
              <div>• nodes: 3x c5.2xlarge (auto-scale)</div>
              <div>• pods: api-gw, auth, billing, notify</div>
              <div>• ingress: nginx → rate_limit(1k/s)</div>
              <div>• volumes: ebs_gp3, 500GB encrypted</div>
            </div>
            <div className="text-[5.5px] text-slate-400">// Terraform-managed infrastructure</div>
          </div>
        );
      default:
        return (
          <div className="flex-grow flex flex-col justify-center gap-1">
            <div className="border border-slate-200 p-1.5 rounded bg-white">
              <div className="font-bold text-slate-800 text-[7px] border-b border-slate-100 pb-0.5 mb-0.5">deployment: prod</div>
              <div>• ci/cd: GitHub Actions → Vercel</div>
              <div>• monitoring: Datadog APM</div>
              <div>• cdn: Cloudflare (200+ PoPs)</div>
              <div>• uptime: 99.99% SLA</div>
            </div>
            <div className="text-[5.5px] text-slate-400">// zero-downtime blue-green deploy</div>
          </div>
        );
    }
  };

  const getLogicContent = () => {
    switch (service.slug) {
      case 'web-development':
        return `export async function GET(req: NextRequest) {\n  const session = await getServerSession(authConfig);\n  if (!session) return NextResponse.json(\n    { error: 'Unauthorized' }, { status: 401 }\n  );\n  const data = await prisma.page.findMany({\n    where: { userId: session.user.id },\n    orderBy: { updatedAt: 'desc' },\n  });\n  return NextResponse.json(data);\n}`;
      case 'ai-automation':
        return `const agent = new AgentExecutor({\n  llm: new ChatOpenAI({ model: 'gpt-4o' }),\n  tools: [\n    new WebSearchTool(),\n    new DatabaseQueryTool(prisma),\n    new EmailSenderTool(resend),\n  ],\n  memory: new BufferWindowMemory({ k: 5 }),\n});\nconst result = await agent.invoke(userQuery);`;
      case 'system-architecture':
        return `resource "aws_ecs_service" "api" {\n  name            = "api-service"\n  cluster         = aws_ecs_cluster.main.id\n  task_definition = aws_ecs_task.api.arn\n  desired_count   = 3\n  launch_type     = "FARGATE"\n\n  load_balancer {\n    target_group_arn = aws_lb_target.api.arn\n    container_name   = "api"\n  }\n}`;
      default:
        return `module.exports = {\n  deployment: {\n    strategy: 'blue-green',\n    healthCheck: '/api/health',\n    rollbackOnFailure: true,\n  },\n  scaling: {\n    min: 2, max: 12,\n    metric: 'cpu_utilization',\n    threshold: 70,\n  },\n};`;
    }
  };

  const renderUIMockup = () => {
    switch (service.slug) {
      case 'web-development':
        return (
          <div className="w-full h-full flex flex-col gap-2 p-3.5 text-slate-800">
            <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
              <span className="text-[8px] font-bold text-slate-700">Dashboard</span>
              <span className="w-3.5 h-3.5 bg-slate-200 rounded-full flex items-center justify-center text-[7px] text-cyan-600 font-bold">⚡</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col justify-between h-14">
                <span className="text-[12px] font-extrabold text-slate-900">2.4k</span>
                <span className="text-[6px] text-slate-500 font-semibold">Active Users</span>
              </div>
              <div className="bg-cyan-50/30 p-2 rounded-xl border border-cyan-200 flex flex-col justify-between h-14">
                <span className="text-[12px] font-extrabold text-cyan-700">99.9%</span>
                <span className="text-[6px] text-cyan-600 font-semibold">Uptime</span>
              </div>
            </div>
          </div>
        );
      case 'ai-automation':
        return (
          <div className="w-full h-full flex flex-col gap-2 p-3.5 text-slate-800">
            <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-200">
              <Cpu className="w-3 h-3 text-cyan-600" />
              <span className="text-[8px] font-bold text-slate-700">AI Agent Console</span>
            </div>
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200 text-[7px] text-slate-700">
                <span className="text-cyan-650 font-bold">→</span> Processing 847 invoices...
              </div>
              <div className="bg-cyan-50/30 p-1.5 rounded-lg border border-cyan-200/50 text-[7px] text-cyan-700 font-semibold">
                <span className="text-cyan-600">✓</span> 846 classified • 1 flagged
              </div>
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200 text-[7px] text-slate-400">
                <span className="animate-pulse text-cyan-650 font-bold">▋</span> Generating summary report...
              </div>
            </div>
          </div>
        );
      case 'system-architecture':
        return (
          <div className="w-full h-full flex flex-col gap-2 p-3 text-slate-800">
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-200">
              <span className="text-[8px] font-bold text-slate-700 flex items-center gap-1"><Network className="w-3 h-3 text-cyan-650" />Cluster</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-50 text-[6px] font-bold text-cyan-700 border border-cyan-200/50">HEALTHY</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {['API', 'Auth', 'Jobs'].map((s) => (
                <div key={s} className="bg-slate-50 border border-slate-200 p-1.5 rounded-lg text-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-600 mx-auto mb-1" />
                  <div className="text-[6px] text-slate-700 font-bold">{s}</div>
                </div>
              ))}
            </div>
            <div className="h-3 bg-slate-50 border border-slate-200 rounded flex items-center px-2">
              <div className="h-1 bg-cyan-650/40 rounded w-[72%]" />
              <span className="ml-auto text-[5px] text-cyan-700 font-bold">72% CPU</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex flex-col gap-2 p-3 text-slate-800">
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-200">
              <span className="text-[8px] font-bold text-slate-700 flex items-center gap-1"><Shield className="w-3 h-3 text-cyan-650" />Deploy</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-50 text-[6px] font-bold text-cyan-700 border border-cyan-200/50">LIVE</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[7px] py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Pipeline</span>
                <span className="text-cyan-700 font-bold">✓ Passed</span>
              </div>
              <div className="flex justify-between text-[7px] py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Tests</span>
                <span className="text-cyan-700 font-bold">284/284</span>
              </div>
            </div>
          </div>
        );
    }
  };

  const layerIcons = {
    'web-development': { infra: Database, logic: Code2, ui: Layout },
    'ai-automation': { infra: Database, logic: Cpu, ui: Terminal },
    'system-architecture': { infra: Network, logic: Terminal, ui: Shield },
    'cloud-devops': { infra: Database, logic: Terminal, ui: Layout },
  };
  const icons = layerIcons[service.slug as keyof typeof layerIcons] || layerIcons['cloud-devops'];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 top-10 flex items-center justify-center select-none overflow-visible cursor-pointer"
      style={{ perspective: 1200 }}
    >
      {/* Interactive 3D Canvas Box */}
      <motion.div
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 25 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-[85%] h-[80%] relative flex items-center justify-center overflow-visible"
      >
        {/* Layer 3: Infrastructure (Deepest Z) */}
        <motion.div
          animate={{
            z: isHovered ? -42 : 0,
            opacity: isHovered ? 0.98 : 0.4,
            scale: isHovered ? 0.95 : 1
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="absolute inset-0 rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col justify-between font-mono text-[6.5px] text-slate-500 shadow-sm"
        >
          <div className="flex items-center gap-1 border-b border-slate-200 pb-1 mb-1 font-bold text-[7px] text-slate-650">
            <icons.infra className="w-2.5 h-2.5 text-cyan-600" />
            INFRASTRUCTURE_LAYER
          </div>
          {getInfraContent()}
        </motion.div>

        {/* Layer 2: Logic (Middle Z) */}
        <motion.div
          animate={{
            z: isHovered ? 15 : 0,
            opacity: isHovered ? 0.98 : 0.6,
            scale: isHovered ? 0.98 : 1
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="absolute inset-0 rounded-2xl bg-white border border-slate-200 p-4 flex flex-col justify-between font-mono text-[7px] text-slate-700 shadow-sm"
        >
          <div className="flex items-center gap-1 border-b border-slate-200 pb-1 mb-1 font-bold text-[7px] text-cyan-700">
            <icons.logic className="w-2.5 h-2.5" />
            {service.slug}.controller.ts
          </div>
          <pre className="flex-grow flex items-center justify-start text-left text-slate-600 font-mono text-[6.5px] leading-relaxed overflow-x-hidden select-none">
            <code>{getLogicContent()}</code>
          </pre>
        </motion.div>

        {/* Layer 1: UI (Front Z) */}
        <motion.div
          animate={{
            z: isHovered ? 65 : 0,
            opacity: 1,
            scale: 1
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="absolute inset-0 rounded-2xl bg-white border border-slate-300 shadow-sm overflow-hidden flex flex-col justify-between"
        >
          {/* Header mock */}
          <div className="h-6 w-full bg-slate-50 border-b border-slate-200 flex items-center px-3 justify-between">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </div>
            <span className="text-[7px] font-mono text-slate-400 uppercase tracking-widest font-semibold flex items-center gap-1">
              <icons.ui className="w-2 h-2 text-cyan-600" />
              Live Preview
            </span>
          </div>

          {/* Core UI View */}
          <div className="flex-grow bg-white relative z-10 flex items-center justify-center overflow-hidden">
            {renderUIMockup()}
          </div>
        </motion.div>
      </motion.div>

      {/* Persistent hover indicator */}
      {!isHovered && (
        <span className="absolute bottom-4 px-4 py-2 border border-slate-200 bg-slate-950 text-white rounded-full text-[9px] font-mono tracking-wider font-semibold shadow-sm flex items-center gap-1.5 z-30 pointer-events-none">
          <Layers className="w-3.5 h-3.5 text-cyan-500" />
          HOVER TO UNFOLD LAYERS
        </span>
      )}
    </div>
  );
}
