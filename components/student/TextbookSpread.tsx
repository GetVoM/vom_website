import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import { Icon } from "@/components/ui/Icon";


/**
 * The opening spread: one entry as the textbook writes it, on the start page, and
 * as VoM records it, on the end page. On load the record's rows write in from the
 * spine, the totals close on the double rule, and the free seal stamps the fold.
 */
export function TextbookSpread({ t, brand }: { t: Dictionary["student"]; brand: string }) {
  const { book, record } = t.hero;

  return (
    <figure className="stu-spread">
      <div className="stu-pages">
        <div className="stu-page stu-page-book">
          <span className="stu-letterhead stu-letterhead-book" aria-hidden="true" />
          <table className="stu-notation">
            <thead>
              <tr>
                {book.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{book.debit}</td>
                <td className="num">
                  {book.amount}
                </td>
                <td />
              </tr>
              <tr>
                <td className="stu-credit">{book.credit}</td>
                <td />
                <td className="num">
                  {book.amount}
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="stu-memo">
                  {book.memo}
                </td>
              </tr>
            </tbody>
          </table>
          <p className="stu-folio">{t.features.bookHead}</p>
        </div>

        <div className="stu-page stu-page-vom">
          <p className="stu-letterhead stu-letterhead-vom">
            <span className="sr-only">{brand}</span>
          </p>
          <div className="stu-record-head">
            <span className="stu-record-title">{record.title}</span>
            <dl className="stu-record-meta">
              <div>
                <dt>{record.serialLabel}</dt>
                <dd className="num" dir="ltr">
                  {record.serial}
                </dd>
              </div>
              <div>
                <dt>{record.dateLabel}</dt>
                <dd className="num" dir="ltr">
                  {record.date}
                </dd>
              </div>
            </dl>
          </div>
          <table className="stu-record">
            <thead>
              <tr>
                {record.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="stu-write">
                <th scope="row">{record.lines[0]}</th>
                <td className="num">
                  {book.amount}
                </td>
                <td />
              </tr>
              <tr className="stu-write">
                <th scope="row">{record.lines[1]}</th>
                <td />
                <td className="num">
                  {book.amount}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="stu-write">
                <th scope="row">{record.total}</th>
                <td className="num">
                  {book.amount}
                </td>
                <td className="num">
                  {book.amount}
                </td>
              </tr>
            </tfoot>
          </table>
          <p className="stu-record-foot">
            <span className="stu-attach">
              <Icon name="clip" size={14} />
              <span dir="auto">{record.attachment}</span>
            </span>
            <span className="stu-demo">{record.demo}</span>
          </p>
          <p className="stu-seal">
            <span className="stu-seal-word">{t.seal.word}</span>
            <span className="stu-seal-micro">{t.seal.micro}</span>
          </p>
        </div>
      </div>
    </figure>
  );
}
