'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Terminal, Layout, Layers } from 'lucide-react';
import { worksData } from '@/data/work';

interface SpatialWorkPreviewProps {
  work: typeof worksData[0];
}

export default function SpatialWorkPreview({ work }: SpatialWorkPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Map mouse position to tilt coordinates
    setRotateX((y - 0.5) * -18);
    setRotateY((x - 0.5) * 18);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  // Get custom mock descriptions for each case study logic layer
  const getLogicContent = () => {
    switch (work.slug) {
      case 'desh-yatraa':
        return `export async function POST(req) {\n  const session = await stripe.checkout.sessions.create({\n    payment_method_types: ['card'],\n    line_items: [{ price_data, quantity: 1 }],\n    mode: 'payment',\n    success_url: '/booking/success',\n  });\n  return NextResponse.json({ id: session.id });\n}`;
      case 'proxyui':
        return `export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(\n  ({ className, variant, size, ...props }, ref) => {\n    return (\n      <button\n        className={cn(buttonVariants({ variant, size, className }))}\n        ref={ref}\n        {...props}\n      />\n    );\n  }\n);`;
      case 'voyage-horizon':
        return `export const getStaticProps = async () => {\n  const packages = await sanityClient.fetch(\n    \`*[_type == "package"] { title, price, slug, media }\`\n  );\n  return { props: { packages }, revalidate: 60 };\n};`;
      case 'kuch-nahi':
        return `const handleCheckout = async (cart) => {\n  const checkoutUrl = await createShopifyCheckout(cart);\n  router.push(checkoutUrl);\n};\n// Optimized single-page cart states\nconst [cartState, dispatch] = useReducer(cartReducer);`;
      default:
        return `CREATE TABLE products (\n  id SERIAL PRIMARY KEY,\n  sku VARCHAR(50) UNIQUE,\n  dimensions JSONB,\n  weight NUMERIC,\n  stock_status VARCHAR(20)\n);\nCREATE INDEX idx_products_sku ON products(sku);`;
    }
  };

  // Custom visual components for the UI Layer
  const renderUIMockup = () => {
    switch (work.slug) {
      case 'desh-yatraa':
        return (
          <div className="w-full h-full flex flex-col gap-2 p-3.5 text-slate-800">
            <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl border border-slate-200">
              <span className="text-[8px] font-bold text-slate-700">Find Destinations</span>
              <span className="w-3.5 h-3.5 bg-slate-200 rounded-full flex items-center justify-center text-[7px]">🔍</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col justify-between h-14">
                <span className="text-[12px] font-extrabold text-slate-900">Asia</span>
                <span className="text-[6px] text-slate-500 font-semibold">12 Packages</span>
              </div>
              <div className="bg-cyan-50/30 p-2 rounded-xl border border-cyan-200 flex flex-col justify-between h-14">
                <span className="text-[12px] font-extrabold text-cyan-700">Europe</span>
                <span className="text-[6px] text-cyan-600 font-semibold">8 Packages</span>
              </div>
            </div>
          </div>
        );
      case 'proxyui':
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 text-slate-850">
            <div className="text-[8px] font-bold text-slate-400 font-mono">PROXY_COMPONENT_GRID</div>
            <div className="grid grid-cols-3 gap-2 my-2">
              <div className="bg-slate-50 border border-slate-200 px-2 py-3 rounded-lg text-center font-bold text-[8px] hover:border-cyan-400 shadow-sm transition-all text-cyan-700 cursor-pointer">Button</div>
              <div className="bg-slate-50 border border-slate-200 px-2 py-3 rounded-lg text-center font-bold text-[8px] text-slate-700">Card</div>
              <div className="bg-slate-50 border border-slate-200 px-2 py-3 rounded-lg text-center font-bold text-[8px] text-slate-700">Dialog</div>
            </div>
            <div className="h-5 bg-slate-950 hover:bg-cyan-700 text-white rounded-lg flex items-center justify-center font-bold text-[8px] cursor-pointer transition-colors shadow-sm">Get Starter Template</div>
          </div>
        );
      case 'voyage-horizon':
        return (
          <div className="w-full h-full flex flex-col gap-2 p-3 text-slate-850">
            <div className="h-10 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between px-3">
              <span className="text-[9px] font-extrabold text-slate-800">Voyage.</span>
              <span className="px-2 py-0.5 rounded bg-slate-950 text-[7px] font-bold text-white cursor-pointer hover:bg-cyan-700 transition-colors">Book Now</span>
            </div>
            <div className="h-16 bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex flex-col justify-between">
              <div className="w-20 h-2.5 bg-slate-200 rounded" />
              <div className="w-28 h-1.5 bg-slate-100 rounded" />
            </div>
          </div>
        );
      case 'kuch-nahi':
        return (
          <div className="w-full h-full flex flex-col gap-2 p-3 text-slate-800">
            <div className="flex justify-between items-center text-[8px] text-slate-400 border-b border-slate-100 pb-1">
              <span>BAG (2 ITEMS)</span>
              <span className="font-bold text-cyan-600">TOTAL: $128</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
              <div className="w-6 h-6 bg-white border border-slate-200 rounded flex items-center justify-center text-[10px]">👟</div>
              <div>
                <div className="font-bold text-[7px] text-slate-800">Neo Sneaker</div>
                <div className="text-[6px] text-slate-500 font-semibold">$98.00</div>
              </div>
            </div>
            <div className="w-full py-2 bg-slate-950 hover:bg-cyan-700 transition-colors rounded-lg text-center text-white font-bold text-[8px] mt-auto cursor-pointer shadow-sm">
              Secure Checkout
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex flex-col justify-between p-3.5 text-slate-800">
            <div className="text-[8px] font-bold text-slate-400">INDUSTRIAL_DATABASE_CATALOG</div>
            <div className="flex flex-col gap-1.5 my-2">
              <div className="flex justify-between text-[7px] py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-700">SKU_B021 (Beam 120mm)</span>
                <span className="text-cyan-700 font-bold">IN STOCK</span>
              </div>
              <div className="flex justify-between text-[7px] py-1 border-b border-slate-100">
                <span className="font-semibold text-slate-700">SKU_B024 (Beam 150mm)</span>
                <span className="text-amber-600 font-bold">LOW STOCK</span>
              </div>
            </div>
            <div className="text-[8px] font-bold text-white bg-slate-950 hover:bg-cyan-700 cursor-pointer border border-slate-950 py-1 rounded text-center transition-all shadow-sm">Request Quote</div>
          </div>
        );
    }
  };

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
        {/* Layer 3: Data Layer (Deepest Z) */}
        <motion.div
          animate={{
            z: isHovered ? -42 : 0,
            opacity: isHovered ? 0.98 : 0.25,
            scale: isHovered ? 0.95 : 1
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="absolute inset-0 rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col justify-between font-mono text-[6.5px] text-slate-500 shadow-sm"
        >
          <div className="flex items-center gap-1 border-b border-slate-200 pb-1 mb-1 font-bold text-[7px] text-slate-650">
            <Database className="w-2.5 h-2.5 text-cyan-600" />
            DATALOG_SCHEMA_MAP
          </div>
          <div className="flex-grow flex flex-col justify-center gap-1">
            <div className="border border-slate-200 p-1 rounded bg-white">
              <div className="font-bold text-slate-800 text-[7px] border-b border-slate-100 pb-0.5 mb-0.5">schema: {work.slug}_db</div>
              <div>• id: int (PK)</div>
              <div>• record_hash: varchar(64)</div>
              <div>• payload: jsonb</div>
              <div>• timestamp: timestampz</div>
            </div>
            <div className="text-[5.5px] text-slate-400">// relational indices bound and synced</div>
          </div>
        </motion.div>

        {/* Layer 2: Logic Layer (Middle Z) */}
        <motion.div
          animate={{
            z: isHovered ? 15 : 0,
            opacity: isHovered ? 0.98 : 0.45,
            scale: isHovered ? 0.98 : 1
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="absolute inset-0 rounded-2xl bg-white border border-slate-200 p-4 flex flex-col justify-between font-mono text-[7px] text-slate-700 shadow-sm"
        >
          <div className="flex items-center gap-1 border-b border-slate-200 pb-1 mb-1 font-bold text-[7px] text-cyan-700">
            <Terminal className="w-2.5 h-2.5" />
            controllers/{work.slug}.ts
          </div>
          <pre className="flex-grow flex items-center justify-start text-left text-slate-600 font-mono text-[6.5px] leading-relaxed overflow-x-hidden select-none">
            <code>{getLogicContent()}</code>
          </pre>
        </motion.div>

        {/* Layer 1: UI Layer (Front Z) */}
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
              <Layout className="w-2 h-2 text-cyan-600" />
              Live Frame
            </span>
          </div>

          {/* Core UI View */}
          <div className="flex-grow bg-white relative z-10 flex items-center justify-center overflow-hidden">
            {renderUIMockup()}
          </div>
        </motion.div>
      </motion.div>

      {/* Persistent speculative indicator */}
      {!isHovered && (
        <span className="absolute bottom-4 px-4 py-2 border border-slate-200 bg-slate-950 text-white rounded-full text-[9px] font-mono tracking-wider font-semibold shadow-sm flex items-center gap-1.5 z-30 pointer-events-none">
          <Layers className="w-3.5 h-3.5 text-cyan-500" />
          HOVER TO UNFOLD LAYERS
        </span>
      )}
    </div>
  );
}
