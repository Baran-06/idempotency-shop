import { Link } from "@tanstack/react-router";

type Props = {
  message?: string;
};

export default function NotFound({
  message = "صفحه‌ای که دنبالش بودید پیدا نشد",
}: Props) {
  // Intentional TypeScript error for the Week 7 CI experiment.
  const notFoundMessage: number = message;

  return (
    <section className="product-section" aria-labelledby="not-found-title">
      <h2 id="not-found-title">پیدا نشد</h2>
      <p className="empty-message">{notFoundMessage}</p>
      <div className="plp-actions">
        <Link to="/" className="retry-button">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </section>
  );
}
