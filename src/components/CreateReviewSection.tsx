import React, { useState } from 'react';
import { GameReview } from '../types';
import { DEFAULT_PRESET_IMAGES } from '../data/defaultReviews';
import { PlusCircle, Sparkles, Image, Star, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

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

    const detailedProse = summary.trim().split(/\s+/).length >= 150
      ? summary.trim()
      : `${summary.trim()}\n\nFrom our hands-on evaluation on ${platform || 'PC and current-gen consoles'}, the title demonstrates commendable mechanical coherence and confident artistic vision. The gameplay loop establishes a steady cadence of challenge and reward, giving players meaningful agency in how they navigate environmental hazards and tactical encounters.\n\nVisually and acoustically, the production values shine through deliberate art direction and evocative audio composition that together construct a cohesive, immersive atmosphere. While occasional pacing wrinkles or difficulty spikes may surface during extended sessions, the overarching adventure delivers a deeply memorable experience that stands tall within the ${genre} genre and earns our enthusiastic recommendation.`;

    const newReview: GameReview = {
      id: `review-${Date.now()}`,
      title: title.trim(),
      genre: genre.trim(),
      rating: parseFloat(numRating.toFixed(1)),
      image: finalImage,
      summary: summary.trim(),
      fullReview: detailedProse,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: author.trim() || 'pixcel.gg Staff',
      platform: platform.trim() || 'Multiplatform',
      playtime: playtime.trim() || 'Completed review playthrough',
      pros: pro.trim() ? [pro.trim(), 'Responsive controls and pacing'] : ['Solid core mechanics', 'High presentation quality'],
      cons: con.trim() ? [con.trim()] : ['Occasional difficulty spikes'],
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
    <section id="publish-section" className="mb-12 bg-[#1a1d2e] border border-[#2b3048] rounded-2xl overflow-hidden transition-all shadow-xl">
      {/* Accordion / Header Bar */}
      <button
        onClick={onToggleOpen}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#141724]/40 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#ff4655]/15 border border-[#ff4655]/30 flex items-center justify-center text-[#ff4655]">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Publish a New Game Review</span>
              <span className="text-xs font-mono font-normal text-[#ff4655] bg-[#ff4655]/10 px-2 py-0.5 rounded">
                Editorial Desk
              </span>
            </h2>
            <p className="text-xs text-[#9da3af] mt-0.5">
              Submit your impressions, score breakdown, and verdict to the pixcel.gg archive
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#9da3af]">
          <span>{isOpen ? 'Collapse Form' : 'Expand Form'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Form Body */}
      {isOpen && (
        <form onSubmit={handleSubmit} className="p-6 pt-2 border-t border-[#2b3048]/80 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Game Title */}
            <div className="space-y-1.5">
              <label htmlFor="gameTitle" className="block text-xs font-bold uppercase tracking-wider text-[#9da3af]">
                Game Title *
              </label>
              <input
                id="gameTitle"
                type="text"
                required
                placeholder="e.g. Black Myth: Wukong"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#111320] border border-[#2b3048] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-[#7b8096] focus:border-[#ff4655] focus:outline-none"
              />
            </div>

            {/* Genre */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="gameGenre" className="block text-xs font-bold uppercase tracking-wider text-[#9da3af]">
                  Genre *
                </label>
              </div>
              <input
                id="gameGenre"
                type="text"
                required
                placeholder="e.g. Action RPG or Sci-Fi Shooter"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-[#111320] border border-[#2b3048] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-[#7b8096] focus:border-[#ff4655] focus:outline-none"
              />
              {/* Quick Genre Suggestions */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {quickGenres.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGenre(g)}
                    className="text-[11px] px-2 py-0.5 rounded bg-[#111320] text-[#9da3af] hover:text-white hover:border-[#ff4655] border border-[#2b3048] transition-colors"
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="gameRating" className="block text-xs font-bold uppercase tracking-wider text-[#9da3af]">
                  Rating (out of 10) *
                </label>
                <span className="text-sm font-bold text-amber-400 flex items-center gap-1 tabular-nums font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {rating} / 10
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  id="gameRating"
                  type="number"
                  min="1"
                  max="10"
                  step="0.1"
                  required
                  placeholder="9.2"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-28 bg-[#111320] border border-[#2b3048] rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#ff4655] focus:outline-none tabular-nums font-mono"
                />
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="flex-1 accent-[#ff4655] cursor-pointer"
                />
              </div>
            </div>

            {/* Platform & Hours */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label htmlFor="gamePlatform" className="block text-xs font-bold uppercase tracking-wider text-[#9da3af]">
                  Platforms
                </label>
                <input
                  id="gamePlatform"
                  type="text"
                  placeholder="PC, PS5, Xbox"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-[#111320] border border-[#2b3048] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#7b8096] focus:border-[#ff4655] focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="gamePlaytime" className="block text-xs font-bold uppercase tracking-wider text-[#9da3af]">
                  Playtime Logged
                </label>
                <input
                  id="gamePlaytime"
                  type="text"
                  placeholder="e.g. 45 hours"
                  value={playtime}
                  onChange={(e) => setPlaytime(e.target.value)}
                  className="w-full bg-[#111320] border border-[#2b3048] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#7b8096] focus:border-[#ff4655] focus:outline-none"
                />
              </div>
            </div>

            {/* Image URL & Preset Selection */}
            <div className="md:col-span-2 space-y-2">
              <label htmlFor="gameImage" className="block text-xs font-bold uppercase tracking-wider text-[#9da3af]">
                Image URL *
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7b8096]" />
                  <input
                    id="gameImage"
                    type="url"
                    placeholder="https://images.unsplash.com/... or choose preset below"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full bg-[#111320] border border-[#2b3048] rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-[#7b8096] focus:border-[#ff4655] focus:outline-none"
                  />
                </div>
              </div>

              {/* Quick Preset Artwork Picker */}
              <div className="pt-1">
                <span className="text-[11px] text-[#7b8096] block mb-1.5">
                  Or select curated gaming concept art (1-click autofill):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DEFAULT_PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setImage(preset.url)}
                      className={`flex items-center gap-2 p-1.5 rounded-lg border text-left text-xs transition-all ${
                        image === preset.url
                          ? 'border-[#ff4655] bg-[#ff4655]/10 text-white'
                          : 'border-[#2b3048] bg-[#111320] text-[#9da3af] hover:text-white hover:border-[#ff4655]/50'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-7 h-7 rounded object-cover shrink-0"
                      />
                      <span className="truncate text-[11px] font-medium">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="space-y-1.5">
              <label htmlFor="gamePro" className="block text-xs font-bold uppercase tracking-wider text-emerald-400">
                Key Highlight / Pro
              </label>
              <input
                id="gamePro"
                type="text"
                placeholder="e.g. Masterclass in environmental storytelling"
                value={pro}
                onChange={(e) => setPro(e.target.value)}
                className="w-full bg-[#111320] border border-[#2b3048] rounded-lg px-3.5 py-2 text-sm text-white placeholder-[#7b8096] focus:border-[#ff4655] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="gameCon" className="block text-xs font-bold uppercase tracking-wider text-rose-400">
                Key Drawback / Con
              </label>
              <input
                id="gameCon"
                type="text"
                placeholder="e.g. Late-game pacing drags slightly"
                value={con}
                onChange={(e) => setCon(e.target.value)}
                className="w-full bg-[#111320] border border-[#2b3048] rounded-lg px-3.5 py-2 text-sm text-white placeholder-[#7b8096] focus:border-[#ff4655] focus:outline-none"
              />
            </div>

            {/* Review Summary */}
            <div className="md:col-span-2 space-y-1.5">
              <label htmlFor="gameSummary" className="block text-xs font-bold uppercase tracking-wider text-[#9da3af]">
                Review / Overview *
              </label>
              <textarea
                id="gameSummary"
                required
                rows={4}
                placeholder="Share your in-depth impressions, gameplay mechanics, graphics, audio, and overall verdict..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full bg-[#111320] border border-[#2b3048] rounded-lg p-3.5 text-sm text-white placeholder-[#7b8096] focus:border-[#ff4655] focus:outline-none"
              />
            </div>

            {/* Reviewer Name */}
            <div className="space-y-1.5">
              <label htmlFor="gameAuthor" className="block text-xs font-bold uppercase tracking-wider text-[#9da3af]">
                Reviewer Credit
              </label>
              <input
                id="gameAuthor"
                type="text"
                placeholder="Your Name (defaults to pixcel.gg Staff)"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-[#111320] border border-[#2b3048] rounded-lg px-3.5 py-2 text-sm text-white placeholder-[#7b8096] focus:border-[#ff4655] focus:outline-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#2b3048]">
            <p className="text-xs text-[#7b8096]">
              All reviews are published instantly to the local catalogue and persist in your browser.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onToggleOpen}
                className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[#9da3af] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#ff4655] hover:bg-[#ff2d3f] active:scale-98 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Post Review</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};
