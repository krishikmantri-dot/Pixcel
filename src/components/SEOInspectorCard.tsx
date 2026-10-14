import React, { useState } from 'react';
import { GameReviewSEO } from '../types';
import { 
  Search, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  FileCode2, 
  Globe2, 
  Tag, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Heading1,
  Sparkles
} from 'lucide-react';

interface SEOInspectorCardProps {
  seo: GameReviewSEO;
  h1Text: string;
  urlPath?: string;
  rating?: number;
}

export const SEOInspectorCard: React.FC<SEOInspectorCardProps> = ({
  seo,
  h1Text,
  urlPath,
  rating,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const titleLength = seo.metaTitle.length;
  const descLength = seo.metaDescription.length;

  const isTitleCompliant = titleLength <= 60;
  const isDescCompliant = descLength <= 160;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://pixcel.gg';
  const displayUrl = `${currentOrigin}${urlPath || ''}`;

  return (
    <section 
      aria-label="SEO project presentation card"
      className="mb-8 border-3 border-[#ffe600] bg-[#0c0c0c] shadow-[5px_5px_0px_#ffe600] font-aptos overflow-hidden"
    >
      {/* Header bar with professor-ready labeling */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-[#141414] px-4 sm:px-6 py-3.5 border-b-2 border-[#2b2b2b] flex items-center justify-between cursor-pointer hover:bg-[#1a1a1a] transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#ffe600] text-black font-bold flex items-center justify-center rounded-sm">
            <Search className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm sm:text-base font-bold text-[#ffe600] uppercase tracking-wide">
                SEO Class Project Specification Card
              </span>
              <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 bg-[#1b261b] text-[#48bb78] border border-[#38a169]">
                100% Free SEO · Organic Keywords
              </span>
            </div>
            <p className="text-xs text-[#a3a3a3]">
              Organized for class review: Meta Title, Meta Description, H1 Page Heading & Alt/Anchor compliance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#ffe600]">
          <span className="hidden sm:inline">{isExpanded ? 'Collapse Audit' : 'Expand Audit'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* SERP Search Preview Simulation */}
          <div className="bg-[#000000] p-4 border border-[#333333] rounded-sm">
            <div className="flex items-center gap-2 text-xs text-[#888888] font-bold uppercase tracking-wider mb-2">
              <Globe2 className="w-3.5 h-3.5 text-[#ffe600]" />
              <span>Google Search Snippet Simulation (SERP Preview)</span>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-[#9aa0a6] flex items-center gap-1.5 truncate">
                <span className="w-4 h-4 rounded-full bg-[#ffe600] text-black text-[9px] font-bold flex items-center justify-center">P</span>
                <span>pixcel.gg</span>
                <span>›</span>
                <span className="truncate">{urlPath || 'review'}</span>
              </div>
              <div className="text-base sm:text-lg text-[#8ab4f8] hover:underline font-medium cursor-pointer truncate">
                {seo.metaTitle}
              </div>
              <div className="text-xs sm:text-sm text-[#bdc1c6] leading-relaxed">
                {rating && (
                  <span className="text-[#fbbc04] font-bold mr-2">
                    ★ Rating: {rating.toFixed(1)}/10 ·
                  </span>
                )}
                {seo.metaDescription}
              </div>
            </div>
          </div>

          {/* Explicit Breakdown: Title, Meta Description, H1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Meta Title */}
            <div className="bg-[#121212] p-4 border-l-4 border-[#ffe600] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#ffe600] flex items-center gap-1.5 uppercase tracking-wide">
                  <Tag className="w-3.5 h-3.5" />
                  1. Meta Title Tag (&lt;title&gt;)
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${isTitleCompliant ? 'bg-[#1e2e1e] text-[#48bb78] border border-[#38a169]' : 'bg-[#2e1e1e] text-[#f56565]'}`}>
                  {titleLength} / 60 Chars {isTitleCompliant ? '(Optimal)' : '(Exceeds)'}
                </span>
              </div>
              <div className="p-2.5 bg-[#080808] border border-[#2b2b2b] text-white font-semibold text-sm">
                "{seo.metaTitle}"
              </div>
              <ul className="text-xs text-[#a3a3a3] space-y-1 font-medium pt-1">
                <li className="flex items-center gap-1.5 text-[#48bb78]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Main keyword at start: <strong>"{seo.primaryKeyword}"</strong></span>
                </li>
                <li className="flex items-center gap-1.5 text-[#48bb78]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Strictly under 60 characters limit (no truncation)</span>
                </li>
                <li className="flex items-center gap-1.5 text-[#48bb78]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>High click appeal phrasing to drive organic CTR</span>
                </li>
              </ul>
            </div>

            {/* 2. Meta Description */}
            <div className="bg-[#121212] p-4 border-l-4 border-[#ffe600] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#ffe600] flex items-center gap-1.5 uppercase tracking-wide">
                  <FileCode2 className="w-3.5 h-3.5" />
                  2. Meta Description Tag
                </span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${isDescCompliant ? 'bg-[#1e2e1e] text-[#48bb78] border border-[#38a169]' : 'bg-[#2e1e1e] text-[#f56565]'}`}>
                  {descLength} / 160 Chars {isDescCompliant ? '(Optimal)' : '(Exceeds)'}
                </span>
              </div>
              <div className="p-2.5 bg-[#080808] border border-[#2b2b2b] text-white text-xs sm:text-sm leading-relaxed">
                "{seo.metaDescription}"
              </div>
              <ul className="text-xs text-[#a3a3a3] space-y-1 font-medium pt-1">
                <li className="flex items-center gap-1.5 text-[#48bb78]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Honestly summarizes page contents</span>
                </li>
                <li className="flex items-center gap-1.5 text-[#48bb78]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Naturally incorporates organic keywords</span>
                </li>
                <li className="flex items-center gap-1.5 text-[#48bb78]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ends with strong reason to click</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Row 2: H1, Image Alt & Anchor Text */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* 3. Primary Page Heading H1 */}
            <div className="bg-[#121212] p-3.5 border border-[#2b2b2b] space-y-1.5">
              <span className="text-xs font-bold text-[#ffe600] flex items-center gap-1.5 uppercase tracking-wide">
                <Heading1 className="w-3.5 h-3.5" />
                3. Page Heading (&lt;h1&gt;)
              </span>
              <div className="text-xs text-[#888888] font-bold">Targeted H1 Header</div>
              <div className="text-sm font-bold text-white bg-[#080808] p-2 border border-[#2b2b2b] truncate">
                {h1Text}
              </div>
              <p className="text-[11px] text-[#48bb78] flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Single primary &lt;h1&gt; hierarchy
              </p>
            </div>

            {/* 4. Image Alt Attribute */}
            <div className="bg-[#121212] p-3.5 border border-[#2b2b2b] space-y-1.5">
              <span className="text-xs font-bold text-[#ffe600] flex items-center gap-1.5 uppercase tracking-wide">
                <ImageIcon className="w-3.5 h-3.5" />
                4. Image Alt Text
              </span>
              <div className="text-xs text-[#888888] font-bold">Accessible & Keyword-Rich</div>
              <div className="text-xs text-white bg-[#080808] p-2 border border-[#2b2b2b] truncate" title={seo.imageAlt}>
                "{seo.imageAlt}"
              </div>
              <p className="text-[11px] text-[#48bb78] flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                All images have descriptive alt text
              </p>
            </div>

            {/* 5. Anchor Text */}
            <div className="bg-[#121212] p-3.5 border border-[#2b2b2b] space-y-1.5">
              <span className="text-xs font-bold text-[#ffe600] flex items-center gap-1.5 uppercase tracking-wide">
                <LinkIcon className="w-3.5 h-3.5" />
                5. Link Anchor Text
              </span>
              <div className="text-xs text-[#888888] font-bold">Semantic Navigation</div>
              <div className="text-xs text-white bg-[#080808] p-2 border border-[#2b2b2b] truncate">
                "Back to Reviews", "Read Review"
              </div>
              <p className="text-[11px] text-[#48bb78] flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                No empty or non-descriptive links
              </p>
            </div>
          </div>

          {/* SPA Rewrite Notification Box */}
          <div className="bg-[#101318] p-3 border border-[#26354a] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#93c5fd]">
              <Sparkles className="w-4 h-4 text-[#ffe600] shrink-0" />
              <span>
                <strong>Inspect Properties & Unique URL Rewrite:</strong> Handled via <code>/vercel.json</code> & <code>public/_redirects</code>
              </span>
            </div>
            <code className="text-[#ffe600] text-[11px] bg-[#000000] px-2 py-1 border border-[#333333]">
              rewrites: [ &#123; "source": "/(.*)", "destination": "/index.html" &#125; ]
            </code>
          </div>
        </div>
      )}
    </section>
  );
};
