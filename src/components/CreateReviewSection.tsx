import React, { useState } from 'react';
import { GameReview } from '../types';
import { DEFAULT_PRESET_IMAGES } from '../data/defaultReviews';
import { PlusCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface CreateReviewSectionProps {
  onAddReview: (review: GameReview) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  onToast: (msg: string) => void;
}

export const CreateReviewSection: React.FC<CreateReviewSectionProps> = ({
  onAddReview,
  isOpen,
  onToggleOpen,
  onToast,
}) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('9.0');
  const [image, setImage] = useState('');
  const [summary, setSummary] = useState('');
  const [platform, setPlatform] = useState('PC · PS5 · Xbox Series X');
  const [author, setAuthor] = useState('');
  const [playtime, setPlaytime] = useState('');
  const [pro, setPro] = useState('');
  const [con, setCon] = useState('');

  const quickGenres = ['Action RPG', 'Sci-Fi RPG', 'Metroidvania', 'Open World', 'Tactical Shooter', 'Racing', 'Adventure', 'Simulation'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !genre.trim() || !summary.trim()) {
      onToast('Please fill in all required fields.');
      return;
    }

    const numRating = Math.min(10, Math.max(1, parseFloat(rating) || 8.0));
    const finalImage = image.trim() || DEFAULT_PRESET_IMAGES[0].url;

    // Detailed editorial prose
    const wordsCount = summary.trim().split(/\s+/).filter(Boolean).length;
    let detailedProse = summary.trim();

    if (wordsCount < 150) {
      detailedProse = `${summary.trim()}

From our comprehensive hands-on evaluation on ${platform || 'PC and current-gen consoles'}, the title demonstrates commendable mechanical coherence and confident artistic vision that immediately grabs the player's attention. The moment-to-moment gameplay loop establishes a steady, finely tuned cadence of escalating challenge and tactile reward. Every encounter demands thoughtful positioning, strategic resource management, and disciplined execution, offering players genuine agency in how they approach tactical engagements and environmental navigation.

Beyond its mechanical foundation, the title excels in crafting a living, breathing world packed with atmospheric environmental storytelling. Every cavern, corridor, and vista reflects meticulous worldbuilding, where subtle visual motifs and ambient soundscapes convey narrative depth without relying on intrusive exposition. Sound design plays an equally pivotal role: concussive acoustic effects during tense action beats seamlessly transition into delicate, meditative musical motifs during quiet moments of exploration, elevating the overall emotional gravity.

The progression systems offer generous room for player expression and buildcrafting. Rather than restricting players to rigid predetermined paths, the game encourages creative experimentation with diverse playstyles, weaponry loadouts, and tactical perks. While minor pacing wrinkles or difficulty spikes may surface during extended sessions, the overarching adventure delivers an extraordinary, deeply memorable experience that stands tall within the ${genre} genre and easily earns its place in the pixcel.gg archive. Whether you are a seasoned genre veteran or a curious newcomer, this outstanding title delivers hours of thrilling gameplay that honors the classic arcade spirit.`;
    }

    const newSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `review-${Date.now()}`;

    const newReview: GameReview = {
      id: newSlug,
      title: title.trim(),
      genre: genre.trim(),
      rating: parseFloat(numRating.toFixed(1)),
      image: finalImage,
      summary: summary.trim().slice(0, 300),
      fullReview: detailedProse,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: author.trim() || 'pixcel.gg Staff',
      platform: platform.trim() || 'Multiplatform',
      playtime: playtime.trim() || 'Completed review playthrough',
      pros: pro.trim() ? [pro.trim(), 'Responsive controls and arcade pacing'] : ['Solid core mechanics and deep buildcraft', 'Superb audio-visual atmosphere'],
      cons: con.trim() ? [con.trim()] : ['Occasional late-game difficulty spikes'],
      breakdown: {
        gameplay: Math.min(10, parseFloat((numRating + 0.1).toFixed(1))),
        graphics: Math.min(10, parseFloat((numRating).toFixed(1))),
        sound: Math.min(10, parseFloat((numRating - 0.1).toFixed(1))),
        story: Math.min(10, parseFloat((numRating).toFixed(1))),
      },
      comments: [],
    };

    onAddReview(newReview);

    // Reset Form
    setTitle('');
    setGenre('');
    setRating('9.0');
    setImage('');
    setSummary('');
    setPlatform('PC · PS5 · Xbox Series X');
    setAuthor('');
    setPlaytime('');
    setPro('');
    setCon('');

    onToast(`Review for "${newReview.title}" published!`);
  };

  return (
    <section id="publish-section" className="mb-12 bg-[#0c0c0c] border-4 border-[#ffe600] shadow-[6px_6px_0px_#ffe600] font-aptos">
      {/* Accordion / Header Bar in Aptos Bold */}
      <button
        onClick={onToggleOpen}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#141414] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#ffe600] border-2 border-black flex items-center justify-center text-black">
            <PlusCircle className="w-5 h-5 stroke-[3]" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-[#ffe600] flex flex-wrap items-center gap-2">
              <span>+ Post a New Game Review</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#a3a3a3] mt-0.5 font-normal">
              Submit your impressions, score breakdown, and verdict to the pixcel.gg archive
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#ffe600] uppercase tracking-wider">
          <span>{isOpen ? 'Collapse' : 'Expand Form'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Form Body in Aptos font with bold labels */}
      {isOpen && (
        <form onSubmit={handleSubmit} className="p-6 pt-2 border-t-2 border-[#2b2b2b] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Game Title */}
            <div className="space-y-1.5">
              <label htmlFor="gameTitle" className="block text-xs font-bold text-[#ffe600] uppercase tracking-wider">
                Game Title *
              </label>
              <input
                id="gameTitle"
                type="text"
                required
                placeholder="e.g. Black Myth: Wukong"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#121212] border-2 border-[#333333] px-3.5 py-2.5 text-sm text-white placeholder-[#666666] focus:border-[#ffe600] focus:outline-none"
              />
            </div>

            {/* Genre */}
            <div className="space-y-1.5">
              <label htmlFor="gameGenre" className="block text-xs font-bold text-[#ffe600] uppercase tracking-wider">
                Genre *
              </label>
              <input
                id="gameGenre"
                type="text"
                required
                placeholder="e.g. Action RPG or Sci-Fi Shooter"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-[#121212] border-2 border-[#333333] px-3.5 py-2.5 text-sm text-white placeholder-[#666666] focus:border-[#ffe600] focus:outline-none"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {quickGenres.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGenre(g)}
                    className="text-xs font-semibold px-2 py-0.5 bg-[#1a1a1a] text-[#888888] hover:text-[#ffe600] hover:border-[#ffe600] border border-[#333333] cursor-pointer"
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Score */}
            <div className="space-y-1.5">
              <label htmlFor="gameRating" className="block text-xs font-bold text-[#ffe600] uppercase tracking-wider">
                Overall Rating (1.0 - 10.0) *
              </label>
              <input
                id="gameRating"
                type="number"
                step="0.1"
                min="1.0"
                max="10.0"
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full bg-[#121212] border-2 border-[#333333] px-3.5 py-2.5 text-sm font-bold text-white focus:border-[#ffe600] focus:outline-none"
              />
            </div>

            {/* Image URL / Presets */}
            <div className="space-y-1.5">
              <label htmlFor="gameImage" className="block text-xs font-bold text-[#ffe600] uppercase tracking-wider">
                Cover Image URL / Preset
              </label>
              <input
                id="gameImage"
                type="text"
                placeholder="Leave blank or select preset below"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-[#121212] border-2 border-[#333333] px-3.5 py-2.5 text-sm text-white placeholder-[#666666] focus:border-[#ffe600] focus:outline-none"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {DEFAULT_PRESET_IMAGES.slice(0, 4).map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setImage(p.url)}
                    className="text-xs font-semibold px-2 py-0.5 bg-[#141414] text-[#888888] hover:text-[#ffe600] border border-[#2b2b2b] cursor-pointer"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform & Author */}
            <div className="space-y-1.5">
              <label htmlFor="gamePlatform" className="block text-xs font-bold text-[#ffe600] uppercase tracking-wider">
                Platform
              </label>
              <input
                id="gamePlatform"
                type="text"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-[#121212] border-2 border-[#333333] px-3.5 py-2.5 text-sm text-white focus:border-[#ffe600] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="gameAuthor" className="block text-xs font-bold text-[#ffe600] uppercase tracking-wider">
                Author / Critic
              </label>
              <input
                id="gameAuthor"
                type="text"
                placeholder="e.g. MasterChief"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-[#121212] border-2 border-[#333333] px-3.5 py-2.5 text-sm text-white placeholder-[#666666] focus:border-[#ffe600] focus:outline-none"
              />
            </div>
          </div>

          {/* Review Essay Textarea */}
          <div className="space-y-1.5">
            <label htmlFor="gameSummary" className="block text-xs font-bold text-[#ffe600] uppercase tracking-wider">
              Editorial Critique & Summary *
            </label>
            <textarea
              id="gameSummary"
              required
              rows={6}
              placeholder="Enter your in-depth game review critique here. Provide detailed thoughts on story, gameplay mechanics, graphics, audio, and your overall verdict..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full bg-[#121212] border-2 border-[#333333] p-3 text-sm sm:text-base text-white placeholder-[#666666] focus:border-[#ffe600] focus:outline-none leading-relaxed"
            />
          </div>

          {/* Highlights & Drawbacks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#48bb78] uppercase tracking-wider mb-1">
                [+] Key Highlight (Pro)
              </label>
              <input
                type="text"
                placeholder="e.g. Astonishing art direction and combat feedback"
                value={pro}
                onChange={(e) => setPro(e.target.value)}
                className="w-full bg-[#121212] border-2 border-[#333333] px-3 py-2 text-sm text-white focus:border-[#ffe600] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#f56565] uppercase tracking-wider mb-1">
                [-] Key Drawback (Con)
              </label>
              <input
                type="text"
                placeholder="e.g. Occasional late-game difficulty spikes"
                value={con}
                onChange={(e) => setCon(e.target.value)}
                className="w-full bg-[#121212] border-2 border-[#333333] px-3 py-2 text-sm text-white focus:border-[#ffe600] focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button in Aptos bold */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="retro-btn-yellow px-6 py-3 text-sm font-bold cursor-pointer flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 stroke-[3]" />
              Publish Review
            </button>
          </div>
        </form>
      )}
    </section>
  );
};
