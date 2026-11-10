import Link from "next/link";
import {
  cardNumber,
  einvoicingCopy as copy,
  guideDate,
  guidePath,
  readingTime,
  topics,
  type GuideEntry,
} from "@/lib/content/einvoicing";
import { Icon } from "@/components/ui/Icon";

function topicName(entry: GuideEntry): string {
  return topics.find((topic) => topic.id === entry.topic)?.name ?? copy.hubCrumb;
}

/**
 * The guide's own index card, pinned beside its title: number and drawer, then
 * the catalogue entries on ruled lines (reading time, writer, reviewer, last
 * update) and two related cards from the same drawer. The hub's card counts
 * the twelve cards instead.
 */
export function PinnedCard({
  entry,
  minutes,
  related,
  cardCount,
}: {
  entry: GuideEntry;
  minutes: number;
  related: GuideEntry[];
  cardCount?: number;
}) {
  const c = copy.card;
  return (
    <aside className="ein-card ein-card-pinned" aria-label={c.label}>
      <p className="ein-card-head">
        <span className="num ein-card-num" dir="ltr">
          {cardNumber(entry.number)}
        </span>
        <span className="ein-card-topic">{topicName(entry)}</span>
      </p>
      <dl className="ein-card-lines">
        <div>
          <dt>{c.reading}</dt>
          <dd>{readingTime(minutes)}</dd>
        </div>
        <div>
          <dt>{c.writer}</dt>
          <dd>{copy.authors.writer}</dd>
        </div>
        <div>
          <dt>{c.reviewer}</dt>
          <dd>
            {copy.authors.reviewer}، {copy.authors.reviewerTitle}
          </dd>
        </div>
        <div>
          <dt>{c.updated}</dt>
          <dd>
            <time dateTime={entry.modified.slice(0, 10)}>{guideDate(entry.modified)}</time>
          </dd>
        </div>
        {cardCount !== undefined && (
          <div>
            <dt>{c.cards}</dt>
            <dd className="num">{cardCount}</dd>
          </div>
        )}
      </dl>
      {related.length > 0 && (
        <div className="ein-card-related">
          <p>{c.related}</p>
          <ul role="list">
            {related.map((guide) => (
              <li key={guide.id}>
                <Link href={guidePath(guide.id)} prefetch={false}>
                  <span className="num" dir="ltr">
                    {cardNumber(guide.number)}
                  </span>
                  <span>{guide.cardTitle}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

/** A card as it stands in the hub's drawer: number, title and reading time. */
export function DrawerCard({ entry, minutes }: { entry: GuideEntry; minutes: number }) {
  return (
    <Link href={guidePath(entry.id)} prefetch={false} className="ein-card ein-card-drawer">
      <span className="num ein-card-num" dir="ltr">
        {cardNumber(entry.number)}
      </span>
      <span className="ein-card-title">{entry.cardTitle}</span>
      <span className="ein-card-time">{readingTime(minutes)}</span>
    </Link>
  );
}

/**
 * The next card in the catalogue, at the end of a page, with the same numbered
 * head as the pinned card. Its role is in the meta line and the link's name.
 */
export function NextCard({ entry, minutes }: { entry: GuideEntry; minutes: number }) {
  return (
    <Link href={guidePath(entry.id)} prefetch={false} className="ein-card ein-card-next">
      <span className="sr-only">{copy.card.next}: </span>
      <span className="ein-card-head">
        <span className="num ein-card-num" dir="ltr">
          {cardNumber(entry.number)}
        </span>
        <span className="ein-card-topic">{topicName(entry)}</span>
      </span>
      <span className="ein-card-next-row">
        <span className="ein-card-title">{entry.cardTitle}</span>
        <Icon name="arrow" size={20} className="ein-card-arrow rtl:-scale-x-100" />
      </span>
      <span className="ein-card-time">
        {copy.card.nextShort} · {readingTime(minutes)}
      </span>
    </Link>
  );
}
