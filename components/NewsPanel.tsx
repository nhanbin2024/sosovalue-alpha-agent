import { Newspaper } from "lucide-react";
import type { NewsItem } from "@/lib/types";
import SignalBadge from "./SignalBadge";

type NewsPanelProps = {
  news: NewsItem[];
};

export default function NewsPanel({ news }: NewsPanelProps) {
  return (
    <div className="glass rounded-3xl p-5" id="news-intelligence">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-brand">News intelligence</p>
          <h2 className="mt-2 text-xl font-bold">Signal drivers</h2>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <Newspaper className="h-5 w-5 text-brand" />
        </div>
      </div>

      <div className="space-y-3">
        {news.map((item) => (
          <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              <SignalBadge value={item.sentiment} />
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55">{item.impact} impact</span>
            </div>
            <h3 className="text-sm font-semibold leading-6 text-white">{item.title}</h3>
            <div className="mt-3 flex items-center justify-between text-xs text-white/40">
              <span>{item.source}</span>
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
