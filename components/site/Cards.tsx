import Image from "next/image";
import Link from "next/link";
import type { ArticleItem, TeamMemberItem } from "@/lib/types";
import { formatDate, isPlaceholder } from "@/lib/utils";
import { PhotoPlaceholder } from "@/components/ui/Cards";
import { LinkedInIcon } from "@/components/ui/Icons";

export function TeamCard({ member, compact = false }: { member: TeamMemberItem; compact?: boolean }) {
  const bio = member.bio ?? "";
  return (
    <article className="group relative flex h-full flex-col border border-hairline bg-ivory transition-all duration-300 hover:-translate-y-[6px] hover:border-gold/60 hover:shadow-[var(--shadow-hover)]">
      <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-[2px] w-0 bg-gold transition-[width] duration-[520ms] group-hover:w-full" />
      {member.photo ? (
        <div className="relative h-[304px] overflow-hidden bg-card-alt">
          <Image src={member.photo} alt={member.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        </div>
      ) : (
        <PhotoPlaceholder className="h-[304px]" />
      )}
      <div className="flex flex-1 flex-col p-7">
        {member.categoryName && <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold-ink">{member.categoryName}</p>}
        <h3 className="mt-3 text-[26px] leading-tight">{member.name}</h3>
        <p className="mt-1 text-[14px] font-medium text-body">{member.designation}</p>
        {member.qualification && <p className="mt-1 text-[13px] text-body-2">{member.qualification}</p>}
        {!compact && member.expertise.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {member.expertise.slice(0, 3).map((e, i) => (
              <li key={i} className="chip">
                {e}
              </li>
            ))}
          </ul>
        )}
        {!compact && bio && <p className="card-copy mt-5 line-clamp-3">{bio}</p>}
        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <Link
            href={`/team/${member.slug}`}
            className="inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-forest underline decoration-gold underline-offset-8 hover:text-gold-ink"
          >
            View Profile <span aria-hidden className="h-px w-[18px] bg-current transition-transform group-hover:translate-x-2" />
          </Link>
          {member.linkedin && !isPlaceholder(member.linkedin) && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="flex h-9 w-9 items-center justify-center border border-hairline-strong text-forest hover:border-gold hover:text-gold-ink"
            >
              <LinkedInIcon />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ArticleCard({ article }: { article: ArticleItem }) {
  return (
    <Link
      href={`/knowledge-hub/${article.slug}`}
      className="group relative flex h-full flex-col bg-ivory p-8 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[var(--shadow-hover)]"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] w-0 bg-gold transition-[width] duration-[520ms] group-hover:w-full" />
      <p className="flex flex-wrap items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold-ink">
        {article.categoryName}
        {article.contentTypeName && (
          <>
            <span aria-hidden className="text-body-2/50">|</span>
            <span className="text-body-2">{article.contentTypeName}</span>
          </>
        )}
      </p>
      <h3 className="mt-5 text-[25px] leading-[1.2]">{article.title}</h3>
      <p className="card-copy mt-4 line-clamp-3">{article.excerpt}</p>
      <p className="mt-auto flex items-center gap-3 pt-8 text-[12px] text-body-2">
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        <span aria-hidden className="h-[3px] w-[3px] rounded-full bg-gold" />
        {article.readingTime} min read
      </p>
    </Link>
  );
}
