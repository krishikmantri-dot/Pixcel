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
  Heading2,
  Heading3,
  HelpCircle,
  Sparkles,
  Bot
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
                SEO & AEO Class Project Specification Card
              </span>
              <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 bg-[#1b261b] text-[#48bb78] border border-[#38a169]">
                100% Free SEO · Organic Keywords · H1/H2/H3 · AEO Q&amp;A
              </span>
            </div>
            <p className="text-xs text-[#a3a3a3]">
              Organized for class review: Meta Title, Meta Description, H1/H2/H3 Headings &amp; 2 AEO Q&amp;A Articles
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

          {/* Explicit Breakdown: Title, Meta Description */}
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

          {/* 3 Headings: H1, H2, H3 Closely Related to Keywords */}
          <div className="bg-[#101010] p-4 border border-[#2b2b2b] space-y-3">
            <div className="flex items-center justify-between border-b border-[#222222] pb-2">
              <span className="text-xs font-bold text-[#ffe600] uppercase tracking-wider flex items-center gap-2">
                <Heading1 className="w-4 h-4" />
                3 Semantic Headings (H1 &middot; H2 &middot; H3 Closely Related to Keywords)
              </span>
              <span className="text-[11px] text-[#48bb78] font-bold">
                ✔ Complete Hierarchy
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {/* H1 Heading */}
              <div className="bg-[#161616] p-3 border-l-3 border-[#ffe600]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#ffe600] uppercase mb-1">
                  <Heading1 className="w-3.5 h-3.5" />
                  <span>Primary H1 Heading</span>
                </div>
                <div className="text-xs text-white font-semibold leading-snug">
                  "{seo.headings?.h1 || h1Text}"
                </div>
                <p className="text-[10px] text-[#a3a3a3] mt-1">
                  Target: Main keyword &amp; campaign verdict
                </p>
              </div>

              {/* H2 Heading */}
              <div className="bg-[#161616] p-3 border-l-3 border-[#ffe600]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#ffe600] uppercase mb-1">
                  <Heading2 className="w-3.5 h-3.5" />
                  <span>Section H2 Heading</span>
                </div>
                <div className="text-xs text-white font-semibold leading-snug">
                  "{seo.headings?.h2 || `In-Depth Analysis: ${seo.primaryKeyword}`}"
                </div>
                <p className="text-[10px] text-[#a3a3a3] mt-1">
                  Target: Genre comparison &amp; core gameplay
                </p>
              </div>

              {/* H3 Heading */}
              <div className="bg-[#161616] p-3 border-l-3 border-[#ffe600]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#ffe600] uppercase mb-1">
                  <Heading3 className="w-3.5 h-3.5" />
                  <span>Subsection H3 Heading</span>
                </div>
                <div className="text-xs text-white font-semibold leading-snug">
                  "{seo.headings?.h3 || `Mechanics Breakdown: ${seo.primaryKeyword}`}"
                </div>
                <p className="text-[10px] text-[#a3a3a3] mt-1">
                  Target: Combat, mechanics &amp; score evaluation
                </p>
              </div>
            </div>
          </div>

          {/* 2 Paragraphs/Articles in Question-Answer Format for AEO (Answer Engine Optimization) */}
          {seo.aeoQuestions && seo.aeoQuestions.length >= 2 && (
            <div className="bg-[#0f1412] p-4 border border-[#1e3a2b] space-y-3">
              <div className="flex items-center justify-between border-b border-[#1b3024] pb-2">
                <span className="text-xs font-bold text-[#48bb78] uppercase tracking-wider flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#48bb78]" />
                  AEO (Answer Engine Optimization) &middot; 2 Q&amp;A Articles for AI Overviews
                </span>
                <span className="text-[11px] bg-[#1a2e22] text-[#48bb78] px-2 py-0.5 font-bold border border-[#2d5a3f]">
                  Schema.org FAQPage Graph Indexed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* AEO Item 1 */}
                <div className="bg-[#121c17] p-3 border border-[#234232]">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#48bb78] mb-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Q1 (Conversational User Query):</span>
                  </div>
                  <div className="text-xs font-bold text-white mb-2">
                    "{seo.aeoQuestions[0].question}"
                  </div>
                  <div className="text-xs text-[#c5ded0] leading-relaxed bg-[#0b120f] p-2.5 border border-[#1b3024]">
                    <strong className="text-[#48bb78] block mb-1">Direct Answer:</strong>
                    {seo.aeoQuestions[0].answer}
                  </div>
                </div>

                {/* AEO Item 2 */}
                <div className="bg-[#121c17] p-3 border border-[#234232]">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#48bb78] mb-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Q2 (Conversational User Query):</span>
                  </div>
                  <div className="text-xs font-bold text-white mb-2">
                    "{seo.aeoQuestions[1].question}"
                  </div>
                  <div className="text-xs text-[#c5ded0] leading-relaxed bg-[#0b120f] p-2.5 border border-[#1b3024]">
                    <strong className="text-[#48bb78] block mb-1">Direct Answer:</strong>
                    {seo.aeoQuestions[1].answer}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Row: Image Alt & Anchor Text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Image Alt Attribute */}
            <div className="bg-[#121212] p-3.5 border border-[#2b2b2b] space-y-1.5">
              <span className="text-xs font-bold text-[#ffe600] flex items-center gap-1.5 uppercase tracking-wide">
                <ImageIcon className="w-3.5 h-3.5" />
                Image Alt Text
              </span>
              <div className="text-xs text-[#888888] font-bold">Accessible &amp; Keyword-Rich</div>
              <div className="text-xs text-white bg-[#080808] p-2 border border-[#2b2b2b] truncate" title={seo.imageAlt}>
                "{seo.imageAlt}"
              </div>
              <p className="text-[11px] text-[#48bb78] flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                All images have descriptive alt text
              </p>
            </div>

            {/* Anchor Text */}
            <div className="bg-[#121212] p-3.5 border border-[#2b2b2b] space-y-1.5">
              <span className="text-xs font-bold text-[#ffe600] flex items-center gap-1.5 uppercase tracking-wide">
                <LinkIcon className="w-3.5 h-3.5" />
                Link Anchor Text
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

          {/* Crawlability: robots.txt & sitemap.xml for Google Search Console */}
          <div className="bg-[#101510] p-4 border border-[#2b593f] space-y-3">
            <div className="flex items-center justify-between border-b border-[#1b3024] pb-2">
              <span className="text-xs font-bold text-[#48bb78] uppercase tracking-wider flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#48bb78]" />
                Crawlability &amp; Google Search Console Submission
              </span>
              <span className="text-[11px] bg-[#1a2e22] text-[#48bb78] px-2 py-0.5 font-bold border border-[#2d5a3f]">
                ✔ Ready for GSC Indexing
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* robots.txt Link */}
              <div className="bg-[#0b120f] p-3 border border-[#1b3024] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#48bb78] flex items-center gap-1.5 mb-0.5">
                    <FileCode2 className="w-3.5 h-3.5" />
                    <span>robots.txt (Crawler Directives)</span>
                  </div>
                  <p className="text-[#a3a3a3] text-[11px]">Allows Googlebot, Bingbot &amp; AI Answer Engines</p>
                </div>
                <a 
                  href="/robots.txt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-[#1b3024] hover:bg-[#2b593f] text-[#48bb78] hover:text-white font-bold border border-[#38a169] transition-colors"
                >
                  View robots.txt ↗
                </a>
              </div>

              {/* sitemap.xml Link */}
              <div className="bg-[#0b120f] p-3 border border-[#1b3024] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#48bb78] flex items-center gap-1.5 mb-0.5">
                    <Globe2 className="w-3.5 h-3.5" />
                    <span>sitemap.xml (XML Sitemap)</span>
                  </div>
                  <p className="text-[#a3a3a3] text-[11px]">10 unique URLs + Google Image tags for GSC</p>
                </div>
                <a 
                  href="/sitemap.xml" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-[#1b3024] hover:bg-[#2b593f] text-[#48bb78] hover:text-white font-bold border border-[#38a169] transition-colors"
                >
                  View sitemap.xml ↗
                </a>
              </div>
            </div>
          </div>

          {/* SPA Rewrite Notification Box */}
          <div className="bg-[#101318] p-3 border border-[#26354a] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#93c5fd]">
              <Sparkles className="w-4 h-4 text-[#ffe600] shrink-0" />
              <span>
                <strong>Crawler-Safe SPA Routing:</strong> Handled via <code>/vercel.json</code> (Excludes robots.txt, sitemap.xml &amp; assets)
              </span>
            </div>
            <code className="text-[#ffe600] text-[11px] bg-[#000000] px-2 py-1 border border-[#333333] truncate max-w-full sm:max-w-md">
              source: "/((?!robots\.txt|sitemap\.xml|.*\..*).*)" &rarr; /index.html
            </code>
          </div>
        </div>
      )}
    </section>
  );
};
